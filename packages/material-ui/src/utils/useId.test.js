import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import useId from './useId';

const TestComponent = ({ id: idProp }) => {
  const id = useId(idProp);
  return <span>{id}</span>;
};

TestComponent.propTypes = {
  id: PropTypes.string,
};

describe('useId', () => {
  const render = createClientRender();

  it('returns the provided ID', () => {
    const { getByText } = render(<TestComponent id="some-id" />);

    expect(getByText('some-id')).to.not.be.null;
  });

  it("generates an ID if one isn't provided", () => {
    const { getByText } = render(<TestComponent />);

    expect(getByText(/^mui-[0-9]+$/)).to.not.be.null;
  });
});
