import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

export default class AutoCompleteExampleTextFieldProps extends React.Component {

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
      <div>
        <AutoComplete
          hintText="Only numbers can be typed"
          dataSource={this.state.dataSource}
          onUpdateInput={this.handleUpdateInput}
          fullWidth={true}
          type="number"
        />
      </div>
    );
  }
}
