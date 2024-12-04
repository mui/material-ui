'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { getDialogTitleUtilityClass } from './dialogTitleClasses';
import { DialogTitleProps, DialogTitleOwnerState, DialogTitleTypeMap } from './DialogTitleProps';
import cardOverflowClasses from '../CardOverflow/cardOverflowClasses';
import useSlot from '../utils/useSlot';
import ModalDialogVariantColorContext from '../ModalDialog/ModalDialogVariantColorContext';
import ModalDialogSizeContext from '../ModalDialog/ModalDialogSizeContext';

const useUtilityClasses = (ownerState: DialogTitleOwnerState) => {
  const { level, color, variant } = ownerState;
  const slots = {
    root: [
      'root',
      level,
      color && `color${capitalize(color)}`,
      variant && `variant${capitalize(variant)}`,
    ],
  };

  return composeClasses(slots, getDialogTitleUtilityClass, {});
};

const DialogTitleRoot = styled('h2', {
  name: 'JoyDialogTitle',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: DialogTitleOwnerState }>(({ theme, ownerState }) => {
  const lineHeight =
    ownerState.level !== 'inherit' ? theme.typography[ownerState.level!]?.lineHeight : '1';
  return {
    '--Icon-fontSize': `calc(1em * ${lineHeight})`,
    ...(ownerState.color && {
      '--Icon-color': 'currentColor',
    }),
    display: 'flex',
    gap: 'clamp(4px, 0.375em, 0.75rem)',
    margin: 'var(--unstable_DialogTitle-margin, 0px)',
    ...(ownerState.level && ownerState.level !== 'inherit' && theme.typography[ownerState.level]),
    color: 'inherit',
    ...(ownerState.variant && {
      borderRadius: theme.vars.radius.xs,
      paddingBlock: 'min(0.1em, 4px)',
      paddingInline: '0.25em', // better than left, right because it also works with writing mode.
      ...theme.variants[ownerState.variant]?.[ownerState.color!],
    }),
    [`.${cardOverflowClasses.root} > &`]: {
      '--unstable_DialogTitle-margin': 'var(--Card-padding) 0',
    },
  };
});

const sizeToLevel = { sm: 'title-md', md: 'title-lg', lg: 'h4' } as const;

/**
 *
 * Demos:
 *
 * - [Modal](https://mui.com/joy-ui/react-modal/)
 *
 * API:
 *
 * - [DialogTitle API](https://mui.com/joy-ui/api/dialog-title/)
 */
const DialogTitle = React.forwardRef(function DialogTitle(inProps, ref) {
  const props = useThemeProps<typeof inProps & DialogTitleProps>({
    props: inProps,
    name: 'JoyDialogTitle',
  });
  const size = React.useContext(ModalDialogSizeContext);
  const context = React.useContext(ModalDialogVariantColorContext);

  const {
    component = 'h2',
    children,
    variant,
    color: colorProp,
    level = sizeToLevel[size || 'md'],
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const color = inProps.color || (variant ? (colorProp ?? 'neutral') : colorProp);

  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
    color,
    variant,
    level,
  };

  const classes = useUtilityClasses(ownerState);

  const [SlotRoot, rootProps] = useSlot('root', {
    ref,
    className: classes.root,
    elementType: DialogTitleRoot,
    externalForwardedProps,
    ownerState,
    additionalProps: {
      id: context?.labelledBy,
    },
  });

  return <SlotRoot {...rootProps}>{children}</SlotRoot>;
}) as OverridableComponent<DialogTitleTypeMap>;

DialogTitle.propTypes /* remove-proptypes */ = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Used to render icon or text elements inside the DialogTitle if `src` is not set.
   * This can be an element, or just a string.
   */
  children: PropTypes.node,
  /**
   * The color of the component. It supports those theme colors that make sense for this component.
   */
  color: PropTypes.oneOf(['danger', 'neutral', 'primary', 'success', 'warning']),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
  /**
   * Applies the theme typography styles.
   * @default { sm: 'title-md', md: 'title-lg', lg: 'h4' }
   */
  level: PropTypes.oneOf([
    'body-lg',
    'body-md',
    'body-sm',
    'body-xs',
    'h1',
    'h2',
    'h3',
    'h4',
    'inherit',
    'title-lg',
    'title-md',
    'title-sm',
  ]),
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
  variant: PropTypes.oneOf(['outlined', 'plain', 'soft', 'solid']),
} as any;

export default DialogTitle;
