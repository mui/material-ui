// @flow weak
/* eslint-env mocha */
import React from 'react';
import { createShallowWithContext } from 'test/utils';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import TimePickerDialog from './TimePickerDialog';

describe('<TimePickerDialog />', () => {
  const shallowWithContext = createShallowWithContext();

  it('should not call onDismiss when user clicks on OK label', () => {
    const onDismissCallback = spy();
    const onAcceptCallback = spy();
    const okButtonLabel = 'CLICKME';
    const wrapper = shallowWithContext(
      <TimePickerDialog
        onDismiss={onDismissCallback}
        onAccept={onAcceptCallback}
        okLabel={okButtonLabel}
      />,
    );
    wrapper.instance().clock = { getSelectedTime: stub().returns(Date.now()) };
    wrapper.instance().handleClickOK();
    expect(onDismissCallback).to.have.property('callCount', 0);
    expect(onAcceptCallback).to.have.property('callCount', 1);
    expect(wrapper.state('open')).to.equal(false);
  });
});
