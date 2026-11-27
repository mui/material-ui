'use client';

import * as React from 'react';
import type { NumberField as BaseNumberField } from '@base-ui/react/number-field';
import { useRender } from '@base-ui/react/use-render';

type NumberFieldRenderState = BaseNumberField.Root.State & Record<string, unknown>;

interface RenderElementProps extends React.HTMLAttributes<HTMLElement> {
  render?: useRender.RenderProp<NumberFieldRenderState> | undefined;
  renderState?: NumberFieldRenderState | undefined;
}

// Base UI already supplies the state attributes. Keep values available to the
// callback without generating additional attributes for the input's contents.
const stateAttributesMapping = {
  value: () => null,
  inputValue: () => null,
};

/**
 * @ignore - internal component.
 */
const RenderElement = React.forwardRef(function RenderElement(
  props: RenderElementProps,
  ref: React.Ref<HTMLElement>,
) {
  const { render, renderState, ...other } = props;
  return useRender({
    render,
    state: renderState,
    stateAttributesMapping,
    props: other,
    ref,
  });
});

export default RenderElement;
