// @flow

import React from 'react';
import PropTypes from 'prop-types';
import Radio from './Radio';
import withSwitchLabel from '../internal/withSwitchLabel';

const LabelRadio = withSwitchLabel(Radio);

export const LabelRadioDocs = () => <span />;

LabelRadioDocs.propTypes = {
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

export default LabelRadio;
