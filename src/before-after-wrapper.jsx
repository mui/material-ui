import React from 'react';
import getMuiTheme from './styles/getMuiTheme';

/**
 *  BeforeAfterWrapper
 *    An alternative for the ::before and ::after css pseudo-elements for
 *    components whose styles are defined in javascript instead of css.
 *
 *  Usage: For the element that we want to apply before and after elements to,
 *    wrap its children with BeforeAfterWrapper. For example:
 *
 *                                            <Paper>
 *  <Paper>                                     <div> // See notice
 *    <BeforeAfterWrapper>        renders         <div/> // before element
 *      [children of paper]       ------>         [children of paper]
 *    </BeforeAfterWrapper>                       <div/> // after element
 *  </Paper>                                    </div>
 *                                            </Paper>
 *
 *  Notice: Notice that this div bundles together our elements. If the element
 *    that we want to apply before and after elements is a HTML tag (i.e. a
 *    div, p, or button tag), we can avoid this extra nesting by passing using
 *    the BeforeAfterWrapper in place of said tag like so:
 *
 *  <p>
 *    <BeforeAfterWrapper>   do this instead   <BeforeAfterWrapper elementType='p'>
 *      [children of p]          ------>         [children of p]
 *    </BeforeAfterWrapper>                    </BeforeAfterWrapper>
 *  </p>
 *
 *  BeforeAfterWrapper features spread functionality. This means that we can
 *  pass HTML tag properties directly into the BeforeAfterWrapper tag.
 *
 *  When using BeforeAfterWrapper, ensure that the parent of the beforeElement
 *  and afterElement have a defined style position.
 */

const styles = {
  box: {
    boxSizing: 'border-box',
  },
};

const BeforeAfterWrapper = React.createClass({

  propTypes: {
    afterElementType: React.PropTypes.string,
    afterStyle: React.PropTypes.object,
    beforeElementType: React.PropTypes.string,
    beforeStyle: React.PropTypes.object,
    children: React.PropTypes.node,
    elementType: React.PropTypes.string,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getDefaultProps() {
    return {
      beforeElementType: 'div',
      afterElementType: 'div',
      elementType: 'div',
    };
  },

  getInitialState() {
    return {
      muiTheme: this.context.muiTheme || getMuiTheme(),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({
      muiTheme: nextContext.muiTheme || this.state.muiTheme,
    });
  },

  render() {
    const {
      beforeStyle,
      afterStyle,
      beforeElementType,
      afterElementType,
      elementType,
      ...other,
    } = this.props;

    const {
      prepareStyles,
    } = this.state.muiTheme;

    let beforeElement;
    let afterElement;

    if (beforeStyle) {
      beforeElement = React.createElement(this.props.beforeElementType,
        {
          style: prepareStyles(Object.assign({}, styles.box, beforeStyle)),
          key: '::before',
        });
    }

    if (afterStyle) {
      afterElement = React.createElement(this.props.afterElementType,
        {
          style: prepareStyles(Object.assign({}, styles.box, afterStyle)),
          key: '::after',
        });
    }

    const children = [beforeElement, this.props.children, afterElement];

    const props = other;
    props.style = prepareStyles(Object.assign({}, this.props.style));

    return React.createElement(this.props.elementType, props, children);
  },

});

export default BeforeAfterWrapper;
