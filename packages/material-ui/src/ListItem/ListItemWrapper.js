import * as React from 'react';
import styled from '@emotion/styled';
import isPropValid from '@emotion/is-prop-valid';
import { fade } from '../styles/colorManipulator';
import { default as ListItemBase } from './ListItemUnstyled';

const shouldForwardProp = (prop) =>
  isPropValid(prop) && prop !== 'disabled';

const Root = styled('li', { shouldForwardProp })(props => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  textDecoration: 'none',
  width: '100%',
  boxSizing: 'border-box',
  textAlign: 'left',
  paddingTop: 8,
  paddingBottom: 8,
  ...(props.focusVisible && {
    backgroundColor: props.theme.palette.action.focus,
  }),
  ...(props.selected && {
    backgroundColor: fade(props.theme.palette.primary.main, props.theme.palette.action.selectedOpacity),
    ...(props.focusVisible && {
      backgroundColor: fade(
        props.theme.palette.primary.main,
        props.theme.palette.action.selectedOpacity + props.theme.palette.action.focusOpacity,
      ),
    })
  }),
  ...(props.disabled && {
    opacity: props.theme.palette.action.disabledOpacity,
  }),
  ...(props.dense && {
    paddingTop: 4,
    paddingBottom: 4,
  }),
  ...(props.alignItems === "flex-start" && {
    alignItems: 'flex-start',
  }),
  ...(props.divider && {
    borderBottom: `1px solid ${props.theme.palette.divider}`,
    backgroundClip: 'padding-box',
  }),
  ...(!props.disableGutters && {
    paddingLeft: 16,
    paddingRight: 16,
  }),
  ...(props.button && {
    transition: props.theme.transitions.create('background-color', {
      duration: props.theme.transitions.duration.shortest,
    }),
    ':hover': {
      textDecoration: 'none',
      backgroundColor: props.theme.palette.action.hover,
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    ...(props.selected && {
      ':hover': {
        backgroundColor: fade(
          props.theme.palette.primary.main,
          props.theme.palette.action.selectedOpacity + props.theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: fade(props.theme.palette.primary.main, props.theme.palette.action.selectedOpacity),
        },
      }
    }),
  }),
  ...(props.hasSecondaryAction && {
    // Add some space to avoid collision as `ListItemSecondaryAction`
    // is absolutely positioned.
    paddingRight: 48,
  })
}));

const Container = styled('div', { shouldForwardProp })(props => ({
  position: 'relative',
}));

const ListItem = React.forwardRef(function ListItem(props, ref) {
  return <ListItemBase components={{ container: Container, root: Root }} ref={ref} {...props} />
});

export default ListItem;
