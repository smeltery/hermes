package io.github.smeltery.hermes.core;

import io.github.smeltery.hermes.LogLevel;
import io.github.smeltery.hermes.MDC;
import io.github.smeltery.hermes.core.appender.Appender;
import io.github.smeltery.hermes.core.appender.AsyncAppender;
import io.github.smeltery.hermes.core.layout.PatternLayout;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import static org.junit.jupiter.api.Assertions.*;

class LoggingContractTest {
    @AfterEach
    void clearContext() { MDC.clear(); }

    @Test
    void disabledSupplierIsNotEvaluated() {
        Capture output = new Capture();
        HermesLogger log = new HermesLogger("orders", LogLevel.INFO, List.of(output));
        AtomicInteger evaluated = new AtomicInteger();
        log.debug(() -> "work=" + evaluated.incrementAndGet());
        assertEquals(0, evaluated.get());
        assertTrue(output.events.isEmpty());
    }

    @Test
    void capturesContextBeforeCallerClearsIt() {
        Capture output = new Capture();
        HermesLogger log = new HermesLogger("orders", LogLevel.INFO, List.of(output));
        MDC.put("orderId", "ORD-1042");
        log.info("Order {} accepted", "ORD-1042");
        MDC.clear();
        assertEquals("ORD-1042", output.events.get(0).mdcContext().get("orderId"));
        assertEquals("Order ORD-1042 accepted", new PatternLayout("%msg").format(output.events.get(0)));
    }

    @Test
    void patternIncludesContextOnlyWhenRequested() {
        LogEvent event = LogEvent.builder().loggerName("orders").level(LogLevel.INFO)
                .message("accepted").mdcContext(Map.of("orderId", "1042")).build();
        assertEquals("INFO  orders - accepted orderId=1042",
                new PatternLayout("%-5level %logger - %msg %mdc").format(event));
        assertFalse(new PatternLayout().format(event).contains("orderId"));
    }

    @Test
    void asyncShutdownDrainsAcceptedEventsAndStopsDelegate() {
        Capture output = new Capture();
        AsyncAppender async = new AsyncAppender("async", List.of(output), 16);
        async.start();
        HermesLogger log = new HermesLogger("orders", LogLevel.INFO, List.of(async));
        for (int i = 0; i < 40; i++) log.info("Order {}", i);
        async.stop();
        assertEquals(40, output.events.size());
        assertFalse(output.isStarted());
        assertFalse(async.isStarted());
    }

    private static final class Capture implements Appender {
        private final List<LogEvent> events = new CopyOnWriteArrayList<>();
        private boolean started = true;
        public void append(LogEvent event) { events.add(event); }
        public String getName() { return "capture"; }
        public void start() { started = true; }
        public void stop() { started = false; }
        public boolean isStarted() { return started; }
    }
}
