import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';
import markdownRaw from './pagination-item.md';

const pageFilename = 'pagination-item';
const requireRaw = () => markdownRaw;
requireRaw.keys = () => ['./pagination-item.md'];

export async function getStaticProps() {
  const { docs } = prepareMarkdown({ pageFilename, requireRaw });

  return { props: { docs } };
}

export default function Page({ docs }) {
  return <MarkdownDocs docs={docs} />;
}
