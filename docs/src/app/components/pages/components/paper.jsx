var React = require('react');
var mui = require('mui');
var Paper = mui.Paper;
var ComponentDoc = require('../../component-doc.jsx');

var PaperPage = React.createClass({

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
            desc: 'The paper container consists of 2 nested divs. It\'s ' +
              'sometimes helpful to assign an className to the inner div ' +
              'for styling. This property is the className for the inner div.'
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

    var styles = {
      height: 100,
      width: 100,
      margin: '0 auto',
      marginBottom: 64,
    };

    return (
      <ComponentDoc
        name="Paper"
        code={code}
        componentInfo={componentInfo}>

        <div className="paper-examples">
          <div className="paper-examples-group">
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={1}>
      	      <p>zDepth=1</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={2}>
      	      <p>zDepth=2</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={3}>
      	      <p>zDepth=3</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={4}>
      	      <p>zDepth=4</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={5}>
      	      <p>zDepth=5</p>
      	    </Paper>
          </div>

          <div className="paper-examples-group">
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={1} rounded={false}>
      	      <p>rounded=false</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={2} rounded={false}>
      	      <p>rounded=false</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={3} rounded={false}>
      	      <p>rounded=false</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={4} rounded={false}>
      	      <p>rounded=false</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={5} rounded={false}>
      	      <p>rounded=false</p>
      	    </Paper>
          </div>

          <div className="paper-examples-group">
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={1} circle={true}>
      	      <p>circle=true</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={2} circle={true}>
      	      <p>circle=true</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={3} circle={true}>
      	      <p>circle=true</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={4} circle={true}>
      	      <p>circle=true</p>
      	    </Paper>
      	    <Paper style={styles} innerClassName="mui-paper-container" zDepth={5} circle={true}>
      	      <p>circle=true</p>
      	    </Paper>
          </div>
        </div>

      </ComponentDoc>
    );
  }

});

module.exports = PaperPage;
