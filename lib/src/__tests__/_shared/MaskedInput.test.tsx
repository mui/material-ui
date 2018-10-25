import { ShallowWrapper } from 'enzyme';
import * as React from 'react';
import MaskedInput, { CustomMaskedInputProps } from '../../_shared/MaskedInput';
import { shallow } from '../test-utils';

describe('MaskedInput', () => {
  let component: ShallowWrapper<CustomMaskedInputProps>;

  beforeEach(() => {
    component = shallow(
      <MaskedInput
        mask={[]}
        inputRef={() => {
          return;
        }}
      />
    );
  });

  it('Should renders', () => {
    // console.log(component.debug());
    expect(component).toBeTruthy();
  });
});
