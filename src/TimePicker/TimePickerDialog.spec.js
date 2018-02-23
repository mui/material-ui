/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import {spy, stub} from 'sinon';
import getMuiTheme from '../styles/getMuiTheme';
import TimePickerDialog from './TimePickerDialog';

describe('<TimePickerDialog />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  it('should not call onDismiss when user clicks on OK label', () => {
    const onDismissCallback = spy();
    const onAcceptCallback = spy();
    const okButtonLabel = 'CLICKME';
    const wrapper = shallowWithContext(
      <TimePickerDialog
        onDismiss={onDismissCallback}
        onAccept={onAcceptCallback}
        okLabel={okButtonLabel}
      />
    );
    wrapper.instance().refs = {clock: {getSelectedTime: stub().returns(Date.now())}};
    wrapper.instance().handleClickOK();
    expect(onDismissCallback).to.have.property('callCount', 0);
    expect(onAcceptCallback).to.have.property('callCount', 1);
    expect(wrapper.state('open')).to.equal(false);
  });
});
