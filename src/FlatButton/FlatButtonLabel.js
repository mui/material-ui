import React, {Component, PropTypes} from 'react';

function getStyles(props, context) {
  const {baseTheme} = context.muiTheme;

  return {
    root: {
      position: 'relative',
      paddingLeft: baseTheme.spacing.desktopGutterLess,
      paddingRight: baseTheme.spacing.desktopGutterLess,
      verticalAlign: 'middle',
    },
  };
}

class FlatButtonLabel extends Component {
  static propTypes = {
    label: PropTypes.node,
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      label,
      style,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    return (
      <span style={prepareStyles(Object.assign(styles.root, style))}>{label}</span>
    );
  }
}

export default FlatButtonLabel;
