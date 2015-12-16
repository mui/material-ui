import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const CommunicationCallMade = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M9 5v2h6.59L4 18.59 5.41 20 17 8.41V15h2V5z"/>
      </SvgIcon>
    );
  }

});

export default CommunicationCallMade;
