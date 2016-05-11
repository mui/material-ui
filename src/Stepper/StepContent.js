import React, {Component, PropTypes} from 'react';
import ExpandTransition from '../internal/ExpandTransition';
import warning from 'warning';

const getStyles = (props, context) => {
  const styles = {
    root: {
      marginTop: -14,
      marginLeft: 14 + 11, // padding + 1/2 icon
      paddingLeft: 24 - 11 + 8,
      paddingRight: 16,
      overflow: 'hidden',
    },
  };

  if (!props.last) {
    styles.root.borderLeft = `1px solid ${context.muiTheme.stepper.connectorLineColor}`;
  }

  return styles;
};

class StepContent extends Component {
  static propTypes = {
    /**
     * Expands the content
     */
    active: PropTypes.bool,
    /**
     * Step content
     */
    children: PropTypes.node,
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

  render() {
    const {
      active,
      children,
      last, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;
    const {stepper, muiTheme: {prepareStyles}} = this.context;

    if (stepper.orientation !== 'vertical') {
      warning(false, '<StepContent /> is only designed for use with the vertical stepper.');
      return null;
    }

    const styles = getStyles(this.props, this.context);

    return (
      <div style={prepareStyles(Object.assign(styles.root, style))} {...other}>
        <ExpandTransition enterDelay={450} open={active}>
          <div style={{overflow: 'hidden'}}>{children}</div>
        </ExpandTransition>
      </div>
    );
  }
}

export default StepContent;
