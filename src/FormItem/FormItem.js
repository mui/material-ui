import React, {Component, PropTypes} from 'react';

export default class FormItem extends Component {
  render() {
    return (
      <div style={{display: 'inline-block', margin: '0 10px 0 0'}}>
        { this.props.children }
      </div>
    );
  }
}

FormItem.propTypes = {
  children: PropTypes.element,
  inline: PropTypes.boolean,
};
