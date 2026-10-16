'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ArrowUp, ArrowUpRight, Copy, MessageSquare } from 'lucide-react';
import { BrandIcon } from '@/components/BrandIcon';
import { repository } from '@/lib/site';

const providers = [
  { name: 'ChatGPT', icon: 'chatgpt', url: 'https://chatgpt.com/?prompt=' },
  { name: 'Claude', icon: 'claude', url: 'https://claude.ai/new?q=' },
  { name: 'v0', icon: 'v0', url: 'https://v0.app/?q=' },
  { name: 'T3 Chat', icon: 't3', url: 'https://t3.chat/new?q=' },
  { name: 'Scira', icon: 'scira', url: 'https://scira.ai/?q=' },
  {
    name: 'Cursor',
    icon: 'cursor',
    url: 'https://cursor.com/link/prompt?text=',
  },
];

export function DocActions({
  markdown,
  source,
}: {
  markdown: string;
  source: string;
}) {
  const [status, setStatus] = useState('Copy as Markdown');
  const [fallback, setFallback] = useState(false);
  const prompt = encodeURIComponent(
    `Help me use Hermes based on this documentation:\n\n${markdown}`,
  );
  async function copy() {
    try {
      await navigator.clipboard.writeText(markdown);
      setStatus('Markdown copied');
      setFallback(false);
    } catch {
      setFallback(true);
      setStatus('Select Markdown below');
    }
  }
  return (
    <div className="doc-actions">
      <a
        href={`${repository}/edit/master/${source}`}
        target="_blank"
        rel="noreferrer"
      >
        <BrandIcon name="github" size={19} />
        Edit on GitHub
      </a>
      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 'instant'
              : 'smooth',
          })
        }
      >
        <ArrowUp size={19} />
        Scroll to top
      </button>
      <button onClick={copy} aria-live="polite">
        <Copy size={19} />
        {status}
      </button>
      {fallback && (
        <textarea
          readOnly
          aria-label="Page Markdown"
          value={markdown}
          onFocus={(event) => event.target.select()}
        />
      )}
      <details>
        <summary>
          <MessageSquare size={19} />
          Open in chat
          <span className="action-chevron" aria-hidden="true">
            ⌄
          </span>
        </summary>
        <div className="chat-providers">
          {providers.map((provider) => (
            <a
              key={provider.name}
              href={provider.url + prompt}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                className="brand-icon"
                src={`/brands/chat/${provider.icon}.svg`}
                alt=""
                width={19}
                height={19}
                unoptimized
              />
              <span>{provider.name}</span>
              <ArrowUpRight size={14} />
            </a>
          ))}
        </div>
        <p className="chat-note">
          Opens with this page’s documentation in the prompt.
        </p>
      </details>
    </div>
  );
}
