import React from 'react';
import {Link} from 'react-router';
import {Paper, Mixins, Styles} from 'material-ui';
import {grey200} from 'material-ui/lib/styles/colors';

const {StyleResizable} = Mixins;
const {Spacing, Transitions, Typography} = Styles;

const HomeFeature = React.createClass({

  propTypes: {
    firstChild: React.PropTypes.bool,
    heading: React.PropTypes.string,
    img: React.PropTypes.string,
    lastChild: React.PropTypes.bool,
    route: React.PropTypes.string,
  },

  mixins: [StyleResizable],

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
    const desktopGutter = Spacing.desktopGutter;
    const desktopKeylineIncrement = Spacing.desktopKeylineIncrement;
    const styles = {
      root: {
        transition: Transitions.easeOut(),
        maxWidth: '300px',
        margin: `0 auto ${desktopGutter}px auto`,
      },
      rootWhenMedium: {
        float: 'left',
        width: '33%',
        marginRight: 4,
        marginBottom: 0,
      },
      image: {
        //Not sure why this is needed but it fixes a display
        //issue in chrome
        marginBottom: -6,
      },
      heading: {
        fontSize: 20,
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: 0,
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack,
        backgroundColor: grey200,
        textAlign: 'center',
        margin: 0,
        padding: 0,
        lineHeight: `${desktopKeylineIncrement}px`,
      },
      rootWhenLastChild: {
        marginBottom: 0,
      },
      rootWhenMediumAndLastChild: {
        marginRight: 0,
        marginBottom: 0,
      },
      rootWhenMediumAndFirstChild: {
        marginLeft: 0,
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
        this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.root = Object.assign(
        styles.root,
        styles.rootWhenMedium,
        this.props.firstChild && styles.rootWhenMediumAndFirstChild,
        this.props.lastChild && styles.rootWhenMediumAndLastChild
      );
    }

    return styles;
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

  render() {
    const styles = this.getStyles();

    return (
      <Paper
        zDepth={this.state.zDepth}
        onMouseEnter={this._onMouseEnter}
        onMouseLeave={this._onMouseLeave}
        style={Object.assign(
          styles.root,
          this.props.lastChild && styles.rootWhenLastChild)}
      >
        <h3 style={styles.heading}>{this.props.heading}</h3>
        <Link to={this.props.route}>
          <img style={styles.image} src={this.props.img} />
        </Link>
      </Paper>
    );
  },

});

export default HomeFeature;
