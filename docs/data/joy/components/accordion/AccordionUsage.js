import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import ListDivider from '@mui/joy/ListDivider';

export default function ButtonUsage() {
  return (
    <JoyUsageDemo
      componentName="AccordionGroup"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'plain',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'neutral',
        },
        {
          propName: 'size',
          knob: 'radio',
          options: ['sm', 'md', 'lg'],
          defaultValue: 'md',
        },
        {
          propName: 'disabled',
          knob: 'switch',
          defaultValue: false,
        },
        {
          propName: 'children',
          defaultValue: `<Accordion>
    <AccordionSummary>Title</AccordionSummary>
    <AccordionDetails>Content</AccordionDetails>
  </Accordion>`,
        },
      ]}
      renderDemo={({ disabled, ...props }) => (
        <AccordionGroup {...props} sx={{ my: 3 }}>
          <Accordion disabled={disabled}>
            <AccordionSummary>Personal Information</AccordionSummary>
            <AccordionDetails>test</AccordionDetails>
          </Accordion>
          <ListDivider />
          <Accordion disabled={disabled}>
            <AccordionSummary>Billing Address</AccordionSummary>
            <AccordionDetails>test</AccordionDetails>
          </Accordion>
          <ListDivider />
          <Accordion disabled={disabled}>
            <AccordionSummary>Shipping Address</AccordionSummary>
            <AccordionDetails>test</AccordionDetails>
          </Accordion>
        </AccordionGroup>
      )}
    />
  );
}
