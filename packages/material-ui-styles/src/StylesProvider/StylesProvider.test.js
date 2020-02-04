import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { assert } from 'chai';
import { create, SheetsRegistry } from 'jss';
import { createMount } from '@material-ui/core/test-utils';
import StylesProvider, { StylesContext } from './StylesProvider';
import makeStyles from '../makeStyles';
import createGenerateClassName from '../createGenerateClassName';
import consoleErrorMock from 'test/utils/consoleErrorMock';

function Test() {
  const options = React.useContext(StylesContext);
  return <span options={options} />;
}

function getOptions(wrapper) {
  return wrapper.find('span').props().options;
}

describe('StylesProvider', () => {
  let mount;
  let generateClassName;

  before(() => {
    mount = createMount({ strict: true });
  });

  beforeEach(() => {
    generateClassName = createGenerateClassName();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should provide the options', () => {
    const wrapper = mount(
      <StylesProvider disableGeneration>
        <Test />
      </StylesProvider>,
    );
    assert.strictEqual(getOptions(wrapper).disableGeneration, true);
  });

  it('should merge the themes', () => {
    const wrapper = mount(
      <StylesProvider>
        <StylesProvider disableGeneration>
          <Test />
        </StylesProvider>
      </StylesProvider>,
    );
    assert.strictEqual(getOptions(wrapper).disableGeneration, true);
  });

  it('should handle injectFirst', () => {
    const wrapper = mount(
      <StylesProvider injectFirst>
        <Test />
      </StylesProvider>,
    );
    assert.strictEqual(getOptions(wrapper).jss.options.insertionPoint.nodeType, 8);
  });

  describe('server-side', () => {
    // Only run the test on node.
    if (!/jsdom/.test(window.navigator.userAgent)) {
      return;
    }

    const useStyles = makeStyles({ root: { display: 'flex' } });
    const Button = props => {
      const classes = useStyles();
      return <button type="button" className={classes.root} {...props} />;
    };

    function assertRendering(markup, sheetsRegistry) {
      assert.notStrictEqual(markup.match('Hello World'), null);
      assert.strictEqual(sheetsRegistry.registry.length, 1);
      assert.strictEqual(sheetsRegistry.toString().length > 10, true);
      assert.deepEqual(sheetsRegistry.registry[0].classes, {
        root: 'makeStyles-root-1',
      });
    }

    it('should be able to extract the styles', () => {
      const sheetsRegistry = new SheetsRegistry();

      const markup = ReactDOMServer.renderToString(
        <StylesProvider
          sheetsManager={new Map()}
          sheetsRegistry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <Button>Hello World</Button>
        </StylesProvider>,
      );

      assertRendering(markup, sheetsRegistry);
    });

    it('should be able to cache the sheets between two requests', () => {
      const sheetsCache = new Map();

      const sheetsRegistry1 = new SheetsRegistry();
      const markup1 = ReactDOMServer.renderToString(
        <StylesProvider
          sheetsManager={new Map()}
          sheetsCache={sheetsCache}
          sheetsRegistry={sheetsRegistry1}
          generateClassName={generateClassName}
        >
          <Button>Hello World</Button>
        </StylesProvider>,
      );
      assertRendering(markup1, sheetsRegistry1);

      const sheetsRegistry2 = new SheetsRegistry();
      const markup2 = ReactDOMServer.renderToString(
        <StylesProvider
          sheetsManager={new Map()}
          sheetsCache={sheetsCache}
          sheetsRegistry={sheetsRegistry2}
          generateClassName={generateClassName}
        >
          <Button>Hello World</Button>
        </StylesProvider>,
      );
      assertRendering(markup2, sheetsRegistry2);

      // The most important check:
      assert.strictEqual(sheetsRegistry1.registry[0], sheetsRegistry2.registry[0]);
    });
  });

  it('should accept a custom JSS instance', () => {
    const jss = create();
    const wrapper = mount(
      <StylesProvider jss={jss}>
        <Test />
      </StylesProvider>,
    );
    assert.strictEqual(getOptions(wrapper).jss, jss);
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should support invalid input', () => {
      const jss = create();
      mount(
        <StylesProvider injectFirst jss={jss}>
          <Test />
        </StylesProvider>,
      );
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(
        consoleErrorMock.args()[0][0],
        'you cannot use the jss and injectFirst props at the same time',
      );
    });
  });
});
