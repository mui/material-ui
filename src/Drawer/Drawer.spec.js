/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import {expect} from 'chai';
import Drawer from './Drawer';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Drawer />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('propTypes', () => {
    it('accepts number in the width props', () => {
      shallowWithContext(
        <Drawer width={400} />
      );
    });

    it('accepts a percentage format in string', () => {
      shallowWithContext(
        <Drawer width="70%" />
      );
    });

    it('throws an error on wrong percentage format', () => {
      expect(() => shallowWithContext(
        <Drawer width="80" />
      )).to.throw(Error, 'Not a valid percentage format.');
    });
  });
});
