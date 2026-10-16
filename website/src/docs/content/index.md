# Overview

What Hermes does, how a log message reaches its destination, and where to start with your application.

## Logging that fits your application

Hermes is a Java 17+ logging library with a small API, compile-time logger generation, and configurable output. Use familiar log levels and parameterized messages, then choose the appenders and layouts that suit your application.

The core API works in plain Java. A dedicated Spring Boot starter provides auto-configuration, and the Kotlin module adds lazy logging and scoped context helpers.

## How a message gets delivered

Your application calls a Logger. The runtime checks the level, formats the message, and creates a log event. Appenders deliver that event to the console, a file, or Logstash. An AsyncAppender uses the LMAX Disruptor ring buffer to move delivery to a background thread.

```mermaid
hermes-delivery
```

## What you need

- Java 17 or later.
- Maven 3.8+ or Gradle 7+ to manage dependencies.
- `hermes-api` at compile time and `hermes-core` at runtime.
- `hermes-processor` when using `@InjectLogger`.

Start with the [installation guide](getting-started/installation.md), or follow the [quick start](getting-started/quick-start.md) for a complete first logger.

## Choose your integration

| Application | Starting point                                              |
| ----------- | ----------------------------------------------------------- |
| Plain Java  | LoggerFactory, or @InjectLogger with a generated superclass |
| Spring Boot | hermes-spring-boot-starter and application.yaml             |
| Kotlin      | hermes-kotlin extensions and withMDC                        |
| GraalVM     | Native-image metadata included in hermes-core               |

## Context, structure, and delivery

Use MDC to associate request IDs and other context with log events. Markers categorize messages independently of severity. JSON layouts make output easier for downstream tools to consume.

MDC is thread-local: clear it when a request finishes, and explicitly propagate context when work moves to another thread. Appenders have a lifecycle; start them before use and stop them during application shutdown.

## Where to go next

- [Quick start](getting-started/quick-start.md): add dependencies and write your first log.
- [Core API](api/core.md): explore Logger, LoggerFactory, MDC, and markers.
- [Spring Boot](integrations/spring-boot.md): configure a service with YAML.
- [Architecture](architecture/overview.md): understand modules and message delivery.
- [Examples](/docs/examples): practical patterns to adapt to your application.

Hermes is distributed under the [PolyForm Shield License](https://github.com/smeltery/hermes/blob/master/LICENSE).
