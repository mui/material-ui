import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import Accordion from '@mui/joy/Accordion';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionDetails, { accordionDetailsClasses as classes } from '@mui/joy/AccordionDetails';
import describeConformance from '../../test/describeConformance';

describe('<AccordionDetails />', () => {
  const { render } = createRenderer();

  describeConformance(<AccordionDetails />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyAccordionDetails',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['classesRoot', 'componentsProp', 'themeVariants'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
      content: {
        expectedClassName: classes.content,
      },
    },
  }));

  describe('hidden attribute', () => {
    it('[initial] content should be hidden when accordion is closed', () => {
      render(
        <Accordion>
          <AccordionDetails data-testid="details">
            <a href="/foo">Hello</a>
            <input />
          </AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByTestId('details')).to.have.attribute('hidden');
    });

    it('[expanded] content should be visible when accordion is open', () => {
      render(
        <Accordion expanded>
          <AccordionDetails data-testid="details">
            <a href="/foo">Hello</a>
            <input />
          </AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByTestId('details')).to.not.have.attribute('hidden');
    });

    it('content should toggle visibility when accordion is expanded/collapsed', () => {
      render(
        <Accordion defaultExpanded>
          <AccordionSummary>title</AccordionSummary>
          <AccordionDetails data-testid="details">
            <input />
          </AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByTestId('details')).to.not.have.attribute('hidden'); // expanded by default

      fireEvent.click(screen.getByRole('button')); // collapse
      expect(screen.getByTestId('details')).to.have.attribute('hidden');

      fireEvent.click(screen.getByRole('button')); // expand
      expect(screen.getByTestId('details')).to.not.have.attribute('hidden');
    });

    it('content should remain visible after explicit toggle', () => {
      render(
        <Accordion>
          <AccordionSummary>title</AccordionSummary>
          <AccordionDetails data-testid="details">
            <input />
          </AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByTestId('details')).to.have.attribute('hidden'); // initially hidden

      fireEvent.click(screen.getByRole('button')); // open
      expect(screen.getByTestId('details')).to.not.have.attribute('hidden'); // now visible

      fireEvent.click(screen.getByRole('button')); // close
      expect(screen.getByTestId('details')).to.have.attribute('hidden'); // hidden again
    });
  });
});
