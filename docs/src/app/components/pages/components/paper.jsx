let React = require('react');
let { ClearFix, Mixins, Paper } = require('mui');
let ComponentDoc = require('../../component-doc.jsx');

let { StyleResizable } = Mixins;


let PaperPage = React.createClass ({

  mixins: [StyleResizable],

  getStyles: function() {
    let styles = {
      root: {
        height: '100px',
        width: '100px',
        margin: '0 auto',
        marginBottom: '64px',
        textAlign: 'center'
      },
      group: {
        float: 'left',
        width: '100%'
      },
      p: {
        lineHeight: '80px',
        height: '100%'
      }
    };

    if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM)) {
      styles.group.width = '33%';
    }

    return styles;
  },

  render: function() {

    let code = [
      '//Rounded Corners',
      '<Paper zDepth={1}>',
      '  <p>zDepth=1</p>',
      '</Paper>',
      '<Paper zDepth={2}>',
      '  <p>zDepth=2</p>',
      '</Paper>',
      '<Paper zDepth={3}>',
      '  <p>zDepth=3</p>',
      '</Paper>',
      '<Paper zDepth={4}>',
      '  <p>zDepth=4</p>',
      '</Paper>',
      '<Paper zDepth={5}>',
      '  <p>zDepth=5</p>',
      '</Paper>',
      '//Sharp Corners',
      '<Paper zDepth={1} rounded={false}>',
      '  <p>rounded=false</p>',
      '</Paper>',
      '<Paper zDepth={2} rounded={false}>',
      '  <p>rounded=false</p>',
      '</Paper>',
      '<Paper zDepth={3} rounded={false}>',
      '  <p>rounded=false</p>',
      '</Paper>',
      '<Paper zDepth={4} rounded={false}>',
      '  <p>rounded=false</p>',
      '</Paper>',
      '<Paper zDepth={5} rounded={false}>',
      '  <p>rounded=false</p>',
      '</Paper>',
      '//Circular',
      '<Paper zDepth={1} circle={true}>',
      '  <p>circle=true</p>',
      '</Paper>',
      '<Paper zDepth={2} circle={true}>',
      '  <p>circle=true</p>',
      '</Paper>',
      '<Paper zDepth={3} circle={true}>',
      '  <p>circle=true</p>',
      '</Paper>',
      '<Paper zDepth={4} circle={true}>',
      '  <p>circle=true</p>',
      '</Paper>',
      '<Paper zDepth={5} circle={true}>',
      '  <p>circle=true</p>',
      '</Paper>'
      ].join('\n');

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'circle',
            type: 'bool',
            header: 'default: false',
            desc: 'Set to true to generate a circlular paper container.'
          },
          {
            name: 'rounded',
            type: 'bool',
            header: 'default: true',
            desc: 'By default, the paper container will have a border radius. ' +
              'Set this to false to generate a container with sharp corners.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of Paper\'s root element.'
          },
          {
            name: 'zDepth',
            type: 'number (0-5)',
            header: 'default: 1',
            desc: 'This number represents the zDepth of the paper shadow.'
          },
          {
            name: 'transitionEnabled',
            type: 'bool',
            header: 'default: true',
            desc: 'Set to false to disable CSS transitions for the paper element.'
          }
        ]
      }
    ];

    let groupStyle = this.getStyles().group;

    return (
      <ComponentDoc
        name="Paper"
        code={code}
        componentInfo={componentInfo}>

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

      </ComponentDoc>
    );
  },

  _createParagraphElement: function(text) {
    return <p style={this.getStyles().p}>{text}</p>;
  },

  _createPaperElement: function(zDepth, text) {
    let styles = this.getStyles();
    return (
      <Paper
        style={styles.root}
        zDepth={zDepth}>
        {this._createParagraphElement(text)}
      </Paper>
    );
  },

  _getGroupDefault: function() {
    let elements = [];
    for (let i = 1; i <= 5; i++) {
      elements.push(this._createPaperElement(i, "zDepth="+i));
    }
    return elements;
  },

  _getGroupRounded: function() {
    let elements = [];
    for (let i = 1; i <= 5; i++) {
      elements.push(React.cloneElement(this._createPaperElement(i, "rounded=false"), {rounded: false}));
    }
    return elements;
  },

  _getGroupCircle: function() {
    let elements = [];
    for (let i = 1; i <= 5; i++) {
      elements.push(React.cloneElement(this._createPaperElement(i, "circle=true"), {circle: true}));
    }
    return elements;
  }

});

module.exports = PaperPage;
