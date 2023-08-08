'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import { unstable_capitalize as capitalize } from '@mui/utils';
import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import { useColorInversion } from '../styles/ColorInversion';
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
    ...(ownerState.color &&
      ownerState.color !== 'context' && {
        color: `rgba(${theme.vars.palette[ownerState.color]?.mainChannel} / 1)`,
      }),
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
/**
 * ⚠️ DialogTitle must be used as a direct child of the [Card](https://mui.com/joy-ui/react-card/) component.
 *
 * Demos:
 *
 * - [Card](https://mui.com/joy-ui/react-card/)
 *
 * API:
 *
 * - [DialogTitle API](https://mui.com/joy-ui/api/card-content/)
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
    level,
    slots = {},
    slotProps = {},
    ...other
  } = props;

  const { getColor } = useColorInversion(variant);
  const color = getColor(inProps.color, variant ? colorProp ?? 'neutral' : colorProp);

  const externalForwardedProps = { ...other, component, slots, slotProps };

  const ownerState = {
    ...props,
    component,
    color,
    variant,
    level: ({ sm: 'title-md', md: 'title-lg', lg: 'h4' } as const)[size || 'md'] || 'title-lg',
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
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * Used to render icon or text elements inside the DialogTitle if `src` is not set.
   * This can be an element, or just a string.
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
   * The component orientation.
   * @default 'vertical'
   */
  orientation: PropTypes.oneOf(['horizontal', 'vertical']),
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
} as any;

export default DialogTitle;
