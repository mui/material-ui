/* eslint-env mocha */
import React from 'react';
import PropTypes from 'prop-types';
import {mount} from 'enzyme';
import {assert} from 'chai';
import getMuiTheme from 'src/styles/getMuiTheme';
import {Card, CardActions, CardHeader, CardText} from 'src/Card';
import FlatButton from 'src/FlatButton';
import OpenIcon from 'src/svg-icons/action/visibility';
import CloseIcon from 'src/svg-icons/action/visibility-off';

describe('<Card />', () => {
  const muiTheme = getMuiTheme();
  const mountWithContext = (node) => mount(node, {
    context: {muiTheme},
    childContextTypes: {muiTheme: PropTypes.object},
  });

  it('renders a openIcon inside the CardHeader with custom color', () => {
    const wrapper = mountWithContext(
      <Card>
        <CardHeader
          title="Without Avatar"
          subtitle="Subtitle"
          actAsExpander={true}
          showExpandableButton={true}
          closeIcon={<CloseIcon color="#ff0000" />}
          openIcon={<OpenIcon color="#00ff00" />}
          iconStyle={{width: 10, height: 11}}
        />
        <CardActions>
          <FlatButton label="Action1" />
          <FlatButton label="Action2" />
        </CardActions>
        <CardText expandable={true}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
      </Card>
    );

    assert.strictEqual(wrapper.find(CloseIcon).node.props.color, '#ff0000', 'CloseIcon should have color #ff0000');
    assert.strictEqual(wrapper.find(CloseIcon).node.props.style.width, 10, 'CloseIcon should have width 10');
    assert.strictEqual(wrapper.find(CloseIcon).node.props.style.height, 11, 'CloseIcon should have height 10');
    wrapper.setState({expanded: true});
    assert.strictEqual(wrapper.find(OpenIcon).node.props.color, '#00ff00', 'OpenIcon should have color #00ff00');
    assert.strictEqual(wrapper.find(OpenIcon).node.props.style.width, 10, 'OpenIcon should have width 10');
    assert.strictEqual(wrapper.find(OpenIcon).node.props.style.height, 11, 'OpenIcon should have height 10');
  });
});
