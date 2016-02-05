import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const ActionViewStream = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z"/>
      </SvgIcon>
    );
  }

});

export default ActionViewStream;
