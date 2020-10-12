import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';
import markdownRaw from './typography.md';

const pageFilename = 'typography';
const requireRaw = () => markdownRaw;
requireRaw.keys = () => ['./typography.md'];

export async function getStaticProps() {
  const { docs } = prepareMarkdown({ pageFilename, requireRaw });

  return { props: { docs } };
}

export default function Page({ docs }) {
  return <MarkdownDocs docs={docs} />;
}
