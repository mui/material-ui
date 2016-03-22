import React from 'react';
import getMuiTheme from '../styles/getMuiTheme';

function getStyles(props, state) {
  const {
    cardMedia,
 } = state.muiTheme;
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
      background: cardMedia.overlayContentBackground,
    },
    media: {},
    mediaChild: {
      verticalAlign: 'top',
      maxWidth: '100%',
      minWidth: '100%',
      width: '100%',
    },
  };
}

const CardMedia = React.createClass({

  propTypes: {
    /**
     * If true, a click on this card component expands the card.
     */
    actAsExpander: React.PropTypes.bool,

    /**
     * Can be used to render elements inside the Card Media.
     */
    children: React.PropTypes.node,

    /**
     * If true, this card component is expandable.
     */
    expandable: React.PropTypes.bool,

    /**
     * Override the inline-styles of the Card Media.
     */
    mediaStyle: React.PropTypes.object,

    /**
     * Can be used to render overlay element in Card Media.
     */
    overlay: React.PropTypes.node,

    /**
     * Override the inline-styles of the overlay container.
     */
    overlayContainerStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the overlay content.
     */
    overlayContentStyle: React.PropTypes.object,

    /**
     * Override the inline-styles of the overlay element.
     */
    overlayStyle: React.PropTypes.object,

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
      prepareStyles,
    } = this.state.muiTheme;

    const styles = getStyles(this.props, this.state);
    const rootStyle = Object.assign(styles.root, this.props.style);
    const mediaStyle = Object.assign(styles.media, this.props.mediaStyle);
    const overlayContainerStyle = Object.assign(styles.overlayContainer, this.props.overlayContainerStyle);
    const overlayContentStyle = Object.assign(styles.overlayContent, this.props.overlayContentStyle);
    const overlayStyle = Object.assign(styles.overlay, this.props.overlayStyle);
    const titleColor = this.state.muiTheme.cardMedia.titleColor;
    const subtitleColor = this.state.muiTheme.cardMedia.subtitleColor;
    const color = this.state.muiTheme.cardMedia.color;

    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        style: prepareStyles(Object.assign({}, styles.mediaChild, child.props.style)),
      });
    });

    const overlayChildren = React.Children.map(this.props.overlay, (child) => {
      if (child.type.displayName === 'CardHeader' || child.type.displayName === 'CardTitle') {
        return React.cloneElement(child, {
          titleColor: titleColor,
          subtitleColor: subtitleColor,
        });
      } else if (child.type.displayName === 'CardText') {
        return React.cloneElement(child, {
          color: color,
        });
      } else {
        return child;
      }
    });

    return (
      <div {...this.props} style={prepareStyles(rootStyle)}>
        <div style={prepareStyles(mediaStyle)}>
          {children}
        </div>
        {(this.props.overlay) ?
          <div style={prepareStyles(overlayContainerStyle)}>
            <div style={prepareStyles(overlayStyle)}>
              <div style={prepareStyles(overlayContentStyle)}>
                {overlayChildren}
              </div>
            </div>
          </div> : ''}
      </div>
    );
  },
});

export default CardMedia;
