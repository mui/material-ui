'use client';
import * as React from 'react';
import { useRender } from '@base-ui/react/use-render';

type RenderState = Record<string, unknown>;

export interface RenderElementProps extends React.HTMLAttributes<HTMLElement> {
  render: useRender.RenderProp<RenderState>;
  renderState: RenderState;
}

/**
 * @ignore - internal component.
 */
const RenderElement = React.forwardRef(function RenderElement(
  props: RenderElementProps,
  ref: React.Ref<HTMLElement>,
) {
  const { render, renderState, ...other } = props;
  return useRender({ render, state: renderState, props: other, ref });
});

export default RenderElement;
