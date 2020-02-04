import React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import markdown from './november-2019-update.md';

export default function Page() {
  return <TopLayoutBlog markdown={markdown} />;
}
