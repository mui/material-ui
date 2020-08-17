import { expect } from 'chai';
import { consoleWarnMock } from 'test/utils/consoleErrorMock';
import createMixins from './createMixins';
import createMuiTheme from './createMuiTheme';

describe('createMixins', () => {
  it('should be able to override the breakpoint', () => {
    const theme = createMuiTheme();
    const mixins = createMixins(theme.breakpoints, theme.spacing, { test: { display: 'block' } });

    expect(mixins.test).to.deep.equal({ display: 'block' });
  });

  describe('v5 deprecations', () => {
    beforeEach(() => {
      consoleWarnMock.spy();
    });

    afterEach(() => {
      consoleWarnMock.reset();
    });

    it('issues a warning for theme.mixins.gutters', () => {
      const theme = createMuiTheme();
      theme.mixins.gutters();
      expect(consoleWarnMock.callCount()).to.equal(1);
      expect(consoleWarnMock.messages()[0]).to.include('theme.mixins.gutters() is deprecated.');
    });
  });
});
