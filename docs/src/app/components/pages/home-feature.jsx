let React = require('react');
let {Link} = require('react-router');
let { Paper, Mixins, Styles } = require('material-ui');

let { StylePropable, StyleResizable } = Mixins;
let { Colors, Spacing, Transitions, Typography } = Styles;


let HomeFeature = React.createClass({

  mixins: [StylePropable, StyleResizable],

  propTypes: {
    heading: React.PropTypes.string,
    route: React.PropTypes.string,
    img: React.PropTypes.string,
    firstChild: React.PropTypes.bool,
    lastChild: React.PropTypes.bool,
  },

  getDefaultProps() {
    return {
      firstChild: false,
      lastChild: false,
    };
  },

  getInitialState() {
    return {
      zDepth: 0,
    };
  },

  getStyles() {
    let desktopGutter = Spacing.desktopGutter;
    let desktopKeylineIncrement = Spacing.desktopKeylineIncrement;
    let styles = {
      root: {
        transition: Transitions.easeOut(),
        maxWidth: '300px',
        margin: '0 auto ' + desktopGutter + ' auto',
      },
      rootWhenMedium: {
        float: 'left',
        width: '33%',
        marginRight: '4px',
        marginBottom: '0px',
      },
      image: {
        //Not sure why this is needed but it fixes a display
        //issue in chrome
        marginBottom: -6,
      },
      heading: {
        fontSize: '20px',
        paddingTop: 19,
        marginBottom: '13',
        letterSpacing: 0,
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack,
        backgroundColor: Colors.grey200,
        textAlign: 'center',
        margin: '0px',
        padding: '0px',
        lineHeight: desktopKeylineIncrement + 'px',
      },
      rootWhenLastChild: {
        marginBottom: '0px',
      },
      rootWhenMediumAndLastChild: {
        marginRight: '0px',
        marginBottom: '0px',
      },
      rootWhenMediumAndFirstChild: {
        marginLeft: '0px',
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.root = this.mergeAndPrefix(
        styles.root,
        styles.rootWhenMedium,
        this.props.firstChild && styles.rootWhenMediumAndFirstChild,
        this.props.lastChild && styles.rootWhenMediumAndLastChild
      );
    }

    return styles;
  },

  render() {
    let styles = this.getStyles();

    return (
      <Paper
        zDepth={this.state.zDepth}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        style={this.mergeAndPrefix(
          styles.root,
          this.props.lastChild && styles.rootWhenLastChild)}>
        <h3 style={styles.heading}>{this.props.heading}</h3>
        <Link to={this.props.route}>
          <img style={styles.image} src={this.props.img} />
        </Link>
      </Paper>
    );
  },

  _onMouseEnter() {
    this.setState({
      zDepth: 4,
    });
  },

  _onMouseLeave() {
    this.setState({
      zDepth: 0,
    });
  },

});

module.exports = HomeFeature;
