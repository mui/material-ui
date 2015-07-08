let React = require('react');
let { Slider } = require('material-ui');
let ComponentDoc = require('../../component-doc');


class SlidersPage extends React.Component {

  handleMouseDown(e) {
    console.log('hmd', e);
  }

  render() {

    let code =
      '// Default\n' +
      '<Slider name="slider1" />\n\n' +
      '// With starting value\n' +
      '<Slider name="slider2" defaultValue={0.5} step={0.10} />\n' +
      '<Slider name="slider3" defaultValue={1} />\n\n' +
      '// Disabled with fixed value\n' +
      '<Slider name="slider1" disabled={true} />\n' +
      '<Slider name="slider2" disabled={true} value={0.5} />\n' +
      '<Slider name="slider3" disabled={true} value={1} />';

    let componentInfo = [
      {
        name: 'Props',
        infoArray: [
          {
            name: 'name',
            type: 'string',
            header: 'required',
            desc: 'The name of the slider. Behaves like the name attribute of an input element.'
          },
          {
            name: 'defaultValue',
            type: 'number',
            header: 'default: 0',
            desc: 'The default value of the slider.'
          },
          {
            name: 'description',
            type: 'string',
            header: 'optional',
            desc: 'Describe the slider.'
          },
          {
            name: 'disabled',
            type: 'boolean',
            header: 'default: false',
            desc: 'If true, the slider will not be interactable.'
          },
          {
            name: 'error',
            type: 'string',
            header: 'optional',
            desc: 'An error message for the slider.'
          },
          {
            name: 'max',
            type: 'number',
            header: 'default: 1',
            desc: 'The maximum value the slider can slide to on a scale from ' +
                  '0 to 1 inclusive. Cannot be equal to min.'
          },
          {
            name: 'min',
            type: 'number',
            header: 'default: 0',
            desc: 'The minimum value the slider can slide to on a scale from ' +
                  '0 to 1 inclusive. Cannot be equal to max.'
          },
          {
            name: 'required',
            type: 'boolean',
            header: 'default: true',
            desc: 'Whether or not the slider is required in a form.'
          },
          {
            name: 'step',
            type: 'number',
            header: 'default: 0.01',
            desc: 'The granularity the slider can step through values.'
          },
          {
            name: 'style',
            type: 'object',
            header: 'optional',
            desc: 'Override the inline-styles of the Slider\'s root element.'
          },
          {
            name: 'value',
            type: 'number',
            header: 'optional',
            desc: 'The value of the slider.'
          },
        ]
      },
      {
        name: 'Events',
        infoArray: [
          {
            name: 'onBlur',
            type: 'function(e)',
            header: 'optional',
            desc: 'Callback function that is fired when the focus has left the slider.'
          },
          {
            name: 'onChange',
            type: 'function(e, value)',
            header: 'optional',
            desc: 'Callback function that is fired when the user changes the ' +
                  'slider\'s value.'
          },
          {
            name: 'onDragStart',
            type: 'function(e, ui)',
            header: 'optional',
            desc: 'Callback function that is fired when the slider has begun to move. ui contains the position information.'
          },
          {
            name: 'onDragStop',
            type: 'function(e, ui)',
            header: 'optional',
            desc: 'Callback function that is fried when teh slide has stopped moving. ui contains the position information.'
          },
          {
            name: 'onFocus',
            type: 'function(e)',
            header: 'optional',
            desc: 'Callback fired when the user has focused on the slider.'
          },
        ]
      },
    ];

    return (
      <ComponentDoc
        name="Sliders"
        code={code}
        componentInfo={componentInfo}>

        <Slider name="slider1" />
        <Slider name="slider2" value={0.5} step={0.10} />
        <Slider name="slider3" value={1}/>
        <Slider name="slider1" disabled={true} />
        <Slider name="slider2" disabled={true} value={0.5} />
        <Slider name="slider3" disabled={true} value={1} />

      </ComponentDoc>
    );
  }

}

module.exports = SlidersPage;
