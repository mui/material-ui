import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { expect } from 'chai';
import { spy, match } from 'sinon';
import { create, SheetsRegistry } from 'jss';
import { createRenderer, strictModeDoubleLoggingSuppressed } from '@mui/internal-test-utils';
import StylesProvider, { StylesContext } from './StylesProvider';
import makeStyles from '../makeStyles';
import createGenerateClassName from '../createGenerateClassName';

describe('StylesProvider', () => {
  const { render } = createRenderer();
  let generateClassName;
  let getContext;

  function Test() {
    const context = React.useContext(StylesContext);

    React.useEffect(() => {
      getContext(context);
    }, [context]);

    return null;
  }

  beforeEach(() => {
    generateClassName = createGenerateClassName();
    getContext = spy();
  });

  it('should provide the context', () => {
    render(
      <StylesProvider disableGeneration>
        <Test />
      </StylesProvider>,
    );

    expect(getContext.alwaysCalledWith(match({ disableGeneration: true }))).to.equal(true);
  });

  it('should merge the themes', () => {
    render(
      <StylesProvider>
        <StylesProvider disableGeneration>
          <Test />
        </StylesProvider>
      </StylesProvider>,
    );

    expect(getContext.alwaysCalledWith(match({ disableGeneration: true }))).to.equal(true);
  });

  it('should handle injectFirst', () => {
    render(
      <StylesProvider injectFirst>
        <Test />
      </StylesProvider>,
    );

    expect(
      getContext.alwaysCalledWith(match({ jss: { options: { insertionPoint: { nodeType: 8 } } } })),
    ).to.equal(true);
  });

  describe('server-side', () => {
    before(function beforeHook() {
      // Only run the test on node.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }
    });

    const useStyles = makeStyles({ root: { display: 'flex' } });
    function Button(props) {
      const classes = useStyles();
      return <button type="button" className={classes.root} {...props} />;
    }

    function assertRendering(markup, sheetsRegistry) {
      expect(markup.match('Hello World')).not.to.equal(null);
      expect(sheetsRegistry.registry.length).to.equal(1);
      expect(sheetsRegistry.toString().length > 10).to.equal(true);
      expect(sheetsRegistry.registry[0].classes).to.deep.equal({
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
      expect(sheetsRegistry1.registry[0]).to.equal(sheetsRegistry2.registry[0]);
    });
  });

  it('should accept a custom JSS instance', () => {
    const jss = create();
    render(
      <StylesProvider jss={jss}>
        <Test />
      </StylesProvider>,
    );

    expect(getContext.alwaysCalledWith(match({ jss }))).to.equal(true);
  });

  describe('warnings', () => {
    it('should support invalid input', () => {
      const jss = create();
      expect(() => {
        render(
          <StylesProvider injectFirst jss={jss}>
            <Test />
          </StylesProvider>,
        );
      }).toErrorDev([
        'MUI: You cannot use the jss and injectFirst props at the same time',
        !strictModeDoubleLoggingSuppressed &&
          'MUI: You cannot use the jss and injectFirst props at the same time',
      ]);
    });
  });
});
