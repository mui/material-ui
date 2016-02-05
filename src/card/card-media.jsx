import React from 'react';
import Styles from '../styles';
import StylePropable from '../mixins/style-propable';
import getMuiTheme from '../styles/getMuiTheme';

const CardMedia = React.createClass({

  propTypes: {
    actAsExpander: React.PropTypes.bool,
    children: React.PropTypes.node,
    expandable: React.PropTypes.bool,
    mediaStyle: React.PropTypes.object,
    overlay: React.PropTypes.node,
    overlayContainerStyle: React.PropTypes.object,
    overlayContentStyle: React.PropTypes.object,
    overlayStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the root element.
     */
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [
    StylePropable,
  ],

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

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps(nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles() {
    return {
      root: {
        position: 'relative',
      },
      overlayContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
      },
      overlay: {
        height: '100%',
        position: 'relative',
      },
      overlayContent: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingTop: 8,
        background: Styles.Colors.lightBlack,
      },
      media: {},
      mediaChild: {
        verticalAlign: 'top',
        maxWidth: '100%',
        minWidth: '100%',
        width: '100%',
      },
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.mergeStyles(styles.root, this.props.style);
    let mediaStyle = this.mergeStyles(styles.media, this.props.mediaStyle);
    let overlayContainerStyle = this.mergeStyles(styles.overlayContainer, this.props.overlayContainerStyle);
    let overlayContentStyle = this.mergeStyles(styles.overlayContent, this.props.overlayContentStyle);
    let overlayStyle = this.mergeStyles(styles.overlay, this.props.overlayStyle);

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {style: this.prepareStyles(styles.mediaChild, child.props.style)});
    });

    let overlayChildren = React.Children.map(this.props.overlay, (child) => {
      if (child.type.displayName === 'CardHeader' || child.type.displayName === 'CardTitle') {
        return React.cloneElement(child, {
          titleColor: Styles.Colors.darkWhite,
          subtitleColor: Styles.Colors.lightWhite,
        });
      } else if (child.type.displayName === 'CardText') {
        return React.cloneElement(child, {
          color: Styles.Colors.darkWhite,
        });
      } else {
        return child;
      }
    });

    return (
      <div {...this.props} style={this.prepareStyles(rootStyle)}>
        <div style={this.prepareStyles(mediaStyle)}>
          {children}
        </div>
        {(this.props.overlay) ?
          <div style={this.prepareStyles(overlayContainerStyle)}>
            <div style={this.prepareStyles(overlayStyle)}>
              <div style={this.prepareStyles(overlayContentStyle)}>
                {overlayChildren}
              </div>
            </div>
          </div> : ''}
      </div>
    );
  },
});

export default CardMedia;
