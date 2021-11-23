import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { unstable_useId as useId } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
import { styled, useThemeProps } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TableCell from '@mui/material/TableCell';
import Toolbar from '@mui/material/Toolbar';
import tablePaginationClasses, { getTablePaginationUtilityClass } from './tablePaginationClasses';
import { IconButton } from '@mui/material';
import LastPageIcon from '@mui/material/internal/svg-icons/LastPage';
import FirstPageIcon from '@mui/material/internal/svg-icons/FirstPage';
import KeyboardArrowLeft from '@mui/material/internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/material/internal/svg-icons/KeyboardArrowRight';

// This component is needed as the IconButton does not merge the ownerState
// coming from props. This results in the prop overriding the internal ownerState
const CustomIconButton = React.forwardRef((props, ref) => {
  const { ownerState, ...other } = props;
  return <IconButton ref={ref} {...other} />;
});

const TablePaginationRoot = styled('td', {
  name: 'MuiTablePagination',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})(({ theme }) => ({
  overflow: 'auto',
  color: theme.palette.text.primary,
  fontSize: theme.typography.pxToRem(14),
  // Increase the specificity to override TableCell.
  '&:last-child': {
    padding: 0,
  },
}));

const TablePaginationToolbar = styled(Toolbar, {
  name: 'MuiTablePagination',
  slot: 'Toolbar',
  overridesResolver: (props, styles) => ({
    [`& .${tablePaginationClasses.actions}`]: styles.actions,
    ...styles.toolbar,
  }),
})(({ theme }) => ({
  minHeight: 52,
  paddingRight: 2,
  [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
    minHeight: 52,
  },
  [theme.breakpoints.up('sm')]: {
    minHeight: 52,
    paddingRight: 2,
  },
  [`& .${tablePaginationClasses.actions}`]: {
    flexShrink: 0,
    marginLeft: 20,
  },
}));

const TablePaginationSpacer = styled('div', {
  name: 'MuiTablePagination',
  slot: 'Spacer',
  overridesResolver: (props, styles) => styles.spacer,
})({
  flex: '1 1 100%',
});

const TablePaginationSelectLabel = styled('p', {
  name: 'MuiTablePagination',
  slot: 'SelectLabel',
  overridesResolver: (props, styles) => styles.selectLabel,
})(({ theme }) => ({
  ...theme.typography.body2,
  flexShrink: 0,
}));

const TablePaginationSelect = styled(Select, {
  name: 'MuiTablePagination',
  slot: 'Select',
  overridesResolver: (props, styles) => ({
    [`& .${tablePaginationClasses.selectIcon}`]: styles.selectIcon,
    [`& .${tablePaginationClasses.select}`]: styles.select,
    ...styles.input,
    ...styles.selectRoot,
  }),
})({
  color: 'inherit',
  fontSize: 'inherit',
  flexShrink: 0,
  marginRight: 32,
  marginLeft: 8,
  [`& .${tablePaginationClasses.select}`]: {
    paddingLeft: 8,
    paddingRight: 24,
    textAlign: 'right',
    textAlignLast: 'right', // Align <select> on Chrome.
  },
});

const TablePaginationMenuItem = styled(MenuItem, {
  name: 'MuiTablePagination',
  slot: 'MenuItem',
  overridesResolver: (props, styles) => styles.menuItem,
})({});

const TablePaginationDisplayedRows = styled('p', {
  name: 'MuiTablePagination',
  slot: 'DisplayedRows',
  overridesResolver: (props, styles) => styles.displayedRows,
})(({ theme }) => ({
  ...theme.typography.body2,
  flexShrink: 0,
}));

const useUtilityClasses = (ownerState) => {
  const { classes } = ownerState;
  const slots = {
    root: ['root'],
    toolbar: ['toolbar'],
    spacer: ['spacer'],
    selectLabel: ['selectLabel'],
    select: ['select'],
    input: ['input'],
    selectIcon: ['selectIcon'],
    menuItem: ['menuItem'],
    displayedRows: ['displayedRows'],
    actions: ['actions'],
  };

  return composeClasses(slots, getTablePaginationUtilityClass, classes);
};

/**
 * A `TableCell` based component for placing inside `TableFooter` for pagination.
 */
