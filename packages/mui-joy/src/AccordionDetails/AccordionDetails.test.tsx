import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance, fireEvent } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Accordion from '@mui/joy/Accordion';
import AccordionSummary from '@mui/joy/AccordionSummary';
import AccordionDetails, { accordionDetailsClasses as classes } from '@mui/joy/AccordionDetails';

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
      const { getByRole } = render(
        <Accordion>
          <AccordionDetails>
            <a href="/foo">Hello</a>
            <input />
          </AccordionDetails>
        </Accordion>,
      );

      expect(getByRole('link')).to.have.property('tabIndex', -1);
      expect(getByRole('textbox')).to.have.property('tabIndex', -1);
    });

    it('[expanded] interactive content should not have tab index 0', () => {
      const { getByRole } = render(
        <Accordion expanded>
          <AccordionDetails>
            <a href="/foo">Hello</a>
            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
            <input type="text" role="textbox" />
          </AccordionDetails>
        </Accordion>,
      );

      expect(getByRole('link')).to.have.property('tabIndex', 0);
      expect(getByRole('textbox')).to.have.property('tabIndex', 0);
    });

    it('interactive content should preserve the tab index when closed', () => {
      const { getByRole } = render(
        <Accordion defaultExpanded>
          <AccordionSummary>title</AccordionSummary>
          <AccordionDetails>
            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
            <input tabIndex={2} type="text" role="textbox" />
          </AccordionDetails>
        </Accordion>,
      );

      expect(getByRole('button')).to.have.attribute('aria-expanded', 'true');
      expect(getByRole('textbox')).to.have.property('tabIndex', 2);

      fireEvent.click(getByRole('button')); // close

      expect(getByRole('button')).to.have.attribute('aria-expanded', 'false');
      expect(getByRole('textbox')).to.have.property('tabIndex', -1);

      fireEvent.click(getByRole('button')); // reopen

      expect(getByRole('button')).to.have.attribute('aria-expanded', 'true');
      expect(getByRole('textbox')).to.have.property('tabIndex', 2);
    });
  });
});
