import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/lib/svg-icons/content/filter-list';

export default class IconMenuExampleControlled extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueSingle: '3',
      valueMultiple: ['3', '5'],
    };
  }

  handleChangeSingle = (event, value) => {
    this.setState({
      valueSingle: value,
    });
  };

  handleChangeMultiple = (event, value) => {
    this.setState({
      valueMultiple: value,
    });
  };

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          onChange={this.handleChangeSingle}
          value={this.state.valueSingle}
        >
          <MenuItem value="1" primaryText="Refresh" />
          <MenuItem value="2" primaryText="Send feedback" />
          <MenuItem value="3" primaryText="Settings" />
          <MenuItem value="4" primaryText="Help" />
          <MenuItem value="5" primaryText="Sign out" />
        </IconMenu>
        <IconMenu
          iconButtonElement={<IconButton><ContentFilter /></IconButton>}
          onChange={this.handleChangeMultiple}
          value={this.state.valueMultiple}
          multiple={true}
        >
          <MenuItem value="1" primaryText="Blu-ray" />
          <MenuItem value="2" primaryText="Cassette" />
          <MenuItem value="3" primaryText="CD" />
          <MenuItem value="4" primaryText="DVD Audio" />
          <MenuItem value="5" primaryText="Hybrid SACD" />
          <MenuItem value="6" primaryText="Vinyl" />
        </IconMenu>
      </div>
    );
  }
}
