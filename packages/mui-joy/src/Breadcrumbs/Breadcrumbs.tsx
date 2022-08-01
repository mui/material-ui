import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import breadcrumbsClasses, { getBreadcrumbsUtilityClass } from './breadcrumbsClasses';
import { BreadcrumbsProps, BreadcrumbsTypeMap } from './BreadcrumbsProps';

const useUtilityClasses = (ownerState: BreadcrumbsProps) => {
  const { size } = ownerState;

  const slots = {
    root: ['root', size && `size${capitalize(size)}`],
    li: ['li'],
    ol: ['ol'],
    separator: ['separator'],
  };

  return composeClasses(slots, getBreadcrumbsUtilityClass, {});
};

const BreadcrumbsRoot = styled('nav', {
  name: 'MuiBreadcrumbs',
  slot: 'Root',
  overridesResolver: (props, styles) => {
    return [{ [`& .${breadcrumbsClasses.li}`]: styles.li }, styles.root];
  },
})<{ ownerState: BreadcrumbsProps }>(({ theme, ownerState }) => {
  return [
    {
      ...(ownerState.size === 'sm' && {
        fontSize: theme.vars.fontSize.sm,
        padding: '0.5rem',
      }),
      ...(ownerState.size === 'md' && {
        fontSize: theme.vars.fontSize.md,
        padding: '0.75rem',
      }),
      ...(ownerState.size === 'lg' && {
        fontSize: theme.vars.fontSize.lg,
        padding: '1rem',
      }),
      lineHeight: 1,
    },
    {
      backgroundColor: theme.palette.background.body,
    },
  ];
});

const BreadcrumbsOl = styled('ol', {
  name: 'MuiBreadcrumbs',
  slot: 'Ol',
  overridesResolver: (props, styles) => styles.ol,
})<{ ownerState: BreadcrumbsProps }>({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  padding: 0,
  margin: 0,
  listStyle: 'none',
});

const BreadcrumbsSeparator = styled('li', {
  name: 'MuiBreadcrumbs',
  slot: 'Separator',
  overridesResolver: (props, styles) => styles.separator,
})<{ ownerState: BreadcrumbsProps }>({
  display: 'flex',
  userSelect: 'none',
  marginLeft: 8,
  marginRight: 8,
});

function insertSeparators(
  items: React.ReactNode[],
  className: string,
  separator: React.ReactNode,
  ownerState: BreadcrumbsProps,
) {
  return items.reduce((acc: React.ReactNode[], current: React.ReactNode, index: number) => {
    if (index < items.length - 1) {
      acc = acc.concat(
        current,
        <BreadcrumbsSeparator
          aria-hidden
          key={`separator-${index}`}
          className={className}
          ownerState={ownerState}
        >
          {separator}
        </BreadcrumbsSeparator>,
      );
    } else {
      acc.push(current);
    }

    return acc;
  }, []);
}

const Breadcrumbs = React.forwardRef(function Breadcrumbs(inProps, ref) {
  const props = useThemeProps<typeof inProps & BreadcrumbsProps>({
    props: inProps,
    name: 'MuiBreadcrumbs',
  });

  const {
    children,
    className,
    component = 'nav',
    size = 'md',
    expandText = 'Show path',
    separator = '/',
    ...other
  } = props;

  const ownerState = {
    ...props,
    component,
    expandText,
    separator,
    size,
  };

  const classes = useUtilityClasses(ownerState);

  const listRef = React.useRef<HTMLOListElement>(null);

  const allItems = React.Children.toArray(children)
    .filter((child) => {
      return React.isValidElement(child);
    })
    .map((child, index) => (
      <li className={classes.li} key={`child-${index}`}>
        {child}
      </li>
    ));

  return (
    <BreadcrumbsRoot
      ref={ref}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
    >
      <BreadcrumbsOl className={classes.ol} ref={listRef} ownerState={ownerState}>
        {insertSeparators(allItems, classes.separator, separator, ownerState)}
      </BreadcrumbsOl>
    </BreadcrumbsRoot>
  );
}) as OverridableComponent<BreadcrumbsTypeMap>;

Breadcrumbs.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * The content of the component.
   */
  children: PropTypes.node,
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
   * Override the default label for the expand button.
   *
   * For localization purposes, you can use the provided [translations](/material-ui/guides/localization/).
   * @default 'Show path'
   */
  expandText: PropTypes.string,
  /**
   * Custom separator node.
   * @default '/'
   */
  separator: PropTypes.node,
  /**
   * The size of the component.
   * It accepts theme values between 'sm' and 'lg'.
   * @default 'md'
   */
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
} as any;

export default Breadcrumbs;
