import * as React from 'react';
import clsx from 'clsx';
import { experimentalStyled as styled } from '@material-ui/core/styles';

const Child = (props: { classes?: { root?: string }; className?: string }) => {
  const { classes = {}, className, ...other } = props;

  return (
    <div
      data-testid="child"
      className={clsx(classes.root, className, 'MuiChild-root')}
      {...other}
    />
  );
};

const ParentRoot = styled('div', {}, { name: 'MuiParent', slot: 'Root' })``;
const ParentSlot = styled(Child, {}, { name: 'MuiChild', slot: 'Slot' })``;

const Parent = (props: { classes?: { root?: string; slot?: string }; className?: string }) => {
  const { classes = {}, className, ...other } = props;

  return (
    <ParentRoot
      data-testid="parent"
      className={clsx(classes.root, className, 'MuiParent-root')}
      {...other}
    >
      {/* The classes prop here should not be blocked by the styled() utility */}
      <ParentSlot classes={{ root: classes.slot }}></ParentSlot>
    </ParentRoot>
  );
};

export default function ClassesPropsTest() {
  return <Parent classes={{ root: 'root', slot: 'slot' }} />;
}
