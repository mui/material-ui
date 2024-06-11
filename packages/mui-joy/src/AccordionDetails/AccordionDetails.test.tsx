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

  describe('tab index', () => {
    it('[initial] interactive content should have tab index -1', () => {
      render(
        <Accordion>
          <AccordionDetails>
            <a href="/foo" data-testid="link">
              Hello
            </a>
            <input data-testid="textbox" />
          </AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByTestId('link')).to.have.property('tabIndex', -1);
      expect(screen.getByTestId('textbox')).to.have.property('tabIndex', -1);
    });

    it('[expanded] interactive content should not have tab index 0', () => {
      render(
        <Accordion expanded>
          <AccordionDetails>
            <a href="/foo" data-testid="link">
              Hello
            </a>
            <input data-testid="textbox" />
          </AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByTestId('link')).to.have.property('tabIndex', 0);
      expect(screen.getByTestId('textbox')).to.have.property('tabIndex', 0);
    });

    it('interactive content should preserve the tab index when closed', () => {
      render(
        <Accordion defaultExpanded>
          <AccordionSummary>title</AccordionSummary>
          <AccordionDetails>
            <input tabIndex={2} data-testid="textbox" />
          </AccordionDetails>
        </Accordion>,
      );

      expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'true');
      expect(screen.getByTestId('textbox')).to.have.property('tabIndex', 2);

      fireEvent.click(screen.getByRole('button')); // close

      expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'false');
      expect(screen.getByTestId('textbox')).to.have.property('tabIndex', -1);

      fireEvent.click(screen.getByRole('button')); // reopen

      expect(screen.getByRole('button')).to.have.attribute('aria-expanded', 'true');
      expect(screen.getByTestId('textbox')).to.have.property('tabIndex', 2);
    });
  });
});
