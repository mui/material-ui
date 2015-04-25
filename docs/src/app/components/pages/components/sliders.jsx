var React = require('react');
var mui = require('mui');
var Slider = mui.Slider;
var ComponentDoc = require('../../component-doc.jsx');

class SlidersPage extends React.Component {

  handleMouseDown(e){
    console.log('hmd', e);
  }

  render() {

    var code =
      '// Default\n' +
      '<Slider name="slider1" />\n\n' +
      '// With starting value\n' +
      '<Slider name="slider2" defaultValue={0.5} />\n' +
      '<Slider name="slider3" defaultValue={1} />\n\n' +
      '// Disabled with fixed value\n' +
      '<Slider name="slider1" disabled={true} />\n' +
      '<Slider name="slider2" disabled={true} value={0.5} />\n' +
      '<Slider name="slider3" disabled={true} value={1} />';

    var componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'max',
            type: 'number',
            header: 'default: 1',
            desc: 'The maximum value the slider can slide to on a scale from ' +
                  '0 to 1 inclusive.'
          },
          {
            name: 'min',
            type: 'number',
            header: 'default: 0',
            desc: 'The minimum value the slider can slide to on a scale from ' +
                  '0 to 1 inclusive.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the Slider\'s root element.'
          }
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onChange',
            type: 'function(e, value)',
            header: 'optional',
            desc: 'Callback function that is fired when the user changes the ' +
                  'slider\'s value.'
          }         
        ]
      },
    ];

    return (
      <ComponentDoc
        name="Sliders"
        code={code}
        componentInfo={componentInfo}>

        <Slider name="slider1"/>
        <Slider onMouseDown={this.handleMouseDown} name="slider2" value={0.5} />
        <Slider name="slider3" value={1}/>
        <Slider name="slider1" disabled={true} />
        <Slider name="slider2" disabled={true} value={0.5} />
        <Slider name="slider3" disabled={true} value={1} />

      </ComponentDoc>
    );
  }

}

module.exports = SlidersPage;
