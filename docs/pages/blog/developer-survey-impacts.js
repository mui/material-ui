import * as React from 'react';
import TopLayoutSurvey from 'docs/src/modules/components/TopLayoutSurvey';
import { docs } from './developer-survey-impacts.md?muiMarkdown';

export default function Page() {
  return <TopLayoutSurvey docs={docs} />;
}
