import React from 'react';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';

let CardText = React.createClass({

  mixins: [
    StylePropable,
  ],

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    actAsExpander: React.PropTypes.bool,
    children: React.PropTypes.node,
    color: React.PropTypes.string,
    expandable: React.PropTypes.bool,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  getStyles() {
    const themeVariables = this.props._muiTheme.cardText;
    return {
      root: {
        padding: 16,
        fontSize: '14px',
        color: this.props.color ? this.props.color : themeVariables.textColor,
      },
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.prepareStyles(styles.root, this.props.style);

    return (
      <div {...this.props} style={rootStyle}>
        {this.props.children}
      </div>
    );
  },
});

CardText = muiThemeable(CardText);

export default CardText;
