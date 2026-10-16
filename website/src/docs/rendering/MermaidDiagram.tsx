'use client';

import { useEffect, useId, useState } from 'react';

export function MermaidDiagram({ source }: { source: string }) {
  const id = useId().replace(/:/g, '');
  const [svg, setSvg] = useState('');
  const [error, setError] = useState('');
  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const { default: mermaid } = await import('mermaid');
        mermaid.initialize({ startOnLoad: false, securityLevel: 'strict', theme: 'neutral' });
        const result = await mermaid.render(`diagram-${id}`, source);
        if (!cancelled) { setSvg(result.svg); setError(''); }
      } catch {
        if (!cancelled) setError('Diagram could not be rendered. Its source is shown below.');
      }
    }
    void render();
    return () => { cancelled = true; };
  }, [id, source]);
  return (
    <figure className="docs-diagram sequence-scroll">
      {svg ? <div dangerouslySetInnerHTML={{ __html: svg }} /> : <pre>{source}</pre>}
      {error && <figcaption role="status">{error}</figcaption>}
    </figure>
  );
}
