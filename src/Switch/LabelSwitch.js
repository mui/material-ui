// @flow

import React from 'react';
import PropTypes from 'prop-types';
import Switch from './Switch';
import withSwitchLabel from '../internal/withSwitchLabel';

const LabelSwitch = withSwitchLabel(Switch);

export const LabelSwitchDocs = () => <span />;

LabelSwitchDocs.propTypes = {
  /**
   * Useful to extend the style applied to components.
   */
  classes: PropTypes.object.isRequired,
  /**
   * If `true`, the control will be disabled.
   */
  disabled: PropTypes.bool,
  /**
   * The text to be used in an enclosing label element.
   */
  label: PropTypes.node,
  /**
   * The className to be used in an enclosing label element.
   */
  labelClassName: PropTypes.string,
};

export default LabelSwitch;
