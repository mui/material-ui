import * as React from 'react';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '../test-utils/describeConformance';
import Paper from '../Paper';
import SnackbarContent from './SnackbarContent';

describe('<SnackbarContent />', () => {
  const mount = createMount();
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<SnackbarContent message="message" />);
  });

  describeConformance(<SnackbarContent message="conform?" />, () => ({
    classes,
    inheritComponent: Paper,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));

  describe('prop: action', () => {
    it('should render the action', () => {
      const action = <span>action</span>;
      const { container } = render(
        <SnackbarContent message="message" data-testid="action" action={action} />,
      );
      expect(container.querySelector(`.${classes.action}`)).to.have.class(classes.action);
      expect(container.querySelector(`.${classes.action}`)).to.contain('span');
    });

    it('should render an array of elements', () => {
      const action0 = <span key={0}>action0</span>;
      const action1 = <span key={1}>action1</span>;
      const { getByText } = render(
        <SnackbarContent message="message" action={[action0, action1]} />,
      );
      expect(getByText('action0')).not.to.equal(null);
      expect(getByText('action1')).not.to.equal(null);
    });
  });

  describe('prop: message', () => {
    it('should render the message', () => {
      const message = 'message prop text';
      const { getByRole } = render(<SnackbarContent message={<span>{message}</span>} />);
      expect(getByRole('alert')).to.have.text(message);
    });
  });

  describe('prop: role', () => {
    it('renders the default role', () => {
      const { getByRole } = render(<SnackbarContent message="alert message" />);
      expect(getByRole('alert')).to.have.text('alert message');
    });

    it('can override the role', () => {
      const { queryByRole } = render(
        <SnackbarContent message="alertdialog message" role="alertdialog" />,
      );
      expect(queryByRole('alertdialog')).to.have.text('alertdialog message');
    });
  });
});
