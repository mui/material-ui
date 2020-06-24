import * as React from 'react';
import Accordion from '@material-ui/core/Accordion';

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

  // this is structurally equal to `React.SyntheticEvent`
  // It works but we don't recommend it since it has some non-structural implications: changeEvent.target === changeEvent.currentTarget
  function handleChange(event: React.ChangeEvent<{}>) {}
  <Accordion onChange={handleChange}>
    <div />
  </Accordion>;
}
