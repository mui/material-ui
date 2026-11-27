'use client';

import * as React from 'react';
import { useCodeFallback } from '@mui/internal-docs-infra/CodeHighlighter';
import type { ContentFrameProps } from '@mui/internal-docs-infra/CodeHighlighter/types';
import type { DemoOptions } from './DemoContent';
import { DemoContainer } from './DemoContainer';
import type { DemoContainerProps } from './DemoContainer';
import { createFrameStore, DemoFrameContext } from './DemoFrameContext';
import { useDemoLoading } from './useDemoLoading';

type DemoFrameProps = ContentFrameProps<DemoOptions>;

const FrameView = React.memo(function FrameView({ loading }: { loading: DemoContainerProps }) {
  const frame = React.useContext(DemoFrameContext)!;
  const snapshot = React.useSyncExternalStore(
    frame.subscribe,
    frame.getSnapshot,
    frame.getSnapshot,
  );
  return (
    <DemoContainer
      {...(snapshot.content ?? loading)}
      preview={loading.preview}
      previewEpoch={snapshot.epoch}
    />
  );
});

export default function DemoContentFrame(props: DemoFrameProps) {
  const [frame] = React.useState(createFrameStore);
  const loading = useDemoLoading(props, useCodeFallback(props));

  // Only the view subscribes; chrome updates must not rerender their publisher.
  return (
    <DemoFrameContext.Provider value={frame}>
      <FrameView loading={loading} />
      {props.children}
    </DemoFrameContext.Provider>
  );
}
