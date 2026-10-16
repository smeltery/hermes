'use client';
import Link from 'next/link';

import { useState } from 'react';
import { BrandIcon } from '../BrandIcon';
import { CodeBlock } from '../CodeBlock';

const dependencies = {
  Maven: `<dependencies>
  <dependency>
    <groupId>io.github.smeltery</groupId>
    <artifactId>hermes-api</artifactId>
    <version>1.0.0</version>
  </dependency>
  <dependency>
    <groupId>io.github.smeltery</groupId>
    <artifactId>hermes-core</artifactId>
    <version>1.0.0</version>
    <scope>runtime</scope>
  </dependency>
  <dependency>
    <groupId>io.github.smeltery</groupId>
    <artifactId>hermes-processor</artifactId>
    <version>1.0.0</version>
    <scope>provided</scope>
  </dependency>
</dependencies>`,
  Gradle: `dependencies {
    implementation 'io.github.smeltery:hermes-api:1.0.0'
    runtimeOnly 'io.github.smeltery:hermes-core:1.0.0'
    annotationProcessor 'io.github.smeltery:hermes-processor:1.0.0'
}`,
};

export function QuickStartSection() {
  const [tool, setTool] = useState<keyof typeof dependencies>('Gradle');
  return (
    <section className="section shell installation" id="quick-start">
      <div className="section-intro">
        <p className="eyebrow">A small addition to your project</p>
        <h2>
          Your next log.
          <br />
          <em>Start here.</em>
        </h2>
        <p>
          Add the API, runtime, and annotation processor. Then use{' '}
          <code>@InjectLogger</code> and extend the generated superclass.
        </p>
        <ol className="install-steps">
          <li>
            <span>01</span> Add the dependencies
          </li>
          <li>
            <span>02</span> Enable annotation processing
          </li>
          <li>
            <span>03</span> Write your first message
          </li>
        </ol>
        <Link className="text-link" href="/docs/getting-started/quick-start">
          Full setup & compiler configuration ↗
        </Link>
        <p className="fine">
          Java 17+ · Maven 3.8+ or Gradle 7+
          <br />
          Building locally? Run <code>mvn clean install</code> at the repository
          root.
        </p>
      </div>
      <div className="install-panel">
        <div className="install-header">
          <span>Choose your build tool</span>
          <div className="example-options" role="group" aria-label="Build tool">
            {(['Gradle', 'Maven'] as const).map((item) => (
              <button
                key={item}
                onClick={() => setTool(item)}
                aria-pressed={tool === item}
              >
                <BrandIcon
                  name={item === 'Maven' ? 'maven' : 'gradle'}
                  size={15}
                />
                {item}
              </button>
            ))}
          </div>
        </div>
        <CodeBlock
          code={dependencies[tool]}
          language={tool === 'Maven' ? 'pom.xml' : 'build.gradle'}
        />
        <p className="install-note">
          {tool === 'Maven'
            ? 'Merge these dependencies into your pom.xml. Configure hermes-processor in maven-compiler-plugin annotationProcessorPaths; see the full setup guide.'
            : 'Add these entries to your dependencies block. Gradle’s annotationProcessor configuration enables code generation.'}
        </p>
      </div>
    </section>
  );
}
