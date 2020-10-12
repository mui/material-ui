import React from 'react';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import { prepareMarkdown } from 'docs/src/modules/utils/parseMarkdown';
import markdownRaw from './card-header.md';

const pageFilename = 'card-header';
const requireRaw = () => markdownRaw;
requireRaw.keys = () => ['./card-header.md'];

export async function getStaticProps() {
  const { docs } = prepareMarkdown({ pageFilename, requireRaw });

  return { props: { docs } };
}

export default function Page({ docs }) {
  return <MarkdownDocs docs={docs} />;
}
