const React = require('react');
const { Mixins, Styles } = require('material-ui');

const { StyleResizable, StylePropable } = Mixins;
const { Typography, Spacing, Colors } = Styles;
const ThemeManager = Styles.ThemeManager;
const DefaultRawTheme = Styles.LightRawTheme;

const ComponentInfo = React.createClass({

  mixins: [StyleResizable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  propTypes: {
    name: React.PropTypes.string.isRequired,
    infoArray: React.PropTypes.array.isRequired,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  getInitialState () {
    return {
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  //to update theme inside state whenever a new theme is passed down
  //from the parent / owner using context
  componentWillReceiveProps (nextProps, nextContext) {
    let newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
    this.setState({muiTheme: newMuiTheme});
  },

  getStyles() {
    let desktopGutter = Spacing.desktopGutter;
    let borderColor = this.state.muiTheme.rawTheme.palette.borderColor;
    let styles = {
      root: {
        //.mui-font-style-subhead-1
        fontSize: '15px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        lineHeight: '24px',
        paddingTop: '3px',
        marginBottom: '13px',
        color: Typography.textDarkBlack,
        width: '100%',
      },
      table: {
        borderCollapse: 'collapse',
        borderSpacing: '0',
      },
      td: {
        padding: '16px 0',
        verticalAlign: 'top',
      },
      name: {
        position: 'absolute',
        fontWeight: Typography.fontWeightMedium,
      },
      type: {
        color: Typography.textLightBlack,
        paddingRight: desktopGutter + 'px',
      },
      header: {
        paddingTop: '0',
      },
      desc: {
        width: '100%',
        paddingTop: '48px',
        borderBottom: 'solid 1px ' + borderColor,
      },
      p: {
        margin: '0',
      },
      h3: {
        //mui-font-style-title
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack,
      },
      nameWhenMedium: {
        position: 'inherit',
        paddingRight: desktopGutter + 'px',
      },
      descWhenMedium :{
        paddingTop: '16px',
      },
      tdWhenLarge: {
        padding: '32px 0',
      },
      nameWhenLarge: {
        minWidth: '128px',
      },
      descWhenLarge :{
        paddingTop: '32px',
      },
      descWhenLastChild: {
        borderBottom: 'none',
      },
    };

    styles.header = this.mergeStyles(styles.root, styles.header);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM)) {
      styles.name = this.mergeStyles(styles.name, styles.nameWhenMedium);
      styles.desc = this.mergeStyles(styles.desc, styles.descWhenMedium);
    }

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.td = this.mergeStyles(styles.td, styles.tdWhenLarge);
      styles.name = this.mergeStyles(styles.name, styles.nameWhenLarge);
      styles.desc = this.mergeStyles(styles.desc, styles.descWhenLarge);
    }

    styles.name = this.mergeStyles(styles.td, styles.name);
    styles.desc = this.mergeStyles(styles.td, styles.desc);
    styles.header = this.mergeStyles(styles.p, styles.header);

    Object.keys(styles).forEach(function (currentKey) {
      styles[currentKey].boxSizing = 'border-box';
    });

    return styles;
  },

  render() {
    let propElements = [],
      typesSpan;

    let styles = this.getStyles();
    this.props.infoArray.forEach(function(info, i) {

      if (info.type) typesSpan = <span style={this.prepareStyles(styles.type)}>{info.type}</span>;

      if (i === this.props.infoArray.length - 1) {
        styles.desc = this.mergeStyles(styles.desc, styles.descWhenLastChild);
      }

      propElements.push(
        <tr key={i}>
          <td style={this.prepareStyles(styles.name)}>{info.name}</td>
          <td style={this.prepareStyles(styles.desc)}>
            <p style={this.prepareStyles(styles.header)}>{typesSpan}{info.header}</p>
            <p style={this.prepareStyles(styles.p)}>{info.desc}</p>
          </td>
        </tr>
      );
    }, this);

    return (
      <div style={this.prepareStyles(styles.root, this.props.style)}>
        <h3 style={this.prepareStyles(styles.h3)}>{this.props.name}</h3>
        <table style={this.prepareStyles(styles.table)}>
          <tbody>
            {propElements}
          </tbody>
        </table>
      </div>
    );
  },
});

module.exports = ComponentInfo;
