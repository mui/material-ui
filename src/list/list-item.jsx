var React = require('react');
var StylePropable = require('../mixins/style-propable');
var NavigationChevronRight = require('../svg-icons/navigation-chevron-right');
var IconButton = require('../icon-button');

var ListItem = React.createClass({
  mixins: [StylePropable],

  propTypes: {
    showIconButton: React.PropTypes.bool,
    iconClassname: React.PropTypes.string,
    iconElement: React.PropTypes.element,
    iconOnTouchTap: React.PropTypes.func,
  },

  getStyles: function() {
    return {
      root: {
        paddingLeft: 10,
        position: 'relative',
        borderBottom: '1px solid lightgrey'
      },

      innerStyle: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        padding: '10px 10px 10px 0px'
      },
      iconButton: {
        style: {
        },
        iconStyle: {
          fontSize: 16,
          height: '100%',
          top: 0,
          right: 15,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center'
        },
      },
    };
  },

  _onIconButtonTouchTap: function(e) {
    if (this.props.onIconTouchTap)
      this.props.onIconTouchTap(e);
  },

  render: function() {
    var styles = this.getStyles();

    var element;
    if (this.props.showIconButton) {
      if (this.props.iconElement) {
        element = (
          <div style={styles.iconButton.iconStyle}>
            {this.props.iconElement}
          </div>
        );
      } else {
        var child = (this.props.iconClassName) ? '' : <NavigationChevronRight style={this.mergeAndPrefix(styles.iconStyle)}/>;
        element = (
            <IconButton
              style={this.mergeAndPrefix(styles.iconButton.iconStyle)}
              iconStyle={this.mergeAndPrefix(styles.iconButton.style)}
              iconClassName={this.props.iconClassName}
              onTouchTap={this._onIconButtonTouchTap}>
                {child}
          </IconButton>
        );
      }
    }

    return (
      <div style={styles.root}>
        <div style={styles.innerStyle}>
          {this.props.children}
        </div>
        {element}
      </div>
    );
  },
});

module.exports = ListItem;
