import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const ActionTrendingFlat = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M22 12l-4-4v3H3v2h15v3z"/>
      </SvgIcon>
    );
  }

});

export default ActionTrendingFlat;
