import * as React from 'react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { default as ListItemAvatarBase } from './ListItemAvatarUnstyled';

const shouldForwardProp = (prop) => isPropValid(prop);

const Root = styled('div', { shouldForwardProp })(props => ({
  minWidth: 56,
  flexShrink: 0,
  ...(props.alignItems === 'flex-start' && {
    marginTop: 8,
  }),
}));


const ListItem = React.forwardRef(function ListItem(props, ref) {
  return <ListItemAvatarBase components={{ root: Root }} ref={ref} {...props} />
});

export default ListItem;
