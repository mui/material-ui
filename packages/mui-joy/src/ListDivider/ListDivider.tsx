import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { OverridableComponent } from '@mui/types';
import composeClasses from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListDividerProps, ListDividerTypeMap } from './ListDividerProps';
import { getListDividerUtilityClass } from './listDividerClasses';
import RowListContext from '../List/RowListContext';

const useUtilityClasses = (ownerState: ListDividerProps) => {
  const slots = {
    root: ['root', ownerState.inset && `inset${capitalize(ownerState.inset)}`],
  };

  return composeClasses(slots, getListDividerUtilityClass, {});
};

const ListDividerRoot = styled('li', {
  name: 'JoyListDivider',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListDividerProps & { row: boolean; 'data-first-child'?: boolean } }>(
  ({ theme, ownerState }) => ({
    border: 'none', // reset the border for `hr` tag
    ...(ownerState.row && {
      borderInlineStart: '1px solid',
      marginBlock: 0,
      marginInline: 'var(--List-divider-gap)',
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
      marginInline: 'calc(-1 * var(--List-padding))',
      ...(ownerState.inset === 'gutter' && {
        marginInlineStart: 'var(--List-item-paddingLeft)',
        marginInlineEnd: 'var(--List-item-paddingRight)',
      }),
      ...(ownerState.inset === 'startDecorator' && {
        marginInlineStart: 'var(--List-item-paddingLeft)',
      }),
      ...(ownerState.inset === 'startContent' && {
        marginInlineStart: 'calc(var(--List-item-paddingLeft) + var(--List-decorator-width))',
      }),
      borderBlockEnd: '1px solid',
    }),
    borderColor: theme.vars.palette.divider,
    listStyle: 'none',
  }),
);

const ListDivider = React.forwardRef(function ListDivider(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyListDivider',
  });

  const row = React.useContext(RowListContext);

  const { component, className, children, inset, ...other } = props;

  const ownerState = {
    inset,
    row,
    ...props,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <ListDividerRoot
      ref={ref}
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      role="separator"
      {...(!('role' in inProps) &&
        row && {
          // The implicit aria-orientation of separator is 'horizontal'
          // https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/separator_role
          'aria-orientation': 'vertical',
        })}
      {...other}
    >
      {children}
    </ListDividerRoot>
  );
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
   * The empty space on the side(s) of the divider.
   * This prop has no effect on the divider if the nearest parent List has `row` prop set to `true`.
   */
  inset: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['gutter', 'startDecorator', 'startContent']),
    PropTypes.string,
  ]),
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
      '__@iterator@91': PropTypes.func.isRequired,
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
