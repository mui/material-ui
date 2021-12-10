import React from 'react';

export interface OptionGroupProps {
  /**
   * The human-readable description of the group.
   */
  label?: React.ReactNode;
  children: React.ReactNode;
  /**
   * If `true` all the options in the group will be disabled.
   */
  disabled?: boolean;
}

type OptionGroupType = (props: OptionGroupProps) => React.ReactElement | null;

/**
 * @ignore - internal component.
 */
const OptionGroup: OptionGroupType = function OptionGroup() {
  return null;
};

export default OptionGroup;
