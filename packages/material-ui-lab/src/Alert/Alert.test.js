import React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import Alert from './Alert';

describe('<Alert />', () => {
  const render = createClientRender({ strict: true });
  let classes;
  const defaultProps = {
    name: 'alert-test',
    value: 2,
  };

  it('should render', () => {
    const { container } = render(<Alert {...defaultProps} />);

    expect(container.firstChild).to.not.have.class(classes.root);
  });
});
