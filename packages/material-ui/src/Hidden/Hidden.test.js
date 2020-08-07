import * as React from 'react';
import { expect } from 'chai';
import { createShallow } from '@material-ui/core/test-utils';
import Hidden from './Hidden';
import HiddenJs from './HiddenJs';
import HiddenCss from './HiddenCss';

describe('<Hidden />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  describe('prop: implementation', () => {
    it('should use HiddenJs by default', () => {
      const wrapper = shallow(<Hidden>Hello</Hidden>);
      expect(wrapper.find(HiddenJs).length).to.equal(1);
    });

    it('should change the implementation', () => {
      const wrapper = shallow(<Hidden implementation="css">Hello</Hidden>);
      expect(wrapper.find(HiddenCss).length).to.equal(1);
    });
  });
});
