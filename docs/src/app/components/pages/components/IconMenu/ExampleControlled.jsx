import React from 'react';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import ContentFilter from 'material-ui/lib/svg-icons/content/filter-list';

const iconButtonElement = (
  <IconButton>
    <MoreVertIcon />
  </IconButton>
);

const filterButtonElement = (
  <IconButton>
    <ContentFilter />
  </IconButton>
);



export default class IconMenuExampleControlled extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      iconMenuValueLink: '1',
    };
  }

  handleIconMenuValueLinkChange = (e, value) => {
    this.setState({
      iconMenuValueLink: value,
    });
  };

  render() {
    let iconMenuValueLink = {
      value: this.state.iconMenuValueLink,
      requestChange: this.handleIconMenuValueLinkChange,
    };

    return (
      <div>
        <IconMenu
          iconButtonElement={iconButtonElement}
          onChange={this._handleIconMenuChange}
          value={this.state.iconMenuValue}>
          <MenuItem value="1" primaryText="Refresh" />
          <MenuItem value="2" primaryText="Send feedback" />
          <MenuItem value="3" primaryText="Settings" />
          <MenuItem value="4" primaryText="Help" />
          <MenuItem value="5" primaryText="Sign out" />
        </IconMenu>

        <IconMenu
          iconButtonElement={iconButtonElement}
          valueLink={iconMenuValueLink}>
          <MenuItem value="1" primaryText="Refresh" />
          <MenuItem value="2" primaryText="Send feedback" />
          <MenuItem value="3" primaryText="Settings" />
          <MenuItem value="4" primaryText="Help" />
          <MenuItem value="5" primaryText="Sign out" />
        </IconMenu>

        <IconMenu
          iconButtonElement={filterButtonElement}
          multiple={true}
          onChange={this._handleIconMenuMultiChange}
          value={this.state.iconMenuMultiValue}>
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
