import React, {Component, PropTypes} from 'react';

class MobileTearSheet extends Component {

  static propTypes = {
    children: PropTypes.node,
    height: PropTypes.number.isRequired,
  };

  static defaultProps = {
    height: 500,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      prepareStyles,
    } = this.context.muiTheme;

    const styles = {
      root: {
        float: 'left',
        marginBottom: 24,
        marginRight: 24,
        width: 360,
      },
      container: {
        border: 'solid 1px #d9d9d9',
        borderBottom: 'none',
        height: this.props.height,
        overflow: 'hidden',
      },
      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        width: 360,
      },
    };

    return (
      <div style={prepareStyles(styles.root)}>
        <div style={prepareStyles(styles.container)}>
          {this.props.children}
        </div>
        <img style={prepareStyles(styles.bottomTear)} src="images/bottom-tear.svg" />
      </div>
    );
  }
}

export default MobileTearSheet;
