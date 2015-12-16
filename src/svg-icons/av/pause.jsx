import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const AvPause = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
      </SvgIcon>
    );
  }

});

export default AvPause;
