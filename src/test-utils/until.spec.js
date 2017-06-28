// @flow

import assert from 'assert';
import React from 'react';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import until from './until';

const Div = () => <div />;
const hoc = Component => () => <Component />;

describe('until', () => {
  it('shallow renders the current wrapper one level deep', () => {
    const EnhancedDiv = hoc(Div);
    const wrapper = until.call(shallow(<EnhancedDiv />), 'Div');
    assert.strictEqual(wrapper.contains(<div />), true);
  });

  it('shallow renders the current wrapper several levels deep', () => {
    const EnhancedDiv = hoc(hoc(hoc(Div)));
    const wrapper = until.call(shallow(<EnhancedDiv />), 'Div');
    assert.strictEqual(wrapper.contains(<div />), true);
  });

  it('stops shallow rendering when the wrapper is empty', () => {
    const nullHoc = () => () => null;
    const EnhancedDiv = nullHoc();
    const wrapper = until.call(shallow(<EnhancedDiv />), 'Div');
    assert.strictEqual(wrapper.html(), null);
  });

  it('shallow renders as much as possible when no selector is provided', () => {
    const EnhancedDiv = hoc(hoc(Div));
    const wrapper = until.call(shallow(<EnhancedDiv />));
    assert.strictEqual(wrapper.contains(<div />), true);
  });

  it('shallow renders the current wrapper even if the selector never matches', () => {
    const EnhancedDiv = hoc(Div);
    const wrapper = until.call(shallow(<EnhancedDiv />), 'NotDiv');
    assert.strictEqual(wrapper.contains(<div />), true);
  });

  it('stops shallow rendering when it encounters a DOM element', () => {
    const wrapper = until.call(
      shallow(
        <div>
          <Div />
        </div>,
      ),
      'Div',
    );
    assert.strictEqual(
      wrapper.contains(
        <div>
          <Div />
        </div>,
      ),
      true,
    );
  });

  it('throws when iassert.strictEqual called on an empty wrapper', () => {
    assert.throws(
      () => {
        until.call(shallow(<Div />).find('Foo'), 'div');
      },
      Error,
      'Method “until” is only meant to be run on a single node. 0 found instead.',
    );
  });

  it('shallow renders non-root wrappers', () => {
    const Container = () =>
      <div>
        <Div />
      </div>;
    const wrapper = until.call(shallow(<Container />).find(Div));
    assert.strictEqual(wrapper.contains(<div />), true);
  });

  const Foo = () => <Div />;
  Foo.contextTypes = { quux: PropTypes.bool.isRequired };

  class Bar extends React.Component {
    static childContextTypes = { quux: PropTypes.bool };
    getChildContext = () => ({ quux: true });
    render = () => <Foo />;
  }

  it('context propagation passes down context from the root component', () => {
    const EnhancedFoo = hoc(Foo);
    const wrapper = until.call(shallow(<EnhancedFoo />, { context: { quux: true } }), 'Foo');
    assert.strictEqual(wrapper.context('quux'), true);
    assert.strictEqual(wrapper.contains(<Div />), true);
  });

  it('context propagation passes down context from an intermediary component', () => {
    const EnhancedBar = hoc(Bar);
    const wrapper = until.call(shallow(<EnhancedBar />), 'Foo');
    assert.strictEqual(wrapper.context('quux'), true);
    assert.strictEqual(wrapper.contains(<Div />), true);
  });
});
