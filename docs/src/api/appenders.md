# Appenders API

Appenders deliver log events to a destination and expose a start/stop lifecycle.

## API contract

These signatures match the public implementation in the repository. Configure constructor arguments before starting an appender.

## Appender

```java
import io.github.smeltery.hermes.core.appender.Appender;

void append(LogEvent event);
String getName();
void start();
void stop();
boolean isStarted();
```

## AsyncAppender

```java
import io.github.smeltery.hermes.core.appender.AsyncAppender;

public AsyncAppender(String name, List<Appender> delegates);
public AsyncAppender(String name, List<Appender> delegates, int bufferSize);
public void start();
public void append(LogEvent event);
public String getName();
public void stop();
public boolean isStarted();
```

## ConsoleAppender

```java
import io.github.smeltery.hermes.core.appender.ConsoleAppender;

public ConsoleAppender(String name);
public ConsoleAppender(String name, PatternLayout layout);
public ConsoleAppender(String name, PatternLayout layout, PrintStream out);
public void append(LogEvent event);
public String getName();
public void start();
public void stop();
public boolean isStarted();
```

## FileAppender

```java
import io.github.smeltery.hermes.core.appender.FileAppender;

public FileAppender(String name, String filePath);
public FileAppender(String name, String filePath, PatternLayout layout);
public void start();
public void append(LogEvent event);
public String getName();
public void stop();
public boolean isStarted();
```

## LogstashAppender

```java
import io.github.smeltery.hermes.core.appender.LogstashAppender;

public LogstashAppender(String name, String host);
public LogstashAppender(String name, String host, int port);
public void start();
public void append(LogEvent event);
public String getName();
public void stop();
public boolean isStarted();
```

## RollingFileAppender

```java
import io.github.smeltery.hermes.core.appender.RollingFileAppender;

public RollingFileAppender(String name, String filePath);
public RollingFileAppender(String name, String filePath, long maxFileSize, int maxHistory);
public RollingFileAppender(String name, String filePath, long maxFileSize, int maxHistory, PatternLayout layout);
public void start();
public synchronized void append(LogEvent event);
public String getName();
public void stop();
public boolean isStarted();
```

## Lifecycle

Call start() before append(). Stop appenders during application shutdown. AsyncAppender starts and stops its delegates. Its Disruptor is not designed to be restarted after shutdown; create a new instance for a new lifecycle.

## Configuration

The concrete appenders use constructor configuration. Setter-based examples such as setMaxFileSize(), setLayout(), setQueueSize(), or setBlocking() are not part of this API. Use the constructors above and the [async guide](../advanced/async-logging.md).
