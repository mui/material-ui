import React from 'react';
import {Mixins, Styles} from 'material-ui';

const {StyleResizable} = Mixins;
const {typography, spacing} = Styles;

const ComponentInfo = React.createClass({

  propTypes: {
    infoArray: React.PropTypes.array.isRequired,
    name: React.PropTypes.string.isRequired,
    style: React.PropTypes.object,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  mixins: [StyleResizable],

  getStyles() {
    const desktopGutter = spacing.desktopGutter;
    const borderColor = this.context.muiTheme.rawTheme.palette.borderColor;
    const styles = {
      root: {
        fontSize: 15,
        letterSpacing: '0',
        fontWeight: typography.fontWeightNormal,
        lineHeight: '24px',
        paddingTop: 3,
        marginBottom: 13,
        color: typography.textDarkBlack,
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
        fontWeight: typography.fontWeightMedium,
      },
      type: {
        color: typography.textLightBlack,
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
        fontWeight: typography.fontWeightMedium,
        color: typography.textDarkBlack,
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

    styles.header = Object.assign(styles.root, styles.header);

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM)) {
      styles.name = Object.assign({}, styles.name, styles.nameWhenMedium);
      styles.desc = Object.assign({}, styles.desc, styles.descWhenMedium);
    }

    if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
      styles.td = Object.assign({}, styles.td, styles.tdWhenLarge);
      styles.name = Object.assign({}, styles.name, styles.nameWhenLarge);
      styles.desc = Object.assign({}, styles.desc, styles.descWhenLarge);
    }

    styles.name = Object.assign({}, styles.td, styles.name);
    styles.desc = Object.assign({}, styles.td, styles.desc);
    styles.header = Object.assign({}, styles.p, styles.header);

    Object.keys(styles).forEach(function(currentKey) {
      styles[currentKey].boxSizing = 'border-box';
    });

    return styles;
  },

  render() {
    const {
      prepareStyles,
    } = this.context.muiTheme;

    const propElements = [];
    let typesSpan;

    const styles = this.getStyles();
    this.props.infoArray.forEach(function(info, i) {
      if (info.type) typesSpan = <span style={prepareStyles(Object.assign({}, styles.type))}>{info.type}</span>;

      if (i === this.props.infoArray.length - 1) {
        styles.desc = Object.assign({}, styles.desc, styles.descWhenLastChild);
      }

      propElements.push(
        <tr key={i}>
          <td style={prepareStyles(Object.assign({}, styles.name))}>{info.name}</td>
          <td style={prepareStyles(Object.assign({}, styles.desc))}>
            <p style={prepareStyles(Object.assign({}, styles.header))}>{typesSpan}{info.header}</p>
            <p style={prepareStyles(Object.assign({}, styles.p))}>{info.desc}</p>
          </td>
        </tr>
      );
    }, this);

    return (
      <div style={prepareStyles(Object.assign({}, styles.root, this.props.style))}>
        <h3 style={prepareStyles(styles.h3)}>{this.props.name}</h3>
        <table style={prepareStyles(styles.table)}>
          <tbody>
            {propElements}
          </tbody>
        </table>
      </div>
    );
  },
});

export default ComponentInfo;
