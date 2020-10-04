import * as React from 'react';
import {
  createClientRender,
  getClasses,
  createMount,
  describeConformance,
  screen,
} from 'test/utils';
import { expect } from 'chai';
import Button from '@material-ui/core/Button';
import LoadingButton from './LoadingButton';

describe('<LoadingButton />', () => {
  const mount = createMount();
  const render = createClientRender();
  let classes;

  before(() => {
    classes = getClasses(<LoadingButton>Hello World</LoadingButton>);
  });

  describeConformance(<LoadingButton>Conformance?</LoadingButton>, () => ({
    classes,
    inheritComponent: Button,
    mount,
    refInstanceof: window.HTMLButtonElement,
    skip: ['componentProp'],
  }));

  it('is in tab-order by default', () => {
    render(<LoadingButton />);

    expect(screen.getByRole('button')).to.have.property('tabIndex', 0);
  });

  describe('prop: pending', () => {
    it('disables the button', () => {
      render(<LoadingButton pending />);

      const button = screen.getByRole('button');
      expect(button).to.have.property('tabIndex', -1);
      expect(button).to.have.property('disabled', true);
    });

    it('cannot be enabled while `pending`', () => {
      render(<LoadingButton disabled={false} pending />);

      expect(screen.getByRole('button')).to.have.property('disabled', true);
    });
  });

  describe('prop: pendingIndicator', () => {
    it('is not rendered by default', () => {
      render(<LoadingButton pendingIndicator="pending">Test</LoadingButton>);

      expect(screen.getByRole('button')).to.have.text('Test');
    });

    it('is rendered before the children when `pending`', () => {
      render(
        <LoadingButton pendingIndicator="pending..." pending>
          Test
        </LoadingButton>,
      );

      expect(screen.getByRole('button')).to.have.text('pending...Test');
    });
  });
});
