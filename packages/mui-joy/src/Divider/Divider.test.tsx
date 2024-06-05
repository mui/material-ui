import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import Divider, { dividerClasses as classes } from '@mui/joy/Divider';
import describeConformance from '../../test/describeConformance';

describe('Joy <Divider />', () => {
  const { render } = createRenderer();

  describeConformance(<Divider />, () => ({
    classes,
    inheritComponent: 'hr',
    render,
    muiName: 'JoyDivider',
    ThemeProvider,
    refInstanceof: window.HTMLHRElement,
    testComponentPropWith: 'div',
    testVariantProps: { orientation: 'vertical' },
    skip: ['componentsProp', 'classesRoot'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));

  describe('prop: children', () => {
    it('should render with the children', () => {
      const text = 'test content';
      const { container } = render(<Divider>{text}</Divider>);
      expect(container.firstChild?.textContent).to.equal(text);
    });
  });

  describe('prop: inset', () => {
    it('should add context class', () => {
      const { container } = render(<Divider inset="context" />);
      expect(container.firstChild).to.have.class(classes.insetContext);
    });
  });

  describe('role', () => {
    it('avoids adding implicit aria semantics', () => {
      const { container } = render(<Divider />);
      expect(container.firstChild).not.to.have.attribute('role');
    });

    it('adds a proper role if none is specified', () => {
      const { container } = render(<Divider component="div" />);
      expect(container.firstChild).to.have.attribute('role', 'separator');
    });

    it('overrides the computed role with the provided one', () => {
      // presentation is the only valid aria role
      const { container } = render(<Divider role="presentation" />);
      expect(container.firstChild).to.have.attribute('role', 'presentation');
    });
  });
});
