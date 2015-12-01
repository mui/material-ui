import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const NavigationArrowDropUp = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M7 14l5-5 5 5z"/>
      </SvgIcon>
    );
  }

});

export default NavigationArrowDropUp;
