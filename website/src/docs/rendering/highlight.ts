import hljs from 'highlight.js/lib/core';
import java from 'highlight.js/lib/languages/java';
import kotlin from 'highlight.js/lib/languages/kotlin';
import xml from 'highlight.js/lib/languages/xml';
import yaml from 'highlight.js/lib/languages/yaml';
import json from 'highlight.js/lib/languages/json';
import bash from 'highlight.js/lib/languages/bash';
import groovy from 'highlight.js/lib/languages/groovy';

for (const [name, language] of Object.entries({
  java,
  kotlin,
  xml,
  yaml,
  json,
  bash,
  groovy,
}))
  hljs.registerLanguage(name, language);

export function highlightCode(code: string, label: string) {
  const language =
    (
      { gradle: 'groovy', shell: 'bash', sh: 'bash', yml: 'yaml' } as Record<
        string,
        string
      >
    )[label] ?? label;
  return hljs.getLanguage(language)
    ? hljs.highlight(code, { language }).value
    : code
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}
