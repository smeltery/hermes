# Performance

Understand the work behind a log statement and measure Hermes in your own application.

## Measure your workload

Throughput and latency depend on message size, enabled levels, appenders, layouts, hardware, and the destination. This documentation does not present unverified benchmark numbers as guarantees.

Measure both enabled and disabled logging, synchronous and asynchronous delivery, allocation rate, and shutdown behavior. Use representative message data and production-like output destinations.

## Avoid unnecessary work

Parameterized messages defer formatting until a level is enabled. Java still evaluates ordinary method arguments before calling a logger, so use a supplier or an explicit level check for expensive work.

```java
log.debug(() -> "Computed result: " + expensiveOperation());

if (log.isDebugEnabled()) {
    log.debug("Computed result: {}", expensiveOperation());
}
```

## Move delivery off the calling thread

The AsyncAppender uses LMAX Disruptor to hand events to a consumer. It wraps one or more appenders and forwards events to them. This changes where delivery work happens; it does not eliminate formatting, allocation, or output costs.

```java
AsyncAppender async = new AsyncAppender(
    "async", List.of(consoleAppender, fileAppender), 2048);
async.start();
```

A larger ring buffer can absorb bursts at the cost of memory. Choose its capacity based on measurements, and account for saturation and shutdown in your tests. See [async logging](../advanced/async-logging.md).

## Compare configurations fairly

| Measurement      | Keep consistent                                        |
| ---------------- | ------------------------------------------------------ |
| Disabled logging | Log level, argument construction, supplier use         |
| Enabled logging  | Message text, context, formatting and layout           |
| Async delivery   | Buffer size, producer count and destination speed      |
| File output      | Storage device, flush behavior and rotation settings   |
| Allocations      | JVM, warmup, GC configuration and measurement duration |

Use a Java benchmark harness for isolated operations and application-level load tests for end-to-end effects. Report your environment, warmup, repetitions, throughput, latency distribution, and memory observations together.

## Tune the destination first

Console and file I/O can dominate the cost of logging. Avoid excessive production DEBUG/TRACE output, bound the context attached to an event, and choose layouts intentionally. Validate that important messages are delivered when the application shuts down.
