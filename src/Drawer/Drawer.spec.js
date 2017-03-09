/* eslint-env mocha */
import React from 'react';
import {shallow} from 'enzyme';
import consoleError from '../../test/utils/consoleError';
import Drawer from './Drawer';
import getMuiTheme from '../styles/getMuiTheme';

describe('<Drawer />', () => {
  const muiTheme = getMuiTheme();
  const shallowWithContext = (node) => shallow(node, {context: {muiTheme}});

  describe('propTypes', () => {
    before(() => {
      consoleError();
    });

    it('accepts string in the width props', () => {
      shallowWithContext(
        <Drawer width="100%" />
      );
    });

    it('accepts number in the width props', () => {
      shallowWithContext(
        <Drawer width={400} />
      );
    });
  });
});
