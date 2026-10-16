# Examples

Practical starting points for Java applications, Spring Boot services, and Kotlin projects.

## A logger without annotation processing

Use LoggerFactory when you want a logger without generating a superclass.

```java
import io.github.smeltery.hermes.Logger;
import io.github.smeltery.hermes.LoggerFactory;

public class OrderService {
    private static final Logger log =
        LoggerFactory.getLogger(OrderService.class);

    public void receive(String orderId) {
        log.info("Order {} received", orderId);
    }
}
```

## Request context with cleanup

Associate a request identifier with messages from the current thread. Always clear context when the request finishes.

```java
import io.github.smeltery.hermes.MDC;

MDC.put("requestId", requestId);
try {
    log.info("Processing request");
    processRequest();
} finally {
    MDC.clear();
}
```

## A Spring Boot configuration

Add the Hermes Spring Boot starter before applying these settings. Configure appenders programmatically when you need custom destinations.

```yaml
hermes:
  level:
    root: INFO
    packages:
      com.example: DEBUG
  async:
    enabled: true
    queue-size: 1024
```

## Scoped context in Kotlin

The Kotlin extension restores the previous context after the block, including when the block throws.

```kotlin
import io.github.smeltery.hermes.kotlin.*

class OrderService {
    private val log = OrderService::class.logger

    fun receive(orderId: String) {
        withMDC("orderId" to orderId) {
            log.info { "Order received" }
        }
    }
}
```

## Continue with a complete example

The repository includes [example applications](https://github.com/smeltery/hermes/tree/master/hermes-examples). Build the modules from the repository root with `mvn clean install`, then follow the example project's README.
