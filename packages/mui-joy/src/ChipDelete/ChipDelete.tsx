import { unstable_composeClasses as composeClasses } from '@mui/base';
import { OverridableComponent } from '@mui/types';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useThemeProps } from '../styles';
import styled from '../styles/styled';
import createSvgIcon from '../utils/createSvgIcon';
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
})<{ ownerState: ChipDeleteProps }>({
  color: 'var(--Chip-color)',
  fontSize: 'var(--Chip-fontSize)',
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 'var(--Chip-delete-radius)',
  cursor: 'pointer',
  border: 'none',
  background: 'none',
  padding: '0px',
  '&:hover': {
    opacity: 0.8,
  },
});

const DeleteIcon = createSvgIcon(
  <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />,
  'Delete',
);

const ChipDelete = React.forwardRef(function ChipDelete(inProps, ref) {
  const props = useThemeProps<typeof inProps & ChipDeleteProps>({
    props: inProps,
    name: 'MuiChipDelete',
  });

  const { className, component, ...other } = props;

  const ownerState = props;

  const classes = useUtilityClasses();

  return (
    <ChipDeleteRoot
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      ownerState={ownerState}
      {...other}
    >
      <DeleteIcon />
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
