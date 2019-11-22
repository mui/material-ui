// TODO: upstream

declare module 'react-swipeable-views-utils' {
  import * as React from 'react';
  import { ConsistentWith, Omit, PropInjector } from '@material-ui/types';
  import { OnChangeIndexCallback, OnSwitchingCallback } from 'react-swipeable-views';

  export interface WithAutoPlay {
    index: number;
    onChangeIndex: OnChangeIndexCallback;
    onSwitching?: OnSwitchingCallback;
  }
  export interface WithAutoPlayProps {
    autoplay?: boolean;
    direction?: 'incremental' | 'decremental';
    index: number;
    interval?: number;
    onChangeIndex: OnChangeIndexCallback;
    slideCount?: number;
  }

  export const autoPlay: PropInjector<WithAutoPlay, WithAutoPlayProps>;
}
