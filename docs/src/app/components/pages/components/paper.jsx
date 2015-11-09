const React = require('react');
const { ClearFix, Mixins, Paper } = require('material-ui');
const ComponentDoc = require('../../component-doc');

const { StyleResizable } = Mixins;
const Code = require('paper-code');
const CodeExample = require('../../code-example/code-example');
const CodeBlock = require('../../code-example/code-block');

const PaperPage = React.createClass ({

  mixins: [StyleResizable],

  getStyles() {
    let styles = {
      root: {
        height: '100px',
        width: '100px',
        margin: '0 auto',
        marginBottom: '64px',
        textAlign: 'center',
      },
      group: {
        float: 'left',
        width: '100%',
      },
      p: {
        lineHeight: '80px',
        height: '100%',
      },
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM)) {
      styles.group.width = '33%';
    }

    return styles;
  },

  render() {

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'circle',
            type: 'bool',
            header: 'default: false',
            desc: 'Set to true to generate a circlular paper container.',
          },
          {
            name: 'rounded',
            type: 'bool',
            header: 'default: true',
            desc: 'By default, the paper container will have a border radius. ' +
              'Set this to false to generate a container with sharp corners.',
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of Paper\'s root element.',
          },
          {
            name: 'zDepth',
            type: 'number (0-5)',
            header: 'default: 1',
            desc: 'This number represents the zDepth of the paper shadow.',
          },
          {
            name: 'transitionEnabled',
            type: 'bool',
            header: 'default: true',
            desc: 'Set to false to disable CSS transitions for the paper element.',
          },
        ],
      },
    ];

    let groupStyle = this.getStyles().group;

    return (
      <ComponentDoc
        name="Paper"
        componentInfo={componentInfo}>

        <Paper style = {{marginBottom: '22px'}}>
          <CodeBlock>
          {
            '//Import statement:\nconst Paper = require(\'material-ui/lib/paper\');\n\n' +
            '//See material-ui/lib/index.js for more\n'
          }
          </CodeBlock>
        </Paper>

        <CodeExample code={Code}>
          <div>
            <ClearFix style={groupStyle}>
              {this._getGroupDefault()}
            </ClearFix>
            <ClearFix style={groupStyle}>
              {this._getGroupRounded()}
            </ClearFix>
            <ClearFix style={groupStyle}>
              {this._getGroupCircle()}
            </ClearFix>
          </div>
        </CodeExample>
      </ComponentDoc>
    );
  },

  _createParagraphElement(text) {
    return <p style={this.getStyles().p}>{text}</p>;
  },

  _createPaperElement(zDepth, text) {
    let styles = this.getStyles();
    return (
      <Paper
        style={styles.root}
        zDepth={zDepth}>
        {this._createParagraphElement(text)}
      </Paper>
    );
  },

  _getGroupDefault() {
    let elements = [];
    for (let i = 1; i <= 5; i++) {
      elements.push(this._createPaperElement(i, "zDepth="+i));
    }
    return elements;
  },

  _getGroupRounded() {
    let elements = [];
    for (let i = 1; i <= 5; i++) {
      elements.push(React.cloneElement(this._createPaperElement(i, "rounded=false"), {rounded: false}));
    }
    return elements;
  },

  _getGroupCircle() {
    let elements = [];
    for (let i = 1; i <= 5; i++) {
      elements.push(React.cloneElement(this._createPaperElement(i, "circle=true"), {circle: true}));
    }
    return elements;
  },

});

module.exports = PaperPage;
