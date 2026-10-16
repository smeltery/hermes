import Link from 'next/link';
import { repository } from '@/lib/site';
import { BrandIcon } from '@/components/BrandIcon';
import {
  ArrowDown,
  ArrowUpRight,
  Braces,
  Layers,
  Radio,
  Zap,
} from 'lucide-react';
import { MarketingNav, MarketingFooter } from '@/components/MarketingLayout';
import { CodeExamplesSection } from '@/components/sections/CodeExamplesSection';
import { QuickStartSection } from '@/components/sections/QuickStartSection';

const features = [
  {
    icon: Zap,
    title: 'Keep your application moving.',
    description:
      'Async logging with LMAX Disruptor moves delivery off the calling thread. Your application gets on with its work.',
    label: 'ASYNC BY DESIGN',
    visual: 'async',
  },
  {
    icon: Braces,
    title: 'Every message, in context.',
    description:
      'Carry request IDs with MDC, categorize events with markers, and send structured JSON to your log pipeline.',
    label: 'CONTEXT INCLUDED',
    visual: 'context',
  },
  {
    icon: Layers,
    title: 'Your logs. Your destination.',
    description:
      'Console, file, rolling file, or Logstash. Combine appenders and choose the layout that works for you.',
    label: 'BUILT TO CONNECT',
    visual: 'destinations',
  },
];

