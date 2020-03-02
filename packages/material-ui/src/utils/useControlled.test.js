import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import useControlled from './useControlled';

const TestComponent = ({ value: valueProp, defaultValue, children }) => {
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: 'TestComponent',
  });
  return children({ value, setValue });
};

describe('useControlled', () => {
  const render = createClientRender();

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  it('works correctly when is not controlled', () => {
    let valueState;
    let setValueState;
    render(
      <TestComponent defaultValue={1}>
        {({ value, setValue }) => {
          valueState = value;
          setValueState = setValue;
          return null;
        }}
      </TestComponent>,
    );
    expect(valueState).to.equal(1);
    setValueState(2);
    expect(valueState).to.equal(2);
  });

  it('works correctly when is controlled', () => {
    let valueState;
    render(
      <TestComponent value={1}>
        {({ value }) => {
          valueState = value;
          return null;
        }}
      </TestComponent>,
    );
    expect(valueState).to.equal(1);
  });

  it('warns when switching from uncontrolled to controlled', () => {
    const { setProps } = render(<TestComponent>{() => null}</TestComponent>);
    expect(consoleErrorMock.callCount()).to.equal(0);
    setProps({ value: 'foobar' });
    expect(consoleErrorMock.callCount()).to.equal(1);
    expect(consoleErrorMock.args()[0][0]).to.contains(
      'A component is changing an uncontrolled TestComponent to be controlled.',
    );
  });

  it('warns when switching from controlled to uncontrolled', () => {
    const { setProps } = render(<TestComponent value="foobar">{() => null}</TestComponent>);
    expect(consoleErrorMock.callCount()).to.equal(0);
    setProps({ value: undefined });
    expect(consoleErrorMock.callCount()).to.equal(1);
    expect(consoleErrorMock.args()[0][0]).to.contains(
      'A component is changing a controlled TestComponent to be uncontrolled.',
    );
  });

  it('warns when changing the defaultValue prop after initial rendering', () => {
    const { setProps } = render(<TestComponent>{() => null}</TestComponent>);
    expect(consoleErrorMock.callCount()).to.equal(0);
    setProps({ defaultValue: 1 });
    expect(consoleErrorMock.callCount()).to.equal(1);
    expect(consoleErrorMock.args()[0][0]).to.contains(
      'A component is changing the default value of an uncontrolled TestComponent after being initialized. ',
    );
  });
});
