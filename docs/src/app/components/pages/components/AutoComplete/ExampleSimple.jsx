import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';

export default class AutoCompleteExampleSimple extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  render() {
    return (
      <AutoComplete
        hintText="Type anything"
        dataSource={this.state.dataSource}
        onUpdateInput={this.handleUpdateInput}
      />
    );
  }
}