export default function Page() {
  return (
    <>
      <MarketingNav />
      <main id="main">
        <section className="hero shell" id="top">
          <p className="eyebrow">
            <span className="status-dot" /> A little library. A lot less
            boilerplate.
          </p>
          <h1>
            Good logs.
            <br />
            <em>Less ceremony.</em>
          </h1>
          <p className="hero-description">
            Logging for Java that stays out of your way.
            <br />
            Write the message.{' '}
            <span className="marker">Hermes takes it from here.</span>
          </p>
          <a className="button button-primary" href="#quick-start">
            <ArrowDown size={16} /> Get started with Hermes
          </a>
          <p className="fine">
            Java 17+ · Spring Boot · Kotlin · Built for your stack
          </p>
        </section>
        <CodeExamplesSection />
        <div className="shell compatibility">
          <span>A familiar fit.</span>
          <span>
            <BrandIcon name="java" />
            Java 17+
          </span>
          <span>
            <BrandIcon name="spring" />
            Spring Boot
          </span>
          <span>
            <BrandIcon name="kotlin" />
            Kotlin
          </span>
          <span>
            <BrandIcon name="graalvm" />
            GraalVM
          </span>
          <span>
            <BrandIcon name="maven" />
            Maven
          </span>
          <span>
            <BrandIcon name="gradle" />
            Gradle
          </span>
        </div>
        <section className="section shell how" id="how-it-works">
          <div className="section-intro">
            <p className="eyebrow">From setup to your first signal</p>
            <h2>
              Less wiring.
              <br />
              <em>More building.</em>
            </h2>
            <p>
              Skip the repeated logger declarations.
              <br />
              Keep the code you came here to write.
            </p>
            <a className="text-link" href="#code-examples">
              See it in a few lines ↑
            </a>
          </div>
          <ol className="steps">
            <li>
              <span>01</span>
              <div>
                <h3>Add a little Hermes.</h3>
                <p>
                  Bring the API, runtime, and annotation processor into your
                  Maven or Gradle project.
                </p>
              </div>
            </li>
            <li>
              <span>02</span>
              <div>
                <h3>Let the compiler do the setup.</h3>
                <p>
                  Add <code>@InjectLogger</code> and extend the generated logger
                  superclass. Your <code>log</code> field is ready at compile
                  time.
                </p>
              </div>
            </li>
            <li>
              <span>03</span>
              <div>
                <h3>Say what matters.</h3>
                <p>
                  Use familiar levels, parameterized messages, and lazy
                  suppliers. Send the output where you need it.
                </p>
              </div>
            </li>
          </ol>
        </section>
        <section className="section shell" id="features">
          <div className="section-heading">
            <p className="eyebrow">
              Thoughtful underneath. Simple on the surface.
            </p>
            <h2>
              Small API.
              <br />
              <em>Plenty behind it.</em>
            </h2>
            <p>The essentials you expect, with room for the way you work.</p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature" key={feature.title}>
                <div
                  className={`feature-visual ${feature.visual}`}
                  aria-hidden="true"
                >
                  {feature.visual === 'async' ? (
                    <>
                      <div className="signal-track">
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className="diagram-labels">
                        <span>your application</span>
                        <span>log delivery ↗</span>
                      </div>
                    </>
                  ) : feature.visual === 'context' ? (
                    <div className="context-card">
                      <span>
                        requestId <b>req-1042</b>
                      </span>
                      <span>
                        level <b>INFO</b>
                      </span>
                      <span>
                        message <b>Order received</b>
                      </span>
                    </div>
                  ) : (
                    <div className="destination-diagram">
                      <Radio size={26} />
                      <span>
                        ↗ Console
                        <br />→ File
                        <br />↘ Logstash
                      </span>
                    </div>
                  )}
                </div>
                <div className="feature-body">
                  <p className="eyebrow">
                    <feature.icon size={14} />
                    {feature.label}
                  </p>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section shell architecture" id="architecture">
          <div className="section-intro">
            <p className="eyebrow">A clear separation of responsibilities</p>
            <h2>
              Only the pieces
              <br />
              <em>you need.</em>
            </h2>
            <p>
              A small API at the center. An implementation at runtime.
              Integrations that fit around your application.
            </p>
            <Link className="text-link" href="/docs/architecture/overview">
              Explore the architecture <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="module-map">
            <div className="module-main">
              <span>YOUR APPLICATION</span>
              <strong>hermes-api</strong>
              <small>Logger · LoggerFactory · MDC · Markers</small>
            </div>
            <div className="module-connector" aria-hidden="true">
              ↓
            </div>
            <div className="module-row">
              <div>
                <strong>hermes-core</strong>
                <span>Delivery & layouts</span>
              </div>
              <div>
                <strong>hermes-processor</strong>
                <span>Compile-time generation</span>
              </div>
            </div>
            <div className="module-addons">
              + Spring Boot starter <span>+ Kotlin DSL</span>
            </div>
          </div>
        </section>
        <section className="section shell integrations" id="use-cases">
          <div className="section-heading">
            <p className="eyebrow">At home in your codebase</p>
            <h2>
              Your stack.<em> Same simplicity.</em>
            </h2>
          </div>
          <div className="integration-list">
            <article>
              <span className="integration-symbol" aria-hidden="true">
                <BrandIcon name="java" size={25} />
              </span>
              <div>
                <h3>Java applications</h3>
                <p>
                  Annotations when you want them. A manual LoggerFactory when
                  you don’t.
                </p>
              </div>
              <Link
                href="/docs/getting-started/basic-usage"
                aria-label="Read Java usage documentation"
              >
                Explore <ArrowUpRight size={15} />
              </Link>
            </article>
            <article>
              <span className="integration-symbol" aria-hidden="true">
                <BrandIcon name="spring" size={24} />
              </span>
              <div>
                <h3>Spring Boot services</h3>
                <p>
                  A dedicated starter, auto-configuration, and familiar
                  application.yaml settings.
                </p>
              </div>
              <Link
                href="/docs/integrations/spring-boot"
                aria-label="Read Spring Boot documentation"
              >
                Explore <ArrowUpRight size={15} />
              </Link>
            </article>
            <article>
              <span className="integration-symbol" aria-hidden="true">
                <BrandIcon name="kotlin" size={23} />
              </span>
              <div>
                <h3>Kotlin & native applications</h3>
                <p>
                  Lazy logging and scoped MDC for Kotlin. Native-image metadata
                  for GraalVM.
                </p>
              </div>
              <Link
                href="/docs/integrations/kotlin"
                aria-label="Read Kotlin documentation"
              >
                Explore <ArrowUpRight size={15} />
              </Link>
            </article>
          </div>
        </section>
        <QuickStartSection />
        <section className="section shell closing">
          <span className="closing-mark">
            <Zap size={30} fill="currentColor" aria-hidden="true" />
          </span>
          <p className="eyebrow">Keep your focus on the application</p>
          <h2>
            A message worth logging.
            <br />
            <em>A little less code to get there.</em>
          </h2>
          <p>Built for the everyday work of building software.</p>
          <div className="closing-actions">
            <a className="button button-primary" href="#quick-start">
              Make room for Hermes <ArrowDown size={16} />
            </a>
            <a className="button button-secondary" href={repository}>
              Explore the source <ArrowUpRight size={16} />
            </a>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
