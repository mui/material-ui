let React = require('react');
let { Mixins, Styles } = require('mui');

let { StyleResizable, StylePropable } = Mixins;
let { Typography, Spacing, Colors } = Styles;


let ComponentInfo = React.createClass({

  mixins: [StyleResizable, StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    name: React.PropTypes.string.isRequired,
    infoArray: React.PropTypes.array.isRequired
  },

  getStyles: function() {
    let desktopGutter = Spacing.desktopGutter;
    let borderColor = this.context.muiTheme.palette.borderColor;
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
        width: '100%'
      },
      table: {
        borderCollapse: 'collapse',
        borderSpacing: '0'
      },
      td: {
        padding: '16px 0',
        verticalAlign: 'top'
      },
      name: {
        position: 'absolute',
        fontWeight: Typography.fontWeightMedium
      },
      type: {
        color: Typography.textLightBlack,
        paddingRight: desktopGutter + 'px'
      },
      header: {
        paddingTop: '0'
      },
      desc: {
        width: '100%',
        paddingTop: '48px',
        borderBottom: 'solid 1px ' + borderColor
      },
      p: {
        margin: '0'
      },
      h3: {
        //mui-font-style-title
        fontSize: '20px',
        lineHeight: '28px',
        paddingTop: '19px',
        marginBottom: '13px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack
      },
      nameWhenMedium: {
        position: 'inherit',
        paddingRight: desktopGutter + 'px'
      },
      descWhenMedium :{
        paddingTop: '16px'
      },
      tdWhenLarge: {
        padding: '32px 0'
      },
      nameWhenLarge: {
        minWidth: '128px'
      },
      descWhenLarge :{
        paddingTop: '32px'
      },
      descWhenLastChild: {
        borderBottom: 'none'
      }
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

  render: function() {
    let propElements = [],
      typesSpan;

    let styles = this.getStyles();
    this.props.infoArray.forEach(function(info, i) {

      if (info.type) typesSpan = <span style={styles.type}>{info.type}</span>;

      if (i == this.props.infoArray.length - 1) {
        styles.desc = this.mergeStyles(styles.desc, styles.descWhenLastChild);
      }

      propElements.push(
        <tr key={i}>
          <td style={styles.name}>{info.name}</td>
          <td style={styles.desc}>
            <p style={styles.header}>{typesSpan}{info.header}</p>
            <p style={styles.p}>{info.desc}</p>
          </td>
        </tr>
      );
    }, this);

    return (
      <div style={this.mergeAndPrefix(styles.root, this.props.style)}>
        <h3 style={styles.h3}>{this.props.name}</h3>
        <table style={styles.table}>
          <tbody>
            {propElements}
          </tbody>
        </table>
      </div>
    );
  }
});

module.exports = ComponentInfo;
