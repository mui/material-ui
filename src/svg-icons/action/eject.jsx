import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const ActionEject = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M5 17h14v2H5zm7-12L5.33 15h13.34z"/>
      </SvgIcon>
    );
  }

});

export default ActionEject;
