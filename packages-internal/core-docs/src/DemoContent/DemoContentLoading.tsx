import * as React from 'react';
import { NativeCodeSource } from '@mui/internal-docs-infra/NativeCodeSource';
import { useCodeFallback, useContentFrame } from '@mui/internal-docs-infra/CodeHighlighter';
import type { UseCodeFallbackResult } from '@mui/internal-docs-infra/CodeHighlighter';
import type { ContentLoadingProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import type { DemoOptions } from './DemoContent';
import { DemoContainer } from './DemoContainer';
import { useDemoLoading } from './useDemoLoading';
import { loadDemoContent } from './loadDemoContent';

export type DemoContentLoadingProps = ContentLoadingProps<DemoOptions>;

function LoadingContent({
  props,
  fallback,
}: {
  props: DemoContentLoadingProps;
  fallback: UseCodeFallbackResult;
}) {
  return <DemoContainer {...useDemoLoading(props, fallback)} />;
}

export default function DemoContentLoading(props: DemoContentLoadingProps) {
  const { framed } = useContentFrame();

  const fallback = useCodeFallback(props, {
    SourceComponent:
      framed || props.hideToolbar || props.disableLiveEdit ? undefined : NativeCodeSource,
  });
  React.useEffect(() => {
    if (fallback.canLoadContent) {
      void loadDemoContent().catch(() => {});
    }
  }, [fallback.canLoadContent]);

  return framed ? null : <LoadingContent props={props} fallback={fallback} />;
}
