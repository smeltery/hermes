const flows = {
  delivery: {
    labels: ['Your application', 'Hermes runtime', 'Appender'],
    steps: [
      'log.info(message, args)',
      'Check level & format message',
      'Create an immutable log event',
      'Deliver event to configured appenders',
      'Apply layout & write output',
    ],
  },
  async: {
    labels: ['Calling thread', 'Ring buffer', 'Consumer'],
    steps: [
      'Check level & format message',
      'Create a log event',
      'Publish to Disruptor ring buffer',
      'Consume on background thread',
      'Forward to wrapped appenders',
    ],
  },
  discovery: {
    labels: ['Application', 'ServiceLoader', 'Provider'],
    steps: [
      'LoggerFactory.getLogger(Class)',
      'Load LoggerProvider service',
      'Discover META-INF/services entry',
      'Initialize HermesLoggerProvider',
      'Return a logger instance',
    ],
  },
};

export function FlowDiagram({ source }: { source: string }) {
  if (source.includes('stateDiagram'))
    return (
      <figure className="docs-diagram">
        <div className="diagram-states">
          <span>Created</span>
          <b aria-hidden="true">→</b>
          <span>Started</span>
          <b aria-hidden="true">→</b>
          <span>Stopped</span>
        </div>
        <figcaption>
          Call start() before appending events and stop() during shutdown. An
          appender can be started again after stopping.
        </figcaption>
      </figure>
    );
  if (source.includes('subgraph') || source.includes('Examples['))
    return (
      <figure className="docs-diagram">
        <div className="docs-module-map">
          <span>Application code</span>
          <b aria-hidden="true">↓</b>
          <strong>hermes-api</strong>
          <p>
            Logger · LoggerFactory · LogLevel · MDC · Marker · @InjectLogger
          </p>
          <b aria-hidden="true">↓</b>
          <div>
            <span>hermes-core</span>
            <span>hermes-processor</span>
          </div>
          <p>
            Spring Boot starter and Kotlin extensions connect through these
            modules.
          </p>
          <b aria-hidden="true">↓</b>
          <div>
            <span>Appenders</span>
            <span>Layouts</span>
          </div>
        </div>
        <figcaption>
          The API defines the contract. The core supplies runtime logging; the
          processor generates logger superclasses at compile time.
        </figcaption>
      </figure>
    );
  const kind = source.includes('ServiceLoader')
    ? 'discovery'
    : source.includes('ring buffer') || source.includes('Ring Buffer')
      ? 'async'
      : 'delivery';
  const flow = flows[kind];
  return (
    <figure className="docs-diagram">
      <div
        role="region"
        aria-label="Logging sequence diagram"
        tabIndex={0}
        className="sequence-scroll"
      >
        <svg
          viewBox="0 0 720 435"
          role="img"
          aria-label={flow.steps.join('. ')}
        >
          {flow.labels.map((label, index) => (
            <g key={label}>
              <rect
                x={30 + index * 240}
                y="15"
                width="180"
                height="52"
                rx="7"
              />
              <text x={120 + index * 240} y="46" textAnchor="middle">
                {label}
              </text>
              <path
                className="sequence-lifeline"
                d={`M${120 + index * 240} 67V400`}
              />
            </g>
          ))}
          {flow.steps.map((step, index) => {
            const left = index < 3 ? 120 : 360;
            const right = index < 3 ? 360 : 600;
            const y = 112 + index * 61;
            return (
              <g key={step}>
                <path
                  className="sequence-arrow"
                  d={`M${left} ${y}H${right}l-7 -4m7 4-7 4`}
                />
                <text x={(left + right) / 2} y={y - 12} textAnchor="middle">
                  {step}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <figcaption>
        {kind === 'async'
          ? 'Async delivery moves appender work to a consumer thread. Buffer capacity and destination speed still affect throughput.'
          : 'A message moves through the logger, runtime, and configured output destinations.'}
      </figcaption>
    </figure>
  );
}
