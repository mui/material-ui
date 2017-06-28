// @flow

import { stub } from 'sinon';
import { assert } from 'chai';
import { create } from 'jss';
import jssPreset from 'jss-preset-default';
import { createStyleManager } from 'jss-theme-reactor';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createMount } from '../test-utils';
import { createMuiTheme } from '../styles';
import Button from '../Button';
import MuiThemeProvider from './MuiThemeProvider';

describe('<MuiThemeProvider />', () => {
  describe('server side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    let theme;
    let styleManager;

    before(() => {
      theme = createMuiTheme();
      const jss = create(jssPreset());
      styleManager = createStyleManager({ jss, theme });
    });

    after(() => {
      styleManager.reset();
    });

    it('should be able to extract the styles', () => {
      const markup = renderToString(
        <MuiThemeProvider theme={theme} styleManager={styleManager}>
          <Button>Hello World</Button>
        </MuiThemeProvider>,
      );

      assert.notStrictEqual(markup.match('Hello World'), null);
      assert.strictEqual(styleManager.sheetsToString().length > 4000, true);
    });
  });

  describe('react component', () => {
    let mount;
    let child;
    let wrapper;
    let instance;

    let themeObj;
    let styleManagerObj;

    before(() => {
      mount = createMount();
      child = <div />;
      wrapper = mount(
        <MuiThemeProvider>
          {child}
        </MuiThemeProvider>,
      );
      instance = wrapper.instance();

      themeObj = { themeObjProperty: 'woof' };
      styleManagerObj = { styleManagerObjProperty: 'woof' };
      stub(MuiThemeProvider, 'createDefaultContext').returns({
        theme: themeObj,
        styleManager: styleManagerObj,
      });
    });

    after(() => {
      mount.cleanUp();
      MuiThemeProvider.createDefaultContext.restore();
    });

    describe('setProps() with different styleManager', () => {
      before(() => {
        MuiThemeProvider.createDefaultContext.resetHistory();
        wrapper.setProps({});
      });

      it('should call createDefaultContext() exactly once', () => {
        assert.strictEqual(MuiThemeProvider.createDefaultContext.callCount, 1);
      });

      it('should set instance.theme to createDefaultContext().theme', () => {
        assert.property(instance, 'theme');
        assert.property(instance.theme, 'themeObjProperty');
        assert.strictEqual(instance.theme.themeObjProperty, themeObj.themeObjProperty);
      });

      it('should set instance.styleManager to createDefaultContext().theme', () => {
        assert.property(instance, 'styleManager');
        assert.property(instance.styleManager, 'styleManagerObjProperty');
        assert.strictEqual(
          instance.styleManager.styleManagerObjProperty,
          styleManagerObj.styleManagerObjProperty,
        );
      });
    });

    describe('setProps() with same styleManager', () => {
      let updateThemeStub;
      let nextProps;

      before(() => {
        MuiThemeProvider.createDefaultContext.resetHistory();
        updateThemeStub = stub();
        instance.styleManager.updateTheme = updateThemeStub;
        nextProps = {
          styleManager: instance.styleManager,
          theme: {
            themeProperty: 'woof',
          },
        };
        wrapper.setProps(nextProps);
      });

      it('should not call createDefaultContext() at all', () => {
        assert.strictEqual(MuiThemeProvider.createDefaultContext.callCount, 0);
      });

      it('should set instance.theme to nextProps.theme', () => {
        assert.strictEqual(instance.theme, nextProps.theme);
      });

      it('should call instance.styleManager.updateTheme() exactly once', () => {
        assert.strictEqual(instance.styleManager.updateTheme.callCount, 1);
      });

      it('should call instance.styleManager.updateTheme() with instance.theme', () => {
        assert.strictEqual(instance.styleManager.updateTheme.calledWith(instance.theme), true);
      });
    });
  });
});
