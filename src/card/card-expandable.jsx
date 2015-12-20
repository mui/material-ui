import React from 'react';
import Extend from '../utils/extend';
import OpenIcon from '../svg-icons/hardware/keyboard-arrow-up';
import CloseIcon from '../svg-icons/hardware/keyboard-arrow-down';
import IconButton from '../icon-button';
import StylePropable from '../mixins/style-propable';
import muiThemeable from '../muiThemeable';
import ContextPure from '../mixins/context-pure';

let CardExpandable = React.createClass({
  mixins: [
    StylePropable,
    ContextPure,
  ],

  getStyles() {
    const contextKeys = this.constructor.getRelevantContextKeys(this.props._muiTheme);

    const directionStyle = contextKeys.isRtl ? {
      left: 4,
    } : {
      right: 4,
    };

    return {
      root: Extend({
        top: 0,
        bottom: 0,
        margin: 'auto',
        position: 'absolute',
      }, directionStyle),
    };
  },

  propTypes: {
    /**
     * The MUI Theme to use to render this component with.
     */
    _muiTheme: React.PropTypes.object.isRequired,

    expanded: React.PropTypes.bool,
    onExpanding: React.PropTypes.func.isRequired,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  statics: {
    getRelevantContextKeys(muiTheme) {
      return {
        isRtl: muiTheme.isRtl,
      };
    },
    getChildrenClasses() {
      return [
        IconButton,
      ];
    },
  },

  render() {
    let styles = this.getStyles();

    let expandable;
    if (this.props.expanded === true)
      expandable = <OpenIcon/>;
    else
      expandable = <CloseIcon/>;

    let mergedStyles = this.mergeStyles(styles.root, this.props.style);

    let expandableBtn = (
      <IconButton
        style={mergedStyles}
        onTouchTap={this.props.onExpanding}>
        {expandable}
      </IconButton>
    );


    return expandableBtn;
  },
});

CardExpandable = muiThemeable(CardExpandable);

export default CardExpandable;
