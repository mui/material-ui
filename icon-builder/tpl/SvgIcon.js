import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import SvgIcon from '{{{ muiRequireStmt }}}';

const {{className}} = React.createClass({

  mixins: [PureRenderMixin],

  render() {
    return (
      <SvgIcon {...this.props}>
        {{{paths}}}
      </SvgIcon>
    );
  }

});

export default {{className}};
