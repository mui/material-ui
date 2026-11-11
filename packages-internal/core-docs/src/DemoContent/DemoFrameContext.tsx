import * as React from 'react';
import { useContentFrame } from '@mui/internal-docs-infra/CodeHighlighter';
import useEnhancedEffect from '@mui/utils/useEnhancedEffect';
import { DemoContainer } from './DemoContainer';
import type { DemoContainerProps } from './DemoContainer';

interface FrameSnapshot {
  content: DemoContainerProps | null;
  epoch: number;
}

interface FrameStore {
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => FrameSnapshot;
  update: (owner: object, content: DemoContainerProps) => void;
  remove: (owner: object) => void;
}

export const DemoFrameContext = React.createContext<FrameStore | null>(null);

export function createFrameStore(): FrameStore {
  let snapshot: FrameSnapshot = { content: null, epoch: 0 };
  let activeOwner: object | null = null;
  let contentEpoch = 0;
  const listeners = new Set<() => void>();
  const notify = () => listeners.forEach((listener) => listener());

  return {
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    getSnapshot: () => snapshot,
    update(owner, content) {
      const nextEpoch = content.previewEpoch ?? 0;
      const reset = activeOwner === owner && nextEpoch !== contentEpoch;
      activeOwner = owner;
      contentEpoch = nextEpoch;
      snapshot = { content, epoch: snapshot.epoch + (reset ? 1 : 0) };
      notify();
    },
    remove(owner) {
      if (activeOwner !== owner) {
        return;
      }
      activeOwner = null;
      snapshot = { ...snapshot, content: null };
      notify();
    },
  };
}

export function DemoFrameContent(props: DemoContainerProps) {
  const frame = React.useContext(DemoFrameContext);
  const { framed } = useContentFrame();
  const owner = React.useRef({});

  useEnhancedEffect(() => {
    if (framed) {
      frame?.update(owner.current, props);
    }
  }, [frame, framed, props]);

  useEnhancedEffect(() => {
    const id = owner.current;
    return () => {
      if (framed) {
        frame?.remove(id);
      }
    };
  }, [frame, framed]);

  return framed ? null : <DemoContainer {...props} />;
}
