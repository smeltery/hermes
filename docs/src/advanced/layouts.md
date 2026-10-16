# Layouts

Layouts turn a log event into text. Built-in console/file appenders accept
`PatternLayout`; `LogstashAppender` uses `JsonLayout` internally.

## PatternLayout

```java
import io.github.smeltery.hermes.core.layout.PatternLayout;

PatternLayout layout = new PatternLayout(
    "%d{HH:mm:ss.SSS} [%thread] %-5level %logger - %msg %mdc%n");
```

| Token | Output |
| --- | --- |
| `%d` or `%d{pattern}` | Timestamp using a Java date/time pattern |
| `%thread` | Thread name |
| `%level`, `%-5level` | Severity, optionally padded to five characters |
| `%logger`, `%logger{36}` | Logger name, optionally abbreviated |
| `%msg` | Parameterized message |
| `%mdc` | Comma-separated context entries |
| `%n` | Platform newline |

The default pattern includes timestamp, thread, level, logger, and message.
It does not include MDC; add `%mdc` to expose that context. Throwable details are
appended when the event carries an exception. Tokens not listed above are not
implemented; there is no general Logback pattern compatibility guarantee.

## JsonLayout

```java
import io.github.smeltery.hermes.core.layout.JsonLayout;

JsonLayout layout = new JsonLayout();
String json = layout.format(event);
```

`new JsonLayout(true)` enables pretty printing. See [JSON logging](json-logging.md)
for fields and destination limitations.

## Choose a format

Use a pattern for human-readable console output, compact JSON for ingestion, and
explicit field naming for request context. Avoid logging sensitive values in either
format. Test the exact pattern or JSON against the receiving system.

See [layout API](../api/layouts.md) and [appenders](appenders.md).
