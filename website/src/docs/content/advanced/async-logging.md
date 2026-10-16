# Async Logging

Move appender delivery to a background consumer with the LMAX Disruptor ring buffer.

## Basic setup

AsyncAppender wraps a list of delegate appenders. Calling start() starts the delegates and the Disruptor consumer. Calling stop() shuts down the Disruptor, waits for queued events to be processed, and then stops the delegates.

```java
import io.github.dotbrains.hermes.core.appender.AsyncAppender;
import io.github.dotbrains.hermes.core.appender.ConsoleAppender;
import java.util.List;

ConsoleAppender console = new ConsoleAppender("console");
AsyncAppender async = new AsyncAppender("async", List.of(console), 2048);
async.start();

// Attach async to your application's configured runtime.
// Stop it during application shutdown.
async.stop();
```

## How delivery works

The runtime publishes an event to a ring buffer. A background consumer forwards the event to each started delegate. The event holder is cleared after delivery so it does not retain the log event unnecessarily.

```mermaid
flowchart TD
    Producer --> Ring Buffer
    Ring Buffer --> Consumer
```

## Buffer capacity and saturation

The two-argument constructor uses a buffer size of 1024. The three-argument constructor accepts a buffer size; choose a positive power of two, as required by Disruptor.

Publishing uses ringBuffer.next(). A saturated buffer can wait for capacity, so asynchronous delivery is not a guarantee that the producer never waits. This implementation uses ProducerType.MULTI and YieldingWaitStrategy. It does not expose setter methods for changing the wait strategy, a drop policy, or a publish timeout.

## Spring Boot configuration

The starter accepts the following queue settings in application.yaml:

```yaml
hermes:
  async:
    enabled: true
    queue-size: 2048
```

See the [Spring Boot guide](../integrations/spring-boot.md) for the starter dependency and level configuration.

## Shutdown and troubleshooting

- Start the appender before use; append() returns without delivery when it is not started.
- Stop it when the application shuts down so queued events can be processed.
- Investigate a slow destination before increasing the buffer size.
- If CPU usage is high, account for the yielding consumer strategy and the application's workload.
- Measure throughput, latency, and allocation in your own environment. There is no guaranteed messages-per-second figure.

See [performance](../architecture/performance.md) for a measurement checklist and [appender APIs](../api/appenders.md) for constructor signatures.
