var React = require('react');
var mui = require('mui');
var IconButton = mui.IconButton;
var ComponentDoc = require('../../component-doc.jsx');

var IconButtonsPage = React.createClass({

  render: function() {

    var code =
      '<IconButton icon="action-grade" tooltip="star" />\n' +
      '<IconButton icon="action-grade" tooltip="star" touch={true} />\n' +
      '<IconButton icon="action-grade" tooltip="star" disabled={true} />';

    var desc = 'This component generates a button element and all props except for ' +
      '"icon" will be passed down to the button element. Also, focus styles ' +
      'will happen on tab but not on click.';

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'icon',
            type: 'string',
            header: 'required',
            desc: 'The name of the icon to use.'
          },
          {
            name: 'tooltip',
            type: 'string',
            header: 'optional',
            desc: 'The tooltip text to show.'
          },
          {
            name: 'touch',
            type: 'bool',
            header: 'default: false',
            desc: 'If true, this component will render the touch sized tooltip.'
          }
        ]
      }
    ];

    return (
      <ComponentDoc
        name="Icon Buttons"
        code={code}
        desc={desc}
        componentInfo={componentInfo}>

        <IconButton icon="action-grade" tooltip="Star" />
        <IconButton icon="action-grade" tooltip="Star" touch={true} />
        <IconButton icon="action-grade" tooltip="Star" disabled={true} />

      </ComponentDoc>
    );
    
  }

});

module.exports = IconButtonsPage;