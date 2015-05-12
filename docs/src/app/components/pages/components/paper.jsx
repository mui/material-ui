var React = require('react');
var mui = require('mui');
var Paper = mui.Paper;
var ClearFix = mui.ClearFix;
var StyleResizable = mui.Mixins.StyleResizable;
var ComponentDoc = require('../../component-doc.jsx');

var PaperPage = React.createClass ({

  mixins: [StyleResizable],

  getStyles: function() {
    var styles = {
      root: {
        height: '100px',
        width: '100px',
        margin: '0 auto',
        marginBottom: '64px'
      },
      container: {
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

    var code = [
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

    var componentInfo = [
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
            name: 'innerClassName',
            type: 'string',
            header: 'optional',
            desc: 'The paper container consists of an outer div and inner div. ' + 
                  'This one done in order to achieve Material Design\'s shadows. ' + 
                  'It\'s sometimes helpful to assign an className to the inner ' +
                  'div for styling. This property is the className for the inner ' +
                  'div.'
          },
          {
            name: 'innerStyle',
            type: 'string',
            header: 'optional',
            desc: 'Similiar to innerClassName. Overrides the inline-style of ' +
                  'the inner div.'
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
            desc: 'Override the inline-styles of Paper\'s root element (its ' +
                  'outer div).'
          },
          {
            name: 'zDepth',
            type: 'number (0-5)',
            header: 'default: 1',
            desc: 'This number represents the zDepth of the paper shadow.'
          }
        ]
      },
      {
        name: 'Methods',
        infoArray: [
          {
            name: 'getInnerContainer',
            header: 'Paper.getInnerContainer()',
            desc: 'Returns a reference to the inner container div.'
          }
        ]
      }
    ];

    var groupStyle = this.getStyles().group;

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
    var styles = this.getStyles();
    return (
      <Paper 
        style={styles.root} 
        innerStyle={styles.container}
        zDepth={zDepth}>
        {this._createParagraphElement(text)}
      </Paper>
    );
  },

  _getGroupDefault: function() {
    var elements = [];
    for (var i = 1; i <= 5; i++) {
      elements.push(this._createPaperElement(i, "zDepth="+i));
    }
    return elements;
  },

  _getGroupRounded: function() {
    var elements = [];
    for (var i = 1; i <= 5; i++) {
      elements.push(React.cloneElement(this._createPaperElement(i, "rounded=false"), {rounded: false}));
    }
    return elements;
  },

  _getGroupCircle: function() {
    var elements = [];
    for (var i = 1; i <= 5; i++) {
      elements.push(React.cloneElement(this._createPaperElement(i, "circle=true"), {circle: true}));
    }
    return elements;
  }

});

module.exports = PaperPage;
