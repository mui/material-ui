import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import useSlot from '../utils/useSlot';
import Divider from '../Divider/Divider';
import { ListDividerOwnerState, ListDividerTypeMap } from './ListDividerProps';
import { getListDividerUtilityClass } from './listDividerClasses';
import RowListContext from '../List/RowListContext';

const useUtilityClasses = (ownerState: ListDividerOwnerState) => {
  const slots = {
    root: [
      'root',
      // `insetContext` class is already produced by Divider
      ownerState.inset && ownerState.inset !== 'context' && `inset${capitalize(ownerState.inset)}`,
    ],
  };

  return composeClasses(slots, getListDividerUtilityClass, {});
};

const ListDividerRoot = styled(Divider, {
  name: 'JoyListDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListDividerOwnerState }>(({ ownerState }) => ({
  ...(ownerState.inset === 'context' && {
    '--Divider-inset': 'calc(-1 * var(--List-padding))',
  }),
  ...(ownerState.row && {
    marginInline: 'var(--List-divider-gap)',
    ...(ownerState.inset === 'gutter' && {
      marginBlock: 'var(--List-item-paddingY)',
    }),
    ...(ownerState['data-first-child'] === undefined && {
      // combine --List-gap and --List-divider-gap to replicate flexbox gap behavior
      marginInlineStart: 'calc(var(--List-gap) + var(--List-divider-gap))',
    }),
  }),
  ...(!ownerState.row && {
    // by default, the divider line is stretched from edge-to-edge of the List
    // spacing between ListItem can be controlled by `--List-divider-gap` on the List
    ...(ownerState['data-first-child'] === undefined && {
      // combine --List-gap and --List-divider-gap to replicate flexbox gap behavior
      marginBlockStart: 'calc(var(--List-gap) + var(--List-divider-gap))',
    }),
    marginBlockEnd: 'var(--List-divider-gap)',
    ...(ownerState.inset === 'gutter' && {
      marginInlineStart: 'var(--List-item-paddingLeft)',
      marginInlineEnd: 'var(--List-item-paddingRight)',
    }),
    ...(ownerState.inset === 'startDecorator' && {
      marginInlineStart: 'var(--List-item-paddingLeft)',
    }),
    ...(ownerState.inset === 'startContent' && {
      marginInlineStart: 'calc(var(--List-item-paddingLeft) + var(--List-decorator-size))',
    }),
  }),
}));

const ListDivider = React.forwardRef(function ListDivider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyListDivider',
  });

  const row = React.useContext(RowListContext);

  const {
    component = 'li',
    className,
    children,
    inset = 'context',
    orientation = row ? 'vertical' : 'horizontal',
    role = 'separator',
    ...other
  } = props;

  const ownerState = {
    ...props,
    inset,
    row,
    orientation,
  };

  const classes = useUtilityClasses(ownerState);

  const [SlotRoot, rootProps] = useSlot('root', {
    additionalProps: {
      orientation,
      ...(inset === 'context' && { inset }),
      role,
      ...(row && role === 'separator' && { 'aria-orientation': orientation }),
    },
    ref,
    className: clsx(classes.root, className),
    elementType: ListDividerRoot,
    externalForwardedProps: { ...other, component },
    ownerState,
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<ListDividerTypeMap>;

ListDivider.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * The empty space on the side(s) of the divider in a vertical list.
   *
   * For horizontal list (the nearest parent List has `row` prop set to `true`), only `inset="gutter"` affects the list divider.
   */
  inset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['gutter', 'startDecorator', 'startContent']),
    PropTypes.string,
  ]),
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * @ignore
   */
  role: PropTypes.oneOfType([
    PropTypes.oneOf([
      'alert',
      'alertdialog',
      'application',
      'article',
      'banner',
      'button',
      'cell',
      'checkbox',
      'columnheader',
      'combobox',
      'complementary',
      'contentinfo',
      'definition',
      'dialog',
      'directory',
      'document',
      'feed',
      'figure',
      'form',
      'grid',
      'gridcell',
      'group',
      'heading',
      'img',
      'link',
      'list',
      'listbox',
      'listitem',
      'log',
      'main',
      'marquee',
      'math',
      'menu',
      'menubar',
      'menuitem',
      'menuitemcheckbox',
      'menuitemradio',
      'navigation',
      'none',
      'note',
      'option',
      'presentation',
      'progressbar',
      'radio',
      'radiogroup',
      'region',
      'row',
      'rowgroup',
      'rowheader',
      'scrollbar',
      'search',
      'searchbox',
      'separator',
      'slider',
      'spinbutton',
      'status',
      'switch',
      'tab',
      'table',
      'tablist',
      'tabpanel',
      'term',
      'textbox',
      'timer',
      'toolbar',
      'tooltip',
      'tree',
      'treegrid',
      'treeitem',
    ]),
    PropTypes.shape({
      '__@iterator@90': PropTypes.func.isRequired,
      anchor: PropTypes.func.isRequired,
      at: PropTypes.func.isRequired,
      big: PropTypes.func.isRequired,
      blink: PropTypes.func.isRequired,
      bold: PropTypes.func.isRequired,
      charAt: PropTypes.func.isRequired,
      charCodeAt: PropTypes.func.isRequired,
      codePointAt: PropTypes.func.isRequired,
      concat: PropTypes.func.isRequired,
      endsWith: PropTypes.func.isRequired,
      fixed: PropTypes.func.isRequired,
      fontcolor: PropTypes.func.isRequired,
      fontsize: PropTypes.func.isRequired,
      includes: PropTypes.func.isRequired,
      indexOf: PropTypes.func.isRequired,
      italics: PropTypes.func.isRequired,
      lastIndexOf: PropTypes.func.isRequired,
      length: PropTypes.number.isRequired,
      link: PropTypes.func.isRequired,
      localeCompare: PropTypes.func.isRequired,
      match: PropTypes.func.isRequired,
      matchAll: PropTypes.func.isRequired,
      normalize: PropTypes.func.isRequired,
      padEnd: PropTypes.func.isRequired,
      padStart: PropTypes.func.isRequired,
      repeat: PropTypes.func.isRequired,
      replace: PropTypes.func.isRequired,
      search: PropTypes.func.isRequired,
      slice: PropTypes.func.isRequired,
      small: PropTypes.func.isRequired,
      split: PropTypes.func.isRequired,
      startsWith: PropTypes.func.isRequired,
      strike: PropTypes.func.isRequired,
      sub: PropTypes.func.isRequired,
      substr: PropTypes.func.isRequired,
      substring: PropTypes.func.isRequired,
      sup: PropTypes.func.isRequired,
      toLocaleLowerCase: PropTypes.func.isRequired,
      toLocaleUpperCase: PropTypes.func.isRequired,
      toLowerCase: PropTypes.func.isRequired,
      toString: PropTypes.func.isRequired,
      toUpperCase: PropTypes.func.isRequired,
      trim: PropTypes.func.isRequired,
      trimEnd: PropTypes.func.isRequired,
      trimLeft: PropTypes.func.isRequired,
      trimRight: PropTypes.func.isRequired,
      trimStart: PropTypes.func.isRequired,
      valueOf: PropTypes.func.isRequired,
    }),
  ]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default ListDivider;
