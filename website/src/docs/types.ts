export interface DocMeta {
  path: string;
  title: string;
  group: string;
  description: string;
  file: string;
  source: string;
}

export interface DocSection {
  id: string;
  title: string;
  markdown: string;
}

export interface DocPage extends DocMeta {
  markdown: string;
  intro: string;
  sections: DocSection[];
}

export interface SearchPage extends DocMeta {
  sections: { id: string; title: string; text: string }[];
}
