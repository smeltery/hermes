# Kotlin DSL

The Kotlin module adds class-based logger lookup, lazy messages, and context helpers.

## Installation

```kotlin
dependencies {
    implementation("io.github.smeltery:hermes-kotlin:1.0.0")
    runtimeOnly("io.github.smeltery:hermes-core:1.0.0")
}
```

## Basic Usage

```kotlin
import io.github.smeltery.hermes.kotlin.*

class OrderService {
    private val log = OrderService::class.logger

    fun accept(orderId: String) {
        log.info { "Order $orderId accepted" }
        log.debug { "Preparing order $orderId" }
    }
}
```

The lazy message lambda runs only when its level is enabled. There are extensions
for trace, debug, info, warn, and error, including `error(throwable) { message }`.

## MDC Extensions

```kotlin
withMDC("orderId" to orderId) {
    log.info { "Order accepted" }
}
```

`withMDC` clears the **entire** thread context on exit, including when the block
throws. It does not restore a previous outer context, so avoid nested scopes that
expect restoration. It also does not propagate context across coroutine dispatchers.
Use explicit context copying at thread boundaries; see [MDC](../user-guide/mdc.md).

## Structured messages

```kotlin
log.infoWith {
    "message" to "Order accepted"
    "orderId" to "ORD-1042"
    "items" to 3
}
```

This builder produces a message string such as
`Order accepted [orderId=ORD-1042, items=3]`. It does not create arbitrary top-level
JSON fields. Use [JsonLayout](../advanced/json-logging.md) for structured event output.
The same builder is available through `warnWith` and `errorWith`.

## Error handling

```kotlin
try {
    accept(orderId)
} catch (error: Exception) {
    log.error(error) { "Order $orderId failed" }
    throw error
}
```

Logging does not replace an application's error handling or retry policy.
