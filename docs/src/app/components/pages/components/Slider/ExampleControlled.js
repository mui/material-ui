import React from 'react';
import Slider from 'material-ui/Slider';

/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
export default class SliderExampleControlled extends React.Component {

  state = {
    firstSlider: 0.5,
    secondSlider: 50,
  }

  handleFirstSlider(event, value) {
    this.setState({firstSlider: value});
  }

  handleSecondSlider(event, value) {
    this.setState({secondSlider: value});
  }

  render() {
    return (
      <div>
        <Slider
          defaultValue={0.5}
          value={this.state.firstSlider}
          onChange={this.handleFirstSlider.bind(this)}
        />
        <p>
          <span>{'The value of this slider is: '}</span>
          <span>{this.state.firstSlider}</span>
          <span>{' from a range of 0 to 1 inclusive'}</span>
        </p>
        <Slider
          min={0}
          max={100}
          step={1}
          defaultValue={50}
          value={this.state.secondSlider}
          onChange={this.handleSecondSlider.bind(this)}
        />
        <p>
          <span>{'The value of this slider is: '}</span>
          <span>{this.state.secondSlider}</span>
          <span>{' from a range of 0 to 100 inclusive'}</span>
        </p>
      </div>
    );
  }

}
