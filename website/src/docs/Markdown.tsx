import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { DocsCode } from './DocsCode';
import { FlowDiagram } from './rendering/FlowDiagram';
import { resolveDocLink } from './content';

export function Markdown({ text, file }: { text: string; file: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href = '', children }) => {
          const target = resolveDocLink(href, file);
          return target.startsWith('/docs') ? (
            <Link href={target}>{children}</Link>
          ) : (
            <a href={target}>{children}</a>
          );
        },
        h3: ({ children }) => (
          <h3 >{children}</h3>
        ),
        table: ({ children }) => (
          <div
            className="docs-table"
            tabIndex={0}
            role="region"
            aria-label="Scrollable reference table"
          >
            <table>{children}</table>
          </div>
        ),
        pre: ({ children }) => <>{children}</>,
        code: ({ className, children }) => {
          const language = /language-(\w+)/.exec(className ?? '')?.[1];
          const code = String(children).replace(/\n$/, '');
          if (language === 'mermaid') return <FlowDiagram source={code} />;
          if (language || String(children).endsWith('\n'))
            return <DocsCode code={code} language={language ?? ''} />;
          return <code>{children}</code>;
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
