import React from 'react';

function getStyles(props, context) {
  const {cardText} = context.muiTheme;

  return {
    root: {
      padding: 16,
      fontSize: 14,
      color: props.color || cardText.textColor,
    },
  };
}

class CardText extends React.Component {
  static muiName = 'CardText';

  static propTypes = {
    /**
     * If true, a click on this card component expands the card.
     */
    actAsExpander: React.PropTypes.bool,

    /**
     * Can be used to render elements inside the Card Text.
     */
    children: React.PropTypes.node,

    /**
     * Override the CardText color.
     */
    color: React.PropTypes.string,

    /**
     * If true, this card component is expandable.
     */
    expandable: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  };

  static contextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
  };

  render() {
    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context);
    const rootStyle = Object.assign(styles.root, this.props.style);

    return (
      <div {...this.props} style={prepareStyles(rootStyle)}>
        {this.props.children}
      </div>
    );
  }
}

export default CardText;
