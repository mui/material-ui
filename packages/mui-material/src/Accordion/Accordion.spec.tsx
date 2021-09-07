import * as React from 'react';
import Accordion from '@mui/material/Accordion';

function testOnChange() {
  function handleAccordionChange(event: React.SyntheticEvent, tabsValue: unknown) {}
  <Accordion onChange={handleAccordionChange}>
    <div />
  </Accordion>;

  function handleElementChange(event: React.ChangeEvent) {}
  <Accordion
    // @ts-expect-error internally it's whatever even lead to a change in value
    onChange={handleElementChange}
  >
    <div />
  </Accordion>;
}
