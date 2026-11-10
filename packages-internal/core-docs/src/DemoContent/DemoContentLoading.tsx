import * as React from 'react';
import type { ContentLoadingProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import type { DemoOptions } from './DemoContent';
import { DemoContainer } from './DemoContainer';
import { DemoFrameContext } from './DemoFrameContext';
import { useDemoLoading } from './useDemoLoading';

export type DemoContentLoadingProps = ContentLoadingProps<DemoOptions>;

function LoadingContent(props: DemoContentLoadingProps) {
  return <DemoContainer {...useDemoLoading(props)} />;
}

export default function DemoContentLoading(props: DemoContentLoadingProps) {
  const frame = React.useContext(DemoFrameContext);
  return frame ? null : <LoadingContent {...props} />;
}
