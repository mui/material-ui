import React from 'react';
import enzyme from 'enzyme/build/index';
import Adapter from 'enzyme-adapter-react-16';
import consoleError from './consoleError';
import { useIsSsr } from '@material-ui/core/test-utils/RenderMode';
import chai from 'chai';
import chaiDom from 'chai-dom';
import { prettyDOM } from '@testing-library/react';

chai.use(chaiDom);
chai.use((chaiAPI, utils) => {
  // better diff view for expect(element).to.equal(document.activeElement)
  chai.Assertion.addProperty('focused', function elementIsFocused() {
    const element = utils.flag(this, 'object');
    this.assert(
      element === document.activeElement,
      'expected #{exp} to be focused, but #{act} was instead',
      'expected #{exp} not to be focused',
      prettyDOM(element),
      prettyDOM(document.activeElement),
    );
  });
});

consoleError();

const useActualLayoutEffect = React.useLayoutEffect;

/* eslint-disable react-hooks/rules-of-hooks */
/**
 * during tests we are in a jsdom environment but will also call ReactDOM.renderToString
 * which triggers useLayoutEffect server warnings. On an actual server there's
 * no jsdom
 */
// eslint-disable-next-line camelcase
React.useLayoutEffect = function unstable_useIsomorphicLayoutEffect(fn, deps) {
  const isSsr = useIsSsr();
  // RulesOfHooks violation but this the context needs to be invariant anyway
  const useEffect = isSsr ? React.useEffect : useActualLayoutEffect;
  return useEffect(fn, deps);
};
/* eslint-enable react-hooks/rules-of-hooks */

enzyme.configure({ adapter: new Adapter() });
