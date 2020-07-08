import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import useId, { IdContext } from './unstable_useId';

const TestComponent = ({ id: idProp }) => {
  const id = useId(idProp);
  return <span>{id}</span>;
};

const TestContextComponent = ({ id }) => {
  return (
    <IdContext.Provider value={{ generateId: () => 'context-id' }}>
      <TestComponent id={id} />
    </IdContext.Provider>
  );
};

TestComponent.propTypes = {
  id: PropTypes.string,
};

describe('unstable_useId', () => {
  const render = createClientRender();

  it('returns the provided ID', () => {
    const { getByText, setProps } = render(<TestComponent id="some-id" />);

    expect(getByText('some-id')).not.to.equal(null);

    setProps({ id: 'another-id' });
    expect(getByText('another-id')).not.to.equal(null);
  });

  it("generates an ID if one isn't provided", () => {
    const { getByText, setProps } = render(<TestComponent />);

    expect(getByText(/^mui-[0-9]+$/)).not.to.equal(null);

    setProps({ id: 'another-id' });
    expect(getByText('another-id')).not.to.equal(null);
  });

  it('generates an ID using generateId if provided', () => {
    const { getByText, setProps } = render(<TestContextComponent />);

    expect(getByText('context-id')).not.to.equal(null);

    setProps({ id: 'a-new-id' });
    expect(getByText('a-new-id')).not.to.equal(null);
  });

  it('override when using generateId', () => {
    const { getByText, setProps } = render(<TestContextComponent id="attached-id" />);

    expect(getByText('attached-id')).not.to.equal(null);

    setProps({ id: 'a-new-id' });
    expect(getByText('a-new-id')).not.to.equal(null);
  });
});
