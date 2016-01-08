import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

export default class AutoCompleteExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input1: [],
      input2: [],
    };
  }

  handleNewRequest = (t) => {
    console.log(`New request: ${t}`);
  };

  handleUpdateInput1 = (t) => {
    this.setState({
      input1: [t, t + t, t + t + t],
    });
  };

  handleUpdateInput2 = (t) => {
    this.setState({
      input2: [t, t + t, t + t + t],
    });
  };

  render() {
    return (
      <div>
        <AutoComplete
          dataSource={this.state.input1}
          onUpdateInput={this.handleUpdateInput1}
          onNewRequest={this.handleNewRequest}
        />
        <br/>
        <AutoComplete
          hintText="Hint Text"
          dataSource={this.state.input2}
          onUpdateInput={this.handleUpdateInput2}
          onNewRequest={this.handleNewRequest}
        />
      </div>
    );
  }
}
