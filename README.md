# <img src="website/public/favicon.svg" width="32" height="32" alt="" /> Hermes

Logging for Java that stays out of your way. Write the message; Hermes handles delivery.

[![CI](https://github.com/smeltery/hermes/actions/workflows/ci.yml/badge.svg)](https://github.com/smeltery/hermes/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/smeltery/hermes)](https://github.com/smeltery/hermes/releases)
[![License](https://img.shields.io/badge/license-PolyForm_Shield_1.0.0-blue)](LICENSE)
![Java 17+](https://img.shields.io/badge/Java-17%2B-ED8B00?logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3-6DB33F?logo=springboot&logoColor=white)
![Kotlin](https://img.shields.io/badge/Kotlin-2-7F52FF?logo=kotlin&logoColor=white)
![Bun](https://img.shields.io/badge/tooling-Bun-000000?logo=bun&logoColor=white)
[![Flox](https://img.shields.io/badge/dev_environment-Flox-7B3FE4)](docs/development/tooling.md)

![Hermes — Good logs. Less ceremony.](website/public/og-image.png)

- **Small API:** five log levels, parameterized messages, suppliers, markers, and MDC.
- **Less setup:** `@InjectLogger` generates a superclass with a ready-to-use logger.
- **Flexible delivery:** console, rotating files, Logstash, JSON, and optional async appenders.
- **Your stack:** Spring Boot configuration, Kotlin helpers, and GraalVM metadata.

```java
import io.github.smeltery.hermes.Logger;
import io.github.smeltery.hermes.LoggerFactory;

Logger log = LoggerFactory.getLogger("orders");
log.info("Order {} accepted", "ORD-1042");
```

## Start here

See [docs/](docs/README.md) for [installation](docs/src/getting-started/installation.md),
[quick start](docs/src/getting-started/quick-start.md),
[integrations](docs/src/integrations/spring-boot.md), and
[architecture diagrams](docs/src/architecture/overview.md).
The website renders these same Markdown sources at `/docs`.

## Develop

```sh
flox activate
bun install --frozen-lockfile
pre-commit install --install-hooks
bun run check
```

Java builds use Maven; Bun manages the website and validation tooling.
See [development](docs/development/tooling.md) for local commands,
[CI and releases](docs/development/releases.md) for automation, and
[contributing](CONTRIBUTING.md) for the LOC budget and checks.

## License

[PolyForm Shield License 1.0.0](LICENSE). Copyright © 2026 smeltery.
