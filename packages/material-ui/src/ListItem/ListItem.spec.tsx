import * as React from 'react';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

// loose the type in v5 since `button` is deprecated, remove this in v6,
// button: boolean
function BooleanButtonTest() {
  // https://github.com/mui-org/material-ui/issues/14971

  function EditableItemValid(props: { editable: boolean }) {
    const { editable } = props;
    if (editable) {
      <ListItem button>Editable? Yes</ListItem>;
    }
    return <ListItem>Editable? No</ListItem>;
  }

  function EditableItemBoolean(props: { editable: boolean }) {
    const { editable } = props;
    return <ListItem button={editable}>Editable? {editable}</ListItem>;
  }
}

// loose the type in v5 since `button` is deprecated, remove this in v6.
// verify that https://github.com/mui-org/material-ui/issues/19756 already worked.
function MouseEnterTest() {
  function handleMouseEnter(event: React.MouseEvent<HTMLLIElement>) {}
  <ListItem onMouseEnter={handleMouseEnter} />;

  function handleMouseEnterButton(event: React.MouseEvent<HTMLDivElement>) {}
  // @ts-expect-error
  <ListItem onMouseEnter={handleMouseEnterButton} />; // desired: missing property button
  // @ts-expect-error
  <ListItem button onMouseEnter={handleMouseEnterButton} />;
}

// https://github.com/mui-org/material-ui/issues/26469

const StyledListItem = styled(ListItem)({});
function TestStyledComponent() {
  return <StyledListItem dense />;
}
