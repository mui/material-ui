let React = require('react');
let { ClearFix, Mixins, Styles } = require('mui');
let CodeExample = require('./code-example/code-example.jsx');
let ComponentInfo = require('./component-info.jsx');
let Typography = Styles.Typography;
let { Classable, StylePropable } = Mixins;

let ComponentDoc = React.createClass({

  mixins: [StylePropable],

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    code: React.PropTypes.string.isRequired,
    desc: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.element
    ]),
    name: React.PropTypes.string.isRequired,
    componentInfo: React.PropTypes.array.isRequired
  },

  getStyles: function() {
    let borderColor = this.context.muiTheme.palette.borderColor;
    return {
      desc: {
        borderBottom: 'solid 1px ' + borderColor,
        paddingTop: '8px',
        paddingBottom: '40px',
        marginBottom: '24px',
        //mui-font-style-subhead-1
        fontSize: '15px',
        letterSpacing: '0',
        lineHeight: '24px',
        color: Typography.textDarkBlack
      },
      ol: {
        fontSize: '13px',
        paddingLeft: '48px'
      },
      componentInfo: {
        borderTop: 'solid 1px ' + borderColor,
        paddingTop: '24px',
        marginTop: '24px'
      },
      componentInfoWhenFirstChild: {
        borderTop: 'none',
        marginTop: '0',
        paddingTop: '0'
      },
      headline: {
        //headline
        fontSize: '24px',
        lineHeight: '32px',
        paddingTop: '16px',
        marginBottom: '12px',
        letterSpacing: '0',
        fontWeight: Typography.fontWeightNormal,
        color: Typography.textDarkBlack
      }
    };
  },

  render: function() {
    let styles = this.getStyles();

    let componentInfo = this.props.componentInfo.map(function(info, i) {
      let infoStyle = styles.componentInfo;
      if (i === 0) infoStyle = this.mergeStyles(infoStyle, styles.componentInfoWhenFirstChild);
      return (
        <ComponentInfo
          key={i}
          name={info.name}
          style={infoStyle}
          infoArray={info.infoArray} />
      );
    }, this);

    let desc = null;

    if (this.props.desc) {
      if ((typeof this.props.desc) == "string") {
        desc = <p style={styles.desc}>{this.props.desc}</p>
      } else {
        desc = <div style={styles.desc}>{this.props.desc}</div>
      }
    }

    let header;
    if (this.props.name.length > 0) {
      header = <h2 style={styles.headline}>{this.props.name}</h2>
    }

    return (
      <ClearFix>

        {header}

        <CodeExample code={this.props.code}>
          {this.props.children}
        </CodeExample>

        {desc}

        <div>
          {componentInfo}
        </div>

      </ClearFix>
    );
  }

});

module.exports = ComponentDoc;
