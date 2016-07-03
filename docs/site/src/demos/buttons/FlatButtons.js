import React, {Component, PropTypes} from 'react';
import Button from 'material-ui/Button';

export default class FlatButtons extends Component {

  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    return (
      <Button>Default</Button>
    );
  }
}
