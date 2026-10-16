# Layouts API

Layouts format a log event as text or JSON.

## API contract

These signatures match the public implementation in the repository. Configure constructor arguments before starting an appender.

## JsonLayout

```java
import io.github.smeltery.hermes.core.layout.JsonLayout;

public JsonLayout();
public JsonLayout(boolean prettyPrint);
public String format(LogEvent event);
```

## PatternLayout

```java
import io.github.smeltery.hermes.core.layout.PatternLayout;

public PatternLayout();
public PatternLayout(String pattern);
public String format(LogEvent event);
```

## Integrating layouts

PatternLayout and JsonLayout are separate classes; there is no shared Layout interface in this implementation. ConsoleAppender, FileAppender, and RollingFileAppender accept PatternLayout. To use JsonLayout with a custom destination, implement an Appender that calls JsonLayout.format(event). LogstashAppender uses JSON internally.
