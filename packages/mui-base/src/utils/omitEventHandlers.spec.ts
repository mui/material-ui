import * as React from 'react';
import { OmitEventHandlers } from './omitEventHandlers';

interface Props {
  onClick: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  on: () => void;
  once: () => void;
  onFieldThatLooksLikeEventHandler: number;
  nonEventHandler: () => void;
  n: number;
  obj: {
    onClick: () => void;
  };
}

function test(props: OmitEventHandlers<Props>) {
  // these are not event handlers
  const { on, once, onFieldThatLooksLikeEventHandler, nonEventHandler, n, obj } = props;

  // nested fields are not affected
  obj.onClick();

  // @ts-expect-error - onClick is removed
  props.onClick();

  // @ts-expect-error - onKeyDown is removed
  props.onKeyDown();

  return props;
}
