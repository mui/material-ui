import React, {Component, PropTypes} from 'react';

const getStyles = ({index}, {stepper}) => {
  const {orientation} = stepper;
  const styles = {
    root: {
      flex: '0 0 auto',
    },
  };

  if (index > 0) {
    if (orientation === 'horizontal') {
      styles.root.marginLeft = -6;
    } else if (orientation === 'vertical') {
      styles.root.marginTop = -14;
    }
  }

  return styles;
};

class Step extends Component {
  static propTypes = {
    /**
     * Sets the step as active. Is passed to child components.
     */
    active: PropTypes.bool,
    /**
     * Should be `Step` sub-components such as `StepLabel`.
     */
    children: PropTypes.node,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
    /**
     * Mark the step as disabled, will also disable the button if
     * `StepButton` is a child of `Step`. Is passed to child components.
     */
    disabled: PropTypes.bool,
    /**
     * @ignore
     * Used internally for numbering.
     */
    index: PropTypes.number,
    /**
     * @ignore
     */
    last: PropTypes.bool,
    /**
     * Override the inline-style of the root element.
     */
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
    stepper: PropTypes.object,
  };

  renderChild = (child) => {
    const {
      active,
      completed,
      disabled,
      index,
      last,
    } = this.props;

    const icon = index + 1;

    return React.cloneElement(child, Object.assign(
      {active, completed, disabled, icon, last},
      child.props
    ));
  }

  render() {
    const {
      active, // eslint-disable-line no-unused-vars
      completed, // eslint-disable-line no-unused-vars
      disabled, // eslint-disable-line no-unused-vars
      index, // eslint-disable-line no-unused-vars
      last, // eslint-disable-line no-unused-vars
      children,
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <div style={prepareStyles(Object.assign(styles.root, style))} {...other}>
        {React.Children.map(children, this.renderChild)}
      </div>
    );
  }
}

export default Step;
