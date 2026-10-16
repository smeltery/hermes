'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function CopyButton({ code }: { code: string }) {
  const [status, setStatus] = useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setStatus('Copied');
    } catch {
      setStatus('Copy unavailable. Select the code to copy it manually.');
    }
  }
  return (
    <div className="copy-control">
      <button type="button" onClick={copy} aria-label="Copy code">
        {status === 'Copied' ? <Check size={14} /> : <Copy size={14} />}
        <span>{status === 'Copied' ? 'Copied' : 'Copy'}</span>
      </button>
      <span
        className={status === 'Copied' ? 'sr-only' : 'copy-status'}
        role="status"
      >
        {status}
      </span>
    </div>
  );
}

export function CodeBlock({
  code,
  language = 'java',
}: {
  code: string;
  language?: string;
}) {
  return (
    <div className="code-block">
      <div className="code-toolbar">
        <span>{language}</span>
        <CopyButton key={code} code={code} />
      </div>
      <pre role="region" tabIndex={0} aria-label={`${language} code`}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
