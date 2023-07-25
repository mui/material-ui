import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Box from '@mui/joy/Box';

export default function ButtonUsage() {
  return (
    <JoyUsageDemo
      componentName="Button"
      data={[
        {
          propName: 'variant',
          knob: 'radio',
          defaultValue: 'solid',
          options: ['plain', 'outlined', 'soft', 'solid'],
        },
        {
          propName: 'color',
          knob: 'color',
          defaultValue: 'primary',
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
        { propName: 'onClick', defaultValue: () => {} },
      ]}
      renderDemo={(props) => (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Accordion>
            <AccordionSummary>Personal Information</AccordionSummary>
            <AccordionDetails>test</AccordionDetails>
            <AccordionSummary>Billing Address</AccordionSummary>
            <AccordionDetails>test</AccordionDetails>
            <AccordionSummary>Shipping Address</AccordionSummary>
            <AccordionDetails>test</AccordionDetails>
          </Accordion>
        </Box>
      )}
    />
  );
}
