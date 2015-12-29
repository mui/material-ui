import React from 'react';
import {AutoComplete} from 'material-ui';
import ComponentDoc from '../../component-doc';
import CodeExample from '../../CodeExample';
import Code from 'auto-complete-code';
import MenuItem from 'material-ui/lib/menus/menu-item';

const dataSource = [
  {
    text: 'text-value1',
    value: (
      <MenuItem
        primaryText="text-value1"
        secondaryText="&#9786;"
      />
    ),
  },
  {
    text: 'text-value2',
    value: (
      <MenuItem
        primaryText="text-value2"
        secondaryText="&#9786;"
      />
    ),
  },
];

class AutoCompletePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      input1: [],
      input2: [],
      input3: [],
    };
  }

  handleNewRequest = (t) => {
    console.log(`New request: ${t}`);
  }

  handleUpdateInput1 = (t) => {
    this.setState({
      input1: [t, t + t, t + t + t],
    });
  }

  handleUpdateInput2 = (t) => {
    this.setState({
      input2: [t, t + t, t + t + t],
    });
  }

  handleUpdateInput3 = (t) => {
    this.setState({
      input3: [t, t + t, t + t + t],
    });
  }

  render() {
    return (
      <ComponentDoc
        name="Auto Complete"
        componentInfo={[
          {
            name: 'Auto Complete',
            infoArray: [],
          },
        ]}>
        <br/>
        <CodeExample code={Code}>
          <AutoComplete
            dataSource={this.state.input1}
            onUpdateInput={this.handleUpdateInput1}
            onNewRequest={this.handleNewRequest}
          />
          <br/>
          <AutoComplete
            hintText="hint"
            dataSource={this.state.input2}
            onUpdateInput={this.handleUpdateInput2}
            onNewRequest={this.handleNewRequest}
          />
          <br/>
          <AutoComplete
            fullWidth={true}
            searchText="*****"
            errorText="error message"
            dataSource={this.state.input3}
            onUpdateInput={this.handleUpdateInput3}
            onNewRequest={this.handleNewRequest}
          />
          <AutoComplete
            hintText="text-value data"
            showAllItems={true}
            dataSource={dataSource}
            onNewRequest={this.handleNewRequest}
          />
          <br/>
          <AutoComplete
            floatingLabelText="floating Label"
            dataSource={['12345', '23456', '34567']}
          />
          <br/>
          <AutoComplete
            floatingLabelText="showAllItems"
            showAllItems={true}
            animated={false}
            dataSource={['12345', '23456', '34567']}
          />
        </CodeExample>
      </ComponentDoc>
    );
  }
}

export default AutoCompletePage;