const TablePagination = React.forwardRef(function TablePagination(inProps, ref) {
  const props = useThemeProps({ props: inProps, name: 'MuiTablePagination' });
  const {
    ActionsComponent,
    backIconButtonProps,
    className,
    component = TableCell,
    nextIconButtonProps,
    SelectProps = {},
    showFirstButton = false,
    showLastButton = false,
    ...other
  } = props;

  const ownerState = props;
  const classes = useUtilityClasses(ownerState);

  const MenuItemComponent = SelectProps.native ? 'option' : TablePaginationMenuItem;

  const selectId = useId(SelectProps.id);
  const labelId = useId(SelectProps['aria-labelledby']);

  return (
    <TablePaginationUnstyled
      components={{
        Root: TablePaginationRoot,
        Actions: ActionsComponent,
        Toolbar: TablePaginationToolbar,
        Spacer: TablePaginationSpacer,
        SelectLabel: TablePaginationSelectLabel,
        Select: TablePaginationSelect,
        MenuItem: MenuItemComponent,
        DisplayedRows: TablePaginationDisplayedRows,
      }}
      componentsProps={{
        actions: {
          components: {
            FirstButton: CustomIconButton,
            LastButton: CustomIconButton,
            NextButton: CustomIconButton,
            BackButton: CustomIconButton,
            LastPageIcon,
            FirstPageIcon,
            NextPageIcon: KeyboardArrowRight,
            BackPageIcon: KeyboardArrowLeft,
          },
          componentsProps: {
            backButton: backIconButtonProps,
            nextButton: nextIconButtonProps,
          },
          showFirstButton,
          showLastButton,
          className: classes.actions,
        },
        select: {
          variant: 'standard',
          input: <InputBase />,
          ...SelectProps,
          id: selectId,
          labelId,
          'aria-labelledby': labelId,
          className: clsx(classes.select, SelectProps.className),
        },
        menuItem: {
          className: classes.menuItem,
        },
        displayedRows: {
          className: classes.displayedRows,
        },
        selectLabel: {
          className: classes.selectLabel,
        },
        spacer: {
          className: classes.spacer,
        },
        toolbar: {
          className: classes.toolbar,
        },
      }}
      ref={ref}
      as={component}
      ownerState={ownerState}
      className={clsx(classes.root, className)}
      {...other}
    />
  );
});

TablePagination.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * The component used for displaying the actions.
   * Either a string to use a HTML element or a component.
   * @default TablePaginationActions
   */
  ActionsComponent: PropTypes.elementType,
  /**
   * Props applied to the back arrow [`IconButton`](/api/icon-button/) component.
   */
  backIconButtonProps: PropTypes.object,
  /**
   * @ignore
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
  component: PropTypes.oneOfType([
    PropTypes.oneOf([
      'a',
      'abbr',
      'address',
      'animate',
      'animateMotion',
      'animateTransform',
      'area',
      'article',
      'aside',
      'audio',
      'b',
      'base',
      'bdi',
      'bdo',
      'big',
      'blockquote',
      'body',
      'br',
      'button',
      'canvas',
      'caption',
      'circle',
      'cite',
      'clipPath',
      'code',
      'col',
      'colgroup',
      'data',
      'datalist',
      'dd',
      'defs',
      'del',
      'desc',
      'details',
      'dfn',
      'dialog',
      'div',
      'dl',
      'dt',
      'ellipse',
      'em',
      'embed',
      'feBlend',
      'feColorMatrix',
      'feComponentTransfer',
      'feComposite',
      'feConvolveMatrix',
      'feDiffuseLighting',
      'feDisplacementMap',
      'feDistantLight',
      'feDropShadow',
      'feFlood',
      'feFuncA',
      'feFuncB',
      'feFuncG',
      'feFuncR',
      'feGaussianBlur',
      'feImage',
      'feMerge',
      'feMergeNode',
      'feMorphology',
      'feOffset',
      'fePointLight',
      'feSpecularLighting',
      'feSpotLight',
      'feTile',
      'feTurbulence',
      'fieldset',
      'figcaption',
      'figure',
      'filter',
      'footer',
      'foreignObject',
      'form',
      'g',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'head',
      'header',
      'hgroup',
      'hr',
      'html',
      'i',
      'iframe',
      'image',
      'img',
      'input',
      'ins',
      'kbd',
      'keygen',
      'label',
      'legend',
      'li',
      'line',
      'linearGradient',
      'link',
      'main',
      'map',
      'mark',
      'marker',
      'mask',
      'menu',
      'menuitem',
      'meta',
      'metadata',
      'meter',
      'mpath',
      'nav',
      'noindex',
      'noscript',
      'object',
      'ol',
      'optgroup',
      'option',
      'output',
      'p',
      'param',
      'path',
      'pattern',
      'picture',
      'polygon',
      'polyline',
      'pre',
      'progress',
      'q',
      'radialGradient',
      'rect',
      'rp',
      'rt',
      'ruby',
      's',
      'samp',
      'script',
      'section',
      'select',
      'slot',
      'small',
      'source',
      'span',
      'stop',
      'strong',
      'style',
      'sub',
      'summary',
      'sup',
      'svg',
      'switch',
      'symbol',
      'table',
      'tbody',
      'td',
      'template',
      'text',
      'textarea',
      'textPath',
      'tfoot',
      'th',
      'thead',
      'time',
      'title',
      'tr',
      'track',
      'tspan',
      'u',
      'ul',
      'use',
      'var',
      'video',
      'view',
      'wbr',
      'webview',
    ]),
    PropTypes.elementType,
    PropTypes.func,
  ]),
  /**
   * Props applied to the next arrow [`IconButton`](/api/icon-button/) element.
   */
  nextIconButtonProps: PropTypes.object,
  /**
   * Props applied to the rows per page [`Select`](/api/select/) element.
   * @default {}
   */
  SelectProps: PropTypes.object,
  /**
   * If `true`, show the first-page button.
   * @default false
   */
  showFirstButton: PropTypes.bool,
  /**
   * If `true`, show the last-page button.
   * @default false
   */
  showLastButton: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default TablePagination;
