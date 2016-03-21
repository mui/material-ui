import React from 'react';
import {ClearFix} from 'material-ui';
import ComponentInfo from './ComponentInfo';
import typography from 'styles/typography';

const ComponentDoc = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    componentInfo: React.PropTypes.array.isRequired,
    desc: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element,
    ]),
    name: React.PropTypes.string.isRequired,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getStyles() {
    const borderColor = this.context.muiTheme.rawTheme.palette.borderColor;
    return {
      desc: {
        borderBottom: `solid 1px ${borderColor}`,
        paddingTop: 8,
        paddingBottom: 40,
        marginBottom: 24,
        fontSize: 15,
        letterSpacing: '0',
        lineHeight: '24px',
        color: typography.textDarkBlack,
      },
      ol: {
        fontSize: 13,
        paddingLeft: 48,
      },
      componentInfo: {
        borderTop: `solid 1px ${borderColor}`,
        paddingTop: 24,
        marginTop: 24,
      },
      componentInfoWhenFirstChild: {
        borderTop: 'none',
        marginTop: '0',
        paddingTop: '0',
      },
      headline: {
        //headline
        fontSize: 24,
        lineHeight: '32px',
        paddingTop: 16,
        marginBottom: 12,
        letterSpacing: '0',
        fontWeight: typography.fontWeightNormal,
        color: typography.textDarkBlack,
      },
    };
  },

  render() {
    const {
      prepareStyles,
    } = this.context.muiTheme;

    const styles = this.getStyles();

    const componentInfo = this.props.componentInfo.map(function(info, i) {
      let infoStyle = styles.componentInfo;
      if (i === 0) infoStyle = Object.assign({}, infoStyle, styles.componentInfoWhenFirstChild);
      return (
        <ComponentInfo
          key={i}
          name={info.name}
          style={infoStyle}
          infoArray={info.infoArray}
        />
      );
    }, this);

    let desc = null;

    if (this.props.desc) {
      if ((typeof this.props.desc) === 'string') {
        desc = <p style={prepareStyles(Object.assign({}, styles.desc))}>{this.props.desc}</p>;
      } else {
        desc = <div style={prepareStyles(Object.assign({}, styles.desc))}>{this.props.desc}</div>;
      }
    }

    let header;
    if (this.props.name.length > 0) {
      header = <h2 style={prepareStyles(Object.assign({}, styles.headline))}>{this.props.name}</h2>;
    }

    return (
      <ClearFix>
        {header}
        {this.props.children}

        {desc}

        <div>
          {componentInfo}
        </div>

      </ClearFix>
    );
  },

});

export default ComponentDoc;
