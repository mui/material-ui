import React from 'react';
import MobileTearSheet from '../../../MobileTearSheet';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Avatar from 'material-ui/lib/avatar';
import Subheader from 'material-ui/lib/Subheader';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);

function wrapState(ComposedComponent) {
  const StateWrapper = React.createClass({
    getInitialState() {
      return {selectedIndex: 1};
    },
    handleUpdateSelectedIndex(event, index) {
      this.setState({
        selectedIndex: index,
      });
    },
    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          valueLink={{value: this.state.selectedIndex, requestChange: this.handleUpdateSelectedIndex}}
        />
      );
    },
  });
  return StateWrapper;
}

SelectableList = wrapState(SelectableList);

const ListExampleSelectable = () => (
  <MobileTearSheet>
    <SelectableList value={3}>
      <Subheader>Selectable Contacts</Subheader>
      <ListItem
        value={1}
        primaryText="Brendan Lim"
        leftAvatar={<Avatar src="images/ok-128.jpg" />}
        nestedItems={[
          <ListItem
            value={2}
            primaryText="Grace Ng"
            leftAvatar={<Avatar src="images/uxceo-128.jpg" />}
          />,
        ]}
      />
      <ListItem
        value={3}
        primaryText="Kerem Suer"
        leftAvatar={<Avatar src="images/kerem-128.jpg" />}
      />
      <ListItem
        value={4}
        primaryText="Eric Hoffman"
        leftAvatar={<Avatar src="images/kolage-128.jpg" />}
      />
      <ListItem
        value={5}
        primaryText="Raquel Parrado"
        leftAvatar={<Avatar src="images/raquelromanp-128.jpg" />}
      />
    </SelectableList>
  </MobileTearSheet>
);

export default ListExampleSelectable;
