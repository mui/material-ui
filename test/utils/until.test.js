import * as React from 'react';
import { expect } from 'chai';
import PropTypes from 'prop-types';
import { shallow } from 'enzyme';
import until from './until';

const Div = () => <div />;
const hoc = (Component) => () => <Component />;

describe('until', () => {
  it('shallow renders the current wrapper one level deep', () => {
    const EnhancedDiv = hoc(Div);
    const wrapper = until.call(shallow(<EnhancedDiv />), 'Div');
    expect(wrapper.contains(<div />)).to.equal(true);
  });

  it('shallow renders the current wrapper several levels deep', () => {
    const EnhancedDiv = hoc(hoc(hoc(Div)));
    const wrapper = until.call(shallow(<EnhancedDiv />), 'Div');
    expect(wrapper.contains(<div />)).to.equal(true);
  });

  it('stops shallow rendering when the wrapper is empty', () => {
    const nullHoc = () => () => null;
    const EnhancedDiv = nullHoc();
    const wrapper = until.call(shallow(<EnhancedDiv />), 'Div');
    expect(wrapper.html()).to.equal(null);
  });

  it('shallow renders as much as possible when no selector is provided', () => {
    const EnhancedDiv = hoc(hoc(Div));
    const wrapper = until.call(shallow(<EnhancedDiv />));
    expect(wrapper.contains(<div />)).to.equal(true);
  });

  it('shallow renders the current wrapper even if the selector never matches', () => {
    const EnhancedDiv = hoc(Div);
    const wrapper = until.call(shallow(<EnhancedDiv />), 'NotDiv');
    expect(wrapper.contains(<div />)).to.equal(true);
  });

  it('stops shallow rendering when it encounters a HTML element', () => {
    const wrapper = until.call(
      shallow(
        <div>
          <Div />
        </div>,
      ),
      'Div',
    );
    expect(
      wrapper.contains(
        <div>
          <Div />
        </div>,
      ),
    ).to.equal(true);
  });

  it('throws when until called on an empty wrapper', () => {
    expect(() => {
      until.call(shallow(<Div />).find('Foo'), 'div');
    }).to.throw(Error);
  });

  it('shallow renders non-root wrappers', () => {
    const Container = () => (
      <div>
        <Div />
      </div>
    );
    const wrapper = until.call(shallow(<Container />).find(Div));
    expect(wrapper.contains(<div />)).to.equal(true);
  });

  // eslint-disable-next-line react/prefer-stateless-function
  class Foo extends React.Component {
    render() {
      return <Div />;
    }
  }

  Foo.contextTypes = {
    quux: PropTypes.bool.isRequired,
  };

  it('context propagation passes down context from the root component', () => {
    const EnhancedFoo = hoc(Foo);
    const options = { context: { quux: true } };
    const wrapper = until.call(shallow(<EnhancedFoo />, options), 'Foo', options);
    expect(wrapper.context('quux')).to.equal(true);
    expect(wrapper.contains(<Div />)).to.equal(true);
  });

  class Bar extends React.Component {
    static childContextTypes = { quux: PropTypes.bool };

    getChildContext = () => ({ quux: true });

    render() {
      return <Foo />;
    }
  }

  it('context propagation passes down context from an intermediary component', () => {
    const EnhancedBar = hoc(Bar);
    const wrapper = until.call(shallow(<EnhancedBar />), 'Foo');
    expect(wrapper.context('quux')).to.equal(true);
    expect(wrapper.contains(<Div />)).to.equal(true);
  });
});
