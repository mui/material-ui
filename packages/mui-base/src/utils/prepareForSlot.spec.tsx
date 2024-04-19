import * as React from 'react';
import { prepareForSlot } from './prepareForSlot';

interface Props {
  a: string;
  b?: number;
}

const Component = React.forwardRef<HTMLDivElement, Props>(function Component(props, ref) {
  const { a, b, ...other } = props;
  return <div {...other} />;
});

const SlotComponent = prepareForSlot(Component);

function MissingRequiredProps() {
  // @ts-expect-error missing required props
  return <SlotComponent />;
}

function ThrowsOnInvalidProps() {
  // @ts-expect-error throws on invalid prop
  return <SlotComponent a={false} />;
}

function WorkAsExpected() {
  return <SlotComponent a="a" b={2} />;
}
