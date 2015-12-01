import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const ContentForward = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M12 8V4l8 8-8 8v-4H4V8z"/>
      </SvgIcon>
    );
  }

});

export default ContentForward;
