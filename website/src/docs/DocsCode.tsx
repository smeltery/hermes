import { CopyButton } from '@/components/CodeBlock';
import { highlightCode } from './rendering/highlight';

export function DocsCode({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  return (
    <div className="docs-code">
      <div className="docs-code-heading">
        <span>{language || 'Example'}</span>
        <CopyButton code={code} />
      </div>
      <pre
        className="highlighted-code"
        role="group"
        aria-label={`${language || 'Example'} code`}
        tabIndex={0}
      >
        <span className="code-gutter" aria-hidden="true">
          {code
            .split('\n')
            .map((_, index) => index + 1)
            .join('\n')}
        </span>
        <code
          dangerouslySetInnerHTML={{ __html: highlightCode(code, language) }}
        />
      </pre>
    </div>
  );
}
