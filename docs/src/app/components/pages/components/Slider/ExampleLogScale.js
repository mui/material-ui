import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

/**
 * The `logScale` property can be helpful when the slider covers a large range of values.
 * On a logarithmic scale, the value will increase by order of magnitude along the slider axis.
 */
export default class SliderExampleLogScale extends Component {

  state = {
    slider: 1000,
  };

  handleSlider = (event, value) => {
    this.setState({slider: value});
  };

  render() {
    return (
      <div>
        <Slider
          min={0}
          max={1000000}
          defaultValue={1000}
          logScale={true}
          step={1}
          value={this.state.slider}
          onChange={this.handleSlider}
        />
        <p>
          <span>{'Log scale slider value is '}</span>
          <span>{this.state.slider}</span>
          <span>{' from a range of 0 to 1,000,000'}</span>
        </p>
      </div>
    );
  }
}
