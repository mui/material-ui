'use client';

import * as React from 'react';
import { NativeCodeSource } from '@mui/internal-docs-infra/NativeCodeSource';
import { useCodeFallback } from '@mui/internal-docs-infra/CodeHighlighter';
import type { ContentFrameProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import type { DemoOptions } from './DemoContent';
import { DemoContainer } from './DemoContainer';
import type { DemoContainerProps } from './DemoContainer';
import { createFrameStore, DemoFrameContext } from './DemoFrameContext';
import { useDemoLoading } from './useDemoLoading';

type DemoFrameProps = ContentFrameProps<DemoOptions>;

const FrameView = React.memo(function FrameView({
  loading,
  initialFocusedLines,
}: {
  loading: DemoContainerProps;
  initialFocusedLines?: number;
}) {
  const frame = React.useContext(DemoFrameContext)!;

  const snapshot = React.useSyncExternalStore(
    frame.subscribe,
    frame.getSnapshot,
    frame.getSnapshot,
  );

  const content = snapshot.content ?? loading;
  const hideSource = initialFocusedLines === 0 && !content.expanded;

  return (
    <DemoContainer
      {...content}
      sourceVisible={hideSource ? false : content.sourceVisible}
      preview={loading.preview}
      previewEpoch={snapshot.epoch}
    />
  );
});

export default function DemoContentFrame(props: DemoFrameProps) {
  const [frame] = React.useState(createFrameStore);

  const loading = useDemoLoading(
    props,
    useCodeFallback(props, {
      SourceComponent: props.hideToolbar || props.disableLiveEdit ? undefined : NativeCodeSource,
    }),
  );

  // Only the view subscribes; chrome updates must not rerender their publisher.
  return (
    <DemoFrameContext.Provider value={frame}>
      <FrameView loading={loading} initialFocusedLines={props.focusedLines} />
      {props.children}
    </DemoFrameContext.Provider>
  );
}
