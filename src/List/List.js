import React, {Component, PropTypes, Children, isValidElement} from 'react';
import Subheader from '../Subheader';

class List extends Component {
  static propTypes = {
    /**
     * These are usually `ListItem`s that are passed to
     * be part of the list.
     */
    children: PropTypes.node,
    /**
     * Override the inline-styles of the root element.
     */
    style: PropTypes.object,
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  render() {
    const {
      children,
      style,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;

    let hasSubheader = false;

    const firstChild = Children.toArray(children)[0];
    if (isValidElement(firstChild) && firstChild.type === Subheader) {
      hasSubheader = true;
    }

    const styles = {
      root: {
        padding: `${hasSubheader ? 0 : 8}px 0px 8px 0px`,
      },
    };

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        {children}
      </div>
    );
  }
}

export default List;
