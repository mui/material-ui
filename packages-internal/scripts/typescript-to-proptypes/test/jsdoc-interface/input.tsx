import * as React from 'react';
import type { Classes } from './classes';

interface Props {
  /**
   * the classes
   */
  classes?: Partial<Classes>;
}

export default function Component(props: Props) {
  const { classes } = props;

  return (
    <ul>
      <li>root: {classes?.root}</li>
      <li>slot: {classes?.slot}</li>
    </ul>
  );
}
