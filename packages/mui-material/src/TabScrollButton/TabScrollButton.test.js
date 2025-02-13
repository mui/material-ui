import * as React from 'react';
import { expect } from 'chai';
import { createRenderer } from '@mui/internal-test-utils';
import TabScrollButton, { tabScrollButtonClasses as classes } from '@mui/material/TabScrollButton';
import { createSvgIcon } from '@mui/material/utils';
import describeConformance from '../../test/describeConformance';

const ArrowBackIcon = createSvgIcon(<path d="M3 3h18v18H3z" />, 'ArrowBack');
const ArrowForwardIcon = createSvgIcon(<path d="M3 3h18v18H3z" />, 'ArrowForward');

describe('<TabScrollButton />', () => {
  const defaultProps = {
    direction: 'left',
    orientation: 'horizontal',
  };
  const { render } = createRenderer();

  describeConformance(<TabScrollButton {...defaultProps} />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiTabScrollButton',
    testVariantProps: { orientation: 'vertical' },
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp'],
  }));

  it('should render as a button with the root class', () => {
    const { container } = render(<TabScrollButton {...defaultProps} />);
    const button = container.firstChild;
    expect(button).to.have.class(classes.root);
  });

  describe('prop: disabled', () => {
    it('should render with a opacity of 0', () => {
      const { container } = render(<TabScrollButton {...defaultProps} disabled />);
      const button = container.firstChild;
      expect(button).to.have.class(classes.disabled);
    });
  });

  describe('prop: direction', () => {
    it('should render with the left icon', () => {
      const { getAllByTestId } = render(
        <TabScrollButton {...defaultProps} {...defaultProps} direction="left" disabled />,
      );
      expect(getAllByTestId('KeyboardArrowLeftIcon').length).to.equal(1);
    });

    it('should render with the right icon', () => {
      const { getAllByTestId } = render(
        <TabScrollButton {...defaultProps} {...defaultProps} direction="right" disabled />,
      );
      expect(getAllByTestId('KeyboardArrowRightIcon').length).to.equal(1);
    });
  });

  it('should render with the custom start icon', () => {
    const { getAllByTestId } = render(
      <TabScrollButton
        {...defaultProps}
        direction="left"
        disabled
        slots={{
          StartScrollButtonIcon: ArrowBackIcon,
        }}
      />,
    );

    expect(getAllByTestId('ArrowBackIcon')).to.have.lengthOf(1);
  });

  it('should render with the custom end icon', () => {
    const { getAllByTestId } = render(
      <TabScrollButton
        {...defaultProps}
        direction="right"
        disabled
        slots={{
          EndScrollButtonIcon: ArrowForwardIcon,
        }}
      />,
    );

    expect(getAllByTestId('ArrowForwardIcon')).to.have.lengthOf(1);
  });
});
