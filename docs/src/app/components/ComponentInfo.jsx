import React from 'react';
import {Mixins, Styles} from 'material-ui';

const {StyleResizable, StylePropable} = Mixins;
const {Typography, Spacing} = Styles;

const ComponentInfo = React.createClass({

  propTypes: {
    infoArray: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StyleResizable, StylePropable],

  getStyles() {
    let desktopGutter = Spacing.desktopGutter;
    let borderColor = this.context.muiTheme.rawTheme.palette.borderColor;
    let styles = {
      root: {
        fontSize: 15,
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        lineHeight: '24px',
        paddingTop: 3,
        marginBottom: 13,
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
        paddingRight: desktopGutter,
      },
      header: {
        paddingTop: '0',
      },
      desc: {
        width: '100%',
        paddingTop: 48,
        borderBottom: `1px solid ${borderColor}`,
      },
      p: {
        margin: '0',
      },
      h3: {
        fontSize: 20,
        lineHeight: '28px',
        paddingTop: 19,
        marginBottom: 13,
        letterSpacing: '0',
        fontWeight: Typography.fontWeightMedium,
        color: Typography.textDarkBlack,
      },
      nameWhenMedium: {
        position: 'inherit',
        paddingRight: desktopGutter,
      },
      descWhenMedium: {
        paddingTop: 16,
      },
      tdWhenLarge: {
        padding: '32px 0',
      },
      nameWhenLarge: {
        minWidth: 128,
      },
      descWhenLarge: {
        paddingTop: 32,
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

    Object.keys(styles).forEach(function(currentKey) {
      styles[currentKey].boxSizing = 'border-box';
    });

    return styles;
  },

  render() {
    let propElements = [];
    let typesSpan;

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

export default ComponentInfo;
