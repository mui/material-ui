import * as React from 'react';
import { expectType } from '@mui/types';
import createSlot from './createSlot';

interface Props {
  a: string;
  b?: number;
}

const Component = React.forwardRef<HTMLDivElement, Props>(function Component(props, ref) {
  const { a, b, ...other } = props;
  return React.createElement('div', { ref, ...other });
});

const SlotComponent = createSlot(Component);

function MissingRequiredProps() {
  // @ts-expect-error missing required props
  return <SlotComponent />;
}

function ThrowsOnInvalidProps() {
  // @ts-expect-error throws on invalid prop
  return <SlotComponent a={true} />;
}

function WorkAsExpected() {
  return <SlotComponent a="a" b={2} />;
}
