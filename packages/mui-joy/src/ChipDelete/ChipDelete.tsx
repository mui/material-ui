import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { OverridableComponent } from '@mui/types';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import { unstable_composeClasses as composeClasses, useButton } from '@mui/base';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import Close from '../internal/svg-icons/Close';
import { getChipDeleteUtilityClass } from './chipDeleteClasses';
import { ChipDeleteProps, ChipDeleteTypeMap } from './ChipDeleteProps';

const useUtilityClasses = () => {
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getChipDeleteUtilityClass, {});
};

const ChipDeleteRoot = styled('button', {
  name: 'MuiChipDelete',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
})<{ ownerState: ChipDeleteProps }>(({ theme, ownerState }) => [
  {
    width: 'var(--Chip-delete-size, 1.5rem)',
    height: 'var(--Chip-delete-size, 1.5rem)',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 'var(--Chip-delete-radius)',
    border: 'none', // reset user agent stylesheet
    background: 'none', // reset user agent stylesheet
    padding: '0px', // reset user agent stylesheet
  },
  theme.focus.default,
  theme.variants[ownerState.variant!]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Hover`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Active`]?.[ownerState.color!],
  theme.variants[`${ownerState.variant!}Disabled`]?.[ownerState.color!],
]);

const ChipDelete = React.forwardRef(function ChipDelete(inProps, ref) {
  const props = useThemeProps<typeof inProps & ChipDeleteProps>({
    props: inProps,
    name: 'MuiChipDelete',
  });

  const { className, component, variant = 'contained', color = 'primary', ...other } = props;

  const buttonRef = React.useRef<HTMLElement | null>(null);
  const handleRef = useForkRef(buttonRef, ref);

  const { focusVisible, getRootProps } = useButton({
    ...props,
    component,
    ref: handleRef,
  });

  const ownerState = {
    ...props,
    variant,
    color,
    focusVisible,
  };

  const classes = useUtilityClasses();

  return (
    <ChipDeleteRoot
      as={component}
      className={clsx(classes.root, className)}
      ownerState={ownerState}
      {...other}
      {...getRootProps()}
    >
      <Close />
    </ChipDeleteRoot>
  );
}) as OverridableComponent<ChipDeleteTypeMap>;

ChipDelete.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
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
} as any;

export default ChipDelete;
