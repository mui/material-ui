import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import {
  describeConformance,
  ErrorBoundary,
  act,
  createRenderer,
  fireEvent,
  screen,
} from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Select, { selectClasses as classes } from '@mui/joy/Select';
import Option from '@mui/joy/Option';

describe('Joy <Select />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  describeConformance(<Select value="" />, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLDivElement,
    muiName: 'JoySelect',
    skip: ['classesRoot', 'propsSpread', 'componentProp', 'componentsProp'],
  }));

  it('should be able to mount the component', () => {
    render(
      <Select value={10}>
        <Option value="">
          <em>None</em>
        </Option>
        <Option value={10}>Ten</Option>
        <Option value={20}>Twenty</Option>
        <Option value={30}>Thirty</Option>
      </Select>,
    );

    expect(screen.getByRole('button')).to.have.text('Ten');
  });

  specify('the trigger is in tab order', () => {
    const { getByRole } = render(
      <Select value="">
        <Option value="">None</Option>
      </Select>,
    );

    expect(getByRole('button')).to.have.property('tabIndex', 0);
  });

  it('should accept null child', () => {
    render(
      <Select defaultListboxOpen value={10}>
        {null}
        <Option value={10}>Ten</Option>
      </Select>,
    );
  });

  it('should pass "name" as part of the event.target for onBlur', () => {
    const handleBlur = stub().callsFake((event) => event.target.name);
    const { getByRole } = render(
      <Select
        componentsProps={{
          button: {
            onBlur: handleBlur,
            name: 'blur-testing',
          },
        }}
        value=""
      >
        <Option value="">none</Option>
      </Select>,
    );
    const button = getByRole('button');
    act(() => {
      button.focus();
    });

    act(() => {
      button.blur();
    });

    expect(handleBlur.callCount).to.equal(1);
    expect(handleBlur.firstCall.returnValue).to.equal('blur-testing');
  });

  it('should call onClose when the same option is selected', () => {
    const handleChange = spy();
    const handleClose = spy();
    render(
      <Select defaultListboxOpen onChange={handleChange} onClose={handleClose} value="second">
        <Option value="first" />
        <Option value="second" />
      </Select>,
    );

    act(() => {
      screen.getByRole('option', { selected: true }).click();
    });

    expect(handleChange.callCount).to.equal(0);
    expect(handleClose.callCount).to.equal(1);
  });
});
