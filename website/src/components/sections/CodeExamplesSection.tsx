"use client";

import { useState } from "react";
import { BrandIcon } from "../BrandIcon";
import { CopyButton } from "../CodeBlock";

const examples = [
  {
    label: "Java",
    icon: "java" as const,
    file: "OrderService.java",
    code: `import io.github.smeltery.hermes.InjectLogger;

@InjectLogger
public class OrderService
    extends OrderServiceHermesLogger {

    public void placeOrder(String orderId, int items) {
        if (items < 1) {
            log.warn("Rejected order {}: empty cart", orderId);
            return;
        }
        log.info("Accepted order {} (items={})", orderId, items);
    }
}`,
    output: [
      "08:35:07.142 [http-nio-8080-exec-1] INFO  OrderService - Accepted order ORD-1042 (items=3)",
      "08:35:07.219 [http-nio-8080-exec-2] WARN  OrderService - Rejected order ORD-1043: empty cart",
      "08:35:08.061 [http-nio-8080-exec-1] INFO  OrderService - Accepted order ORD-1044 (items=1)",
    ],
    outputTitle: "orders-api · console",
    outputNote: "Sample requests · time-only PatternLayout",
    note: "One annotation. A logger ready when you are.",
  },
  {
    label: "Spring Boot",
    icon: "spring" as const,
    file: "application.yml",
    code: `hermes:
  level:
    root: INFO
    packages:
      com.example: DEBUG
  async:
    enabled: true
    queue-size: 1024`,
    output: [
      "root                 INFO",
      "com.example          DEBUG",
      "async.enabled        true",
      "async.queue-size     1024",
    ],
    outputTitle: "orders-api · configuration",
    outputNote: "Resolved settings from application.yml",
    note: "Familiar YAML. Configuration that fits your application.",
  },
  {
    label: "Kotlin",
    icon: "kotlin" as const,
    file: "OrderService.kt",
    code: `import io.github.smeltery.hermes.kotlin.*

class OrderService {
    private val log = OrderService::class.logger

    fun placeOrder(orderId: String) {
        withMDC("orderId" to orderId) {
            log.info { "Order accepted for processing" }
        }
    }
}`,
    output: [
      "08:35:07.142 [http-nio-8080-exec-1] INFO  OrderService - Order accepted for processing {orderId=ORD-1042}",
      "08:35:07.219 [http-nio-8080-exec-2] INFO  OrderService - Order accepted for processing {orderId=ORD-1043}",
    ],
    outputTitle: "orders-api · console",
    outputNote: "Sample requests · PatternLayout with %mdc",
    note: "Idiomatic Kotlin. Context that travels with your message.",
  },
];

export function CodeExamplesSection() {
  const [selected, setSelected] = useState(0);
  const example = examples[selected];
  return (
    <section
      className="shell demo-section"
      id="code-examples"
      aria-label="Explore Hermes code examples"
    >
      <div className="demo-window">
        <div className="window-bar">
          <span className="window-dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>Less setup. More signal.</span>
          <span className="window-label">hermes / examples</span>
        </div>
        <div className="demo-grid">
          <div className="editor">
            <div
              className="example-options"
              role="group"
              aria-label="Example language"
            >
              {examples.map((item, index) => (
                <button
                  key={item.label}
                  aria-pressed={selected === index}
                  onClick={() => setSelected(index)}
                >
                  <BrandIcon name={item.icon} size={14} />
                  {item.label}
                </button>
              ))}
            </div>
            <div className="file-bar">
              <span>{example.file}</span>
              <CopyButton key={selected} code={example.code} />
            </div>
            <pre
              role="region"
              tabIndex={0}
              aria-label={`${example.label} example`}
            >
              <code>
                {example.code.split("\n").map((line, index) => (
                  <span className="code-line" key={index}>
                    <span className="line-number" aria-hidden="true">
                      {index + 1}
                    </span>
                    <span
                      className={
                        line.trim().startsWith("@")
                          ? "syntax-annotation"
                          : line.includes('"')
                            ? "syntax-string"
                            : ""
                      }
                    >
                      {line || " "}
                    </span>
                  </span>
                ))}
              </code>
            </pre>
          </div>
          <div className="output-panel" aria-live="polite">
            <div className="output-heading">
              <span className="status-dot" />
              {example.outputTitle}
            </div>
            <div className="output-lines">
              {example.output.map((line, index) => (
                <div className="console-entry" key={line}>
                  <span className="console-line-number" aria-hidden="true">
                    {index + 1}
                  </span>
                  <code
                    className={line.includes(" WARN ") ? "console-warning" : ""}
                  >
                    {line}
                  </code>
                </div>
              ))}
            </div>
            <div className="output-footnote">
              <span className="console-cursor" aria-hidden="true" />
              {example.outputNote}
            </div>
          </div>
        </div>
        <div className="demo-caption">
          <span>{example.note}</span>
          <span>
            Java 17+ <span aria-hidden="true">↗</span>
          </span>
        </div>
      </div>
      <p className="demo-note">
        Example code and sample output. Configure your layout and log levels for
        your application.
      </p>
    </section>
  );
}
