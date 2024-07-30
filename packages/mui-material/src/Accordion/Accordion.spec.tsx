import * as React from 'react';
import { expectType } from '@mui/types';
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

const CustomComponent: React.FC<{ prop1: string; prop2: number }> = function CustomComponent() {
  return <div />;
};

const requiredProps = {
  children: <div />,
};

const AccordionComponentTest = () => {
  return (
    <div>
      <Accordion {...requiredProps} />
      <Accordion {...requiredProps} component="legend" />
      <Accordion
        {...requiredProps}
        component="a"
        href="test"
        onClick={(event) => {
          expectType<React.MouseEvent<HTMLAnchorElement, MouseEvent>, typeof event>(event);
        }}
      />

      {/* @ts-expect-error */}
      <Accordion {...requiredProps} component="a" incorrectAttribute="url" />
      {/* @ts-expect-error */}
      <Accordion {...requiredProps} component="div" href="url" />
      <Accordion {...requiredProps} component={CustomComponent} prop1="1" prop2={12} />
      {/* @ts-expect-error */}
      <Accordion {...requiredProps} component={CustomComponent} prop1="1" />
      {/* @ts-expect-error */}
      <Accordion {...requiredProps} component={CustomComponent} prop1="1" prop2="12" />
    </div>
  );
};

// slotProps type test. Changing heading level.
<Accordion slotProps={{ heading: { component: 'h4' } }}>
  <div />
</Accordion>;
