import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '@material-ui/core/styles/withStyles';
import withForwardedRef from '@material-ui/core/utils/withForwardedRef';
import SelectableGroup from '../SelectableGroup';

export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: 2,
    display: 'inline-flex',
  },
});

function ToggleButtonGroup(props) {
  const { children, className, classes, exclusive, onChange, value, ...other } = props;

  return (
    <SelectableGroup exclusive={exclusive} onChange={onChange} value={value}>
      <div className={clsx(classes.root, className)} {...other}>
        {children}
      </div>
    </SelectableGroup>
  );
}

ToggleButtonGroup.propTypes = {
  /**
   * The content of the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object.isRequired,
  /**
   * @ignore
   */
  className: PropTypes.string,
  /**
   * If `true`, only allow one of the child ToggleButton values to be selected.
   */
  exclusive: PropTypes.bool,
  /**
   * @ignore
   * from `withForwardRef`
   */
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  /**
   * Callback fired when the value changes.
   *
   * @param {object} event The event source of the callback
   * @param {object} value of the selected buttons. When `exclusive` is true
   * this is a single value; when false an array of selected values. If no value
   * is selected and `exclusive` is true the value is null; when false an empty array.
   */
  onChange: PropTypes.func,
  /**
   * The currently selected value within the group or an array of selected
   * values when `exclusive` is false.
   */
  value: PropTypes.any,
};

ToggleButtonGroup.defaultProps = {
  exclusive: false,
};

export default withStyles(styles, { name: 'MuiToggleButtonGroup' })(
  withForwardedRef(ToggleButtonGroup),
);
