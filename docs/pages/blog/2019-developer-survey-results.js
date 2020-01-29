import React from 'react';
import TopLayoutBlog from 'docs/src/modules/components/TopLayoutBlog';
import markdown from './2019-developer-survey-results.md';

export default function Page() {
  return <TopLayoutBlog markdown={markdown} />;
}
