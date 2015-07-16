let React = require('react');
let Styles = require('../styles');
let StylePropable = require('../mixins/style-propable');


let CardMedia = React.createClass({

  mixins:[StylePropable],

  propTypes: {
    overlay: React.PropTypes.node,
    style: React.PropTypes.object,
    overlayStyle: React.PropTypes.object,
    overlayContainerStyle: React.PropTypes.object,
    overlayContentStyle: React.PropTypes.object,
    mediaStyle: React.PropTypes.object,
    expandable: React.PropTypes.bool,
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
    };
  },

  render() {
    let styles = this.getStyles();
    let rootStyle = this.mergeAndPrefix(styles.root, this.props.style);
    let mediaStyle = this.mergeAndPrefix(styles.media, this.props.mediaStyle);
    let overlayContainerStyle = this.mergeAndPrefix(styles.overlayContainer, this.props.overlayContainerStyle);
    let overlayContentStyle = this.mergeAndPrefix(styles.overlayContent, this.props.overlayContentStyle);
    let overlayStyle = this.mergeAndPrefix(styles.overlay, this.props.overlayStyle);

    let children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        style: {
          verticalAlign: 'top',
          maxWidth: '100%',
          minWidth: '100%',
        },
      });
    });

    let overlayChildren = React.Children.map(this.props.overlay, (child) => {
      if (child.type.displayName === 'CardHeader' || child.type.displayName === 'CardTitle') {
        return React.cloneElement(child, {
          titleColor: Styles.Colors.darkWhite,
          subtitleColor: Styles.Colors.lightWhite,
        });
      }
      else if (child.type.displayName === 'CardText') {
        return React.cloneElement(child, {
          color: Styles.Colors.darkWhite,
        });
      }
      else {
        return child;
      }
    });

    return (
      <div {...this.props} style={rootStyle}>
        <div style={mediaStyle}>
          {children}
        </div>
        {(this.props.overlay) ?
          <div style={overlayContainerStyle}>
            <div style={overlayStyle}>
              <div style={overlayContentStyle}>
                {overlayChildren}
              </div>
            </div>
          </div> : ''}
      </div>
    );
  },
});

module.exports = CardMedia;
