// @flow weak

import React, { Component }from 'react';
import Avatar from 'material-ui/Avatar';
import image from './ImageAvatar.jpg';

export default class ImageAvatar extends Component {

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  componentDidMount() {
    this.sleep(1000);
  }

  render() {
    return (
      <Avatar
        alt="Remy Sharp"
        src={image}
      />
    );
  }
}
