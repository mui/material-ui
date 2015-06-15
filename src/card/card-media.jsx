var React = require('react');
var Styles = require('../styles');

var CardMedia = React.createClass({
  propTypes: {
    overlay: React.PropTypes.node
  },
  getStyles: function () {
    return {
      root: {
        position: 'relative'
      },
      overlayContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
      },
      overlay: {
        height: '100%',
        position: 'relative'
      },
      overlayContent: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        paddingTop: 8,
        background: Styles.Colors.lightBlack
      }
    };
  },
  render: function () {
    var styles = this.getStyles();

    var children = React.Children.map(this.props.children, function (child) {
      return React.cloneElement(child, {
        style: {
          verticalAlign: 'top',
          maxWidth: '100%',
          minWidth: '100%'
        }
      });
    });

    var overlayChildren = React.Children.map(this.props.overlay, function (child) {
      if (child.type.displayName === 'CardHeader' || child.type.displayName === 'CardTitle'
      ) {
        return React.cloneElement(child, {
          titleColor: Styles.Colors.darkWhite,
          subtitleColor: Styles.Colors.lightWhite
        });
      } else if (child.type.displayName === 'CardText') {
        return React.cloneElement(child, {
          color: Styles.Colors.darkWhite
        });
      } else {
        return child;
      }
    });

    return (
      <div style={styles.root}>
        <div style={styles.media}>
          {children}
        </div>
        {(this.props.overlay) ?
          <div style={styles.overlayContainer}>
            <div style={styles.overlay}>
              <div style={styles.overlayContent}>
                {overlayChildren}
              </div>
            </div>
          </div> : ''}
      </div>
    );
  }
});

module.exports = CardMedia;
