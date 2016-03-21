import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';

const dataSource1 = [
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

const dataSource2 = ['12345', '23456', '34567'];

const dataSource3 = [
  {text: 'Some Text', value: 'someFirstValue'},
  {text: 'Some Text', value: 'someSecondValue'},
];

const AutoCompleteExampleNoFilter = () => (
  <div>
    <AutoComplete
      hintText="text-value data"
      filter={AutoComplete.noFilter}
      dataSource={dataSource1}
    /><br />
    <AutoComplete
      floatingLabelText="showAllItems"
      filter={AutoComplete.noFilter}
      openOnFocus={true}
      dataSource={dataSource2}
    /><br />
    <AutoComplete
      floatingLabelText="Same text, different values"
      filter={AutoComplete.noFilter}
      openOnFocus={true}
      dataSource={dataSource3}
    />
  </div>
);

export default AutoCompleteExampleNoFilter;
