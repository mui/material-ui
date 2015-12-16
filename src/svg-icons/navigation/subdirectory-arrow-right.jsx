import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '../../svg-icon';

const NavigationSubdirectoryArrowRight = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        <path d="M19 15l-6 6-1.42-1.42L15.17 16H4V4h2v10h9.17l-3.59-3.58L13 9l6 6z"/>
      </SvgIcon>
    );
  }

});

export default NavigationSubdirectoryArrowRight;
