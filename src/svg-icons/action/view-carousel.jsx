import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const ActionViewCarousel = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 19h10V4H7v15zm-5-2h4V6H2v11zM18 6v11h4V6h-4z"/>
      </SvgIcon>
    );
  }

});

export default ActionViewCarousel;
