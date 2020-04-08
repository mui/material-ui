import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import withStyles from '../styles/withStyles';

export const styles = (theme) => ({
  /* Styles applied to the root element. */
  root: {
    flex: '1 1 auto',
  },
  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},
  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    marginLeft: 12, // half icon
    padding: '0 0 8px',
  },
  /* Styles applied to the root element if `alternativeLabel={true}`. */
  alternativeLabel: {
    position: 'absolute',
    top: 8 + 4,
    left: 'calc(-50% + 20px)',
    right: 'calc(50% + 20px)',
  },
  /* Pseudo-class applied to the root element if `active={true}`. */
  active: {},
  /* Pseudo-class applied to the root element if `completed={true}`. */
  completed: {},
  /* Pseudo-class applied to the root element if `disabled={true}`. */
  disabled: {},
  /* Styles applied to the line element. */
  line: {
    display: 'block',
    borderColor: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[600],
  },
  /* Styles applied to the root element if `orientation="horizontal"`. */
  lineHorizontal: {
    borderTopStyle: 'solid',
    borderTopWidth: 1,
  },
  /* Styles applied to the root element if `orientation="vertical"`. */
  lineVertical: {
    borderLeftStyle: 'solid',
    borderLeftWidth: 1,
    minHeight: 24,
  },
});

const StepConnector = React.forwardRef(function StepConnector(props, ref) {
  const {
    // eslint-disable-next-line react/prop-types
    active,
    // eslint-disable-next-line react/prop-types
    alternativeLabel = false,
    classes,
    className,
    // eslint-disable-next-line react/prop-types
    completed,
    // eslint-disable-next-line react/prop-types
    disabled,
    // eslint-disable-next-line react/prop-types
    index,
    // eslint-disable-next-line react/prop-types
    orientation = 'horizontal',
    ...other
  } = props;

  return (
    <div
      className={clsx(
        classes.root,
        classes[orientation],
        {
          [classes.alternativeLabel]: alternativeLabel,
          [classes.active]: active,
          [classes.completed]: completed,
          [classes.disabled]: disabled,
        },
        className,
      )}
      ref={ref}
      {...other}
    >
      <span
        className={clsx(classes.line, {
          [classes.lineHorizontal]: orientation === 'horizontal',
          [classes.lineVertical]: orientation === 'vertical',
        })}
      />
    </div>
  );
});

StepConnector.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------
  /**
   * Override or extend the styles applied to the component.
   * See [CSS API](#css) below for more details.
   */
  classes: PropTypes.object,
  /**
   * @ignore
   */
  className: PropTypes.string,
};

export default withStyles(styles, { name: 'MuiStepConnector' })(StepConnector);
