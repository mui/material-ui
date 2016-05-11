import React, {Component, PropTypes} from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import ExpandTransitionChild from './ExpandTransitionChild';

class ExpandTransition extends Component {
  static propTypes = {
    children: PropTypes.node,
    enterDelay: PropTypes.number,
    loading: PropTypes.bool,
    open: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    enterDelay: 0,
    loading: false,
    open: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  renderChildren(children, loading) {
    if (loading) {
      return ([]);
    }

    return React.Children.map(children, (child) => {
      return (
        <ExpandTransitionChild
          enterDelay={this.props.enterDelay}
          key={child.key}
        >
          {child}
        </ExpandTransitionChild>
      );
    }, this);
  }

  render() {
    const {
      children,
      loading,
      open,
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    const mergedRootStyles = Object.assign({}, {
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
    }, style);

    const newChildren = this.renderChildren(children, loading);

    return (
      <ReactTransitionGroup
        style={prepareStyles(mergedRootStyles)}
        component="div"
        {...other}
      >
        {open && newChildren}
      </ReactTransitionGroup>
    );
  }
}

export default ExpandTransition;
