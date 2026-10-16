# Appenders

Appenders own output destinations and a start/stop lifecycle. Construct them,
start them, attach them to a logger or provider, and stop them on shutdown.

## Built-in Appenders

| Appender | Configuration |
| --- | --- |
| ConsoleAppender | Name and optional PatternLayout |
| FileAppender | Name, path, optional PatternLayout |
| RollingFileAppender | Name, path, byte limit, history count, optional PatternLayout |
| AsyncAppender | Name, delegate list, optional power-of-two buffer size |
| LogstashAppender | Name, host, port, optional timeout in milliseconds |

## Explicit wiring

```java
import io.github.smeltery.hermes.LogLevel;
import io.github.smeltery.hermes.core.HermesLogger;
import io.github.smeltery.hermes.core.appender.ConsoleAppender;
import io.github.smeltery.hermes.core.layout.PatternLayout;
import java.util.List;

ConsoleAppender console = new ConsoleAppender(
    "console", new PatternLayout("%d{HH:mm:ss.SSS} %-5level %logger - %msg%n"));
console.start();
try {
    HermesLogger log = new HermesLogger("orders", LogLevel.INFO, List.of(console));
    log.info("Order {} accepted", "ORD-1042");
} finally {
    console.stop();
}
```

Constructing this logger does not replace LoggerFactory's global provider.
A custom `LoggerProvider` can supply configured loggers to the factory.

## File output

```java
FileAppender file = new FileAppender("file", "logs/app.log");
RollingFileAppender rolling = new RollingFileAppender(
    "rolling", "logs/app.log", 10 * 1024 * 1024L, 5);
```

Import these classes from `io.github.smeltery.hermes.core.appender`.
Rotation is size-based. There is no daily policy, compressed filename pattern,
`setMaxFileSize`, `setLayout`, or per-appender level/marker filter setter.

## Async output

```java
AsyncAppender async = new AsyncAppender("async", List.of(console), 2048);
async.start();
```

Attach `async` instead of its delegate to avoid duplicate output. Async starts and
stops its delegates. Stop once on shutdown; create a new instance for a new lifecycle.
See [async logging](async-logging.md) for saturation behavior and dependencies.

## Custom appenders

Implement `Appender`: `append(LogEvent)`, `start()`, `stop()`, `getName()`, and
`isStarted()`. Make concurrency, failure behavior, resource ownership, and shutdown
explicit. The logger may call an appender from multiple threads.

See [API signatures](../api/appenders.md), [layouts](layouts.md), and
[Logstash](logstash.md).
