'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { OverridableComponent } from '@mui/types';
import { unstable_useId as useId, unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base/composeClasses';
import { styled, useThemeProps } from '../styles';
import { ListSubheaderOwnerState, ListSubheaderTypeMap } from './ListSubheaderProps';
import { getListSubheaderUtilityClass } from './listSubheaderClasses';
import ListSubheaderContext from './ListSubheaderContext';
import useSlot from '../utils/useSlot';
import { INVERTED_COLORS_ATTR } from '../colorInversion/colorInversionUtils';

const useUtilityClasses = (ownerState: ListSubheaderOwnerState) => {
  const { variant, color, sticky } = ownerState;
  const slots = {
    root: [
      'root',
      sticky && 'sticky',
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
  };

  return composeClasses(slots, getListSubheaderUtilityClass, {});
};

const ListSubheaderRoot = styled('div', {
  name: 'JoyListSubheader',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ListSubheaderOwnerState }>(({ theme, ownerState }) => ({
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  marginInline: 'var(--ListItem-marginInline)',
  paddingBlock: 'var(--ListItem-paddingY)',
  paddingInlineStart: 'var(--ListItem-paddingLeft)',
  paddingInlineEnd: 'var(--ListItem-paddingRight)',
  minBlockSize: 'var(--ListItem-minHeight)',
  ...theme.typography['body-xs'],
  fontSize: 'max(0.75em, 0.625rem)',
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  ...(ownerState.sticky && {
    position: 'sticky',
    top: 'var(--ListItem-stickyTop, 0px)', // integration with Menu and Select.
    zIndex: 1,
    background: 'var(--ListItem-stickyBackground)',
  }),
  color: ownerState.color
    ? `var(--_Link-color, rgba(${theme.vars.palette[ownerState.color!]?.mainChannel} / 1))`
    : theme.vars.palette.text.tertiary,
  ...(ownerState.instanceColor && {
    [`&:not([${INVERTED_COLORS_ATTR}])`]: {
      '--_Link-color': theme.vars.palette.text.secondary,
    },
  }),
  ...theme.variants[ownerState.variant!]?.[ownerState.color!],
}));
/**
 *
 * Demos:
 *
 * - [Lists](https://mui.com/joy-ui/react-list/)
 *
 * API:
 *
 * - [ListSubheader API](https://mui.com/joy-ui/api/list-subheader/)
 */
const ListSubheader = React.forwardRef(function ListSubheader(inProps, ref) {
  const props = useThemeProps<typeof inProps & { component?: React.ElementType }>({
    props: inProps,
    name: 'JoyListSubheader',
  });

  const {
    component,
    className,
    children,
    id: idOverride,
    sticky = false,
    variant,
    color,
    slots = {},
    slotProps = {},
    ...other
  } = props;
  const id = useId(idOverride);
  const setSubheaderId = React.useContext(ListSubheaderContext);

  React.useEffect(() => {
    if (setSubheaderId) {
      setSubheaderId(id || '');
    }
  }, [setSubheaderId, id]);

  const ownerState = {
    instanceColor: inProps.color,
    ...props,
    id,
    sticky,
    variant,
    color: variant ? (color ?? 'neutral') : color,
  };

  const classes = useUtilityClasses(ownerState);
  const externalForwardedProps = { ...other, component, slots, slotProps };

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: clsx(classes.root, className),
    elementType: ListSubheaderRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      as: component,
      id,
    },
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<ListSubheaderTypeMap>;

ListSubheader.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
    PropTypes.string,
  ]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * @ignore
   */
  id: PropTypes.string,
  /**
   * The props used for each slot inside.
   * @default {}
   */
  slotProps: PropTypes.shape({
    root: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  }),
  /**
   * The components used for each slot inside.
   * @default {}
   */
  slots: PropTypes.shape({
    root: PropTypes.elementType,
  }),
  /**
   * If `true`, the component has sticky position (with top = 0).
   * @default false
   */
  sticky: PropTypes.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
  /**
   * The [global variant](https://mui.com/joy-ui/main-features/global-variants/) to use.
   */
  variant: PropTypes /* @typescript-to-proptypes-ignore */.oneOfType([
    PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
    PropTypes.string,
  ]),
} as any;

export default ListSubheader;
