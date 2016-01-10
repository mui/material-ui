import React from 'react';
import AutoComplete from 'material-ui/lib/auto-complete';
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

export default class AutoCompleteExampleNoFilter extends React.Component {

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
  };

  render() {
    return (
      <div>
        <AutoComplete
          hintText="text-value data"
          filter={AutoComplete.noFilter}
          dataSource={dataSource}
          onNewRequest={this.handleNewRequest}
        /><br/>
        <AutoComplete
          floatingLabelText="showAllItems"
          filter={AutoComplete.noFilter}
          triggerUpdateOnFocus={true}
          animated={false}
          dataSource={['12345', '23456', '34567']}
        />
      </div>
    );
  }
}
