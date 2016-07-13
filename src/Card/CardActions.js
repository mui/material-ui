import React, {Component, PropTypes} from 'react';

function getStyles() {
  return {
    root: {
      padding: 8,
      position: 'relative',
    },
    action: {
      marginRight: 8,
    },
  };
}

class CardActions extends Component {
  static propTypes = {
    /**
     * If true, a click on this card component expands the card.
     */
    actAsExpander: PropTypes.bool,
    /**
     * Can be used to render elements inside the Card Action.
     */
    children: PropTypes.node,
    /**
     * If true, this card component is expandable.
     */
    expandable: PropTypes.bool,
    /**
     * If true, this card component will include a button to expand the card.
     */
    showExpandableButton: PropTypes.bool,
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
      actAsExpander, // eslint-disable-line no-unused-vars
      children,
      expandable, // eslint-disable-line no-unused-vars
      style,
      ...other,
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);

    const styledChildren = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          style: Object.assign({}, styles.action, child.props.style),
        });
      }
    });

    return (
      <div {...other} style={prepareStyles(Object.assign(styles.root, style))}>
        {styledChildren}
      </div>
    );
  }
}

export default CardActions;
