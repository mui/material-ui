import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';

const colors = [
  'Red',
  'Orange',
  'Yellow',
  'Green',
  'Blue',
  'Purple',
  'Black',
  'White',
];

const menuProps = {
  desktop: true,
  disableAutoFocus: true,
};

/**
 * Provide props to be passed into the Menu component.
 */
export default class AutoCompleteExampleMenuProps extends Component {
  render() {
    return (
      <div>
        <AutoComplete
          hintText="Type anything"
          dataSource={colors}
          menuProps={menuProps}
        />
      </div>
    );
  }
}
