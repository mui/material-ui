import * as React from 'react';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';

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
          codeBlockDisplay: false,
        },
        {
          propName: 'children',
          defaultValue: `$children`,
        },
      ]}
      getCodeBlock={(code, props) =>
        code.replace(
          '$children',
          `<Accordion${props.disabled ? ' disabled' : ''}>
    <AccordionSummary>Title</AccordionSummary>
    <AccordionDetails>Content</AccordionDetails>
  </Accordion>`,
        )
      }
      renderDemo={({ disabled, ...props }) => (
        <AccordionGroup
          {...props}
          sx={{ width: 300, maxWidth: '100%', alignSelf: 'flex-start' }}
        >
          <Accordion disabled={disabled}>
            <AccordionSummary>First Header</AccordionSummary>
            <AccordionDetails>Content of the first accordion.</AccordionDetails>
          </Accordion>
          <Accordion disabled={disabled}>
            <AccordionSummary>Second Header</AccordionSummary>
            <AccordionDetails>Content of the second accordion.</AccordionDetails>
          </Accordion>
          <Accordion disabled={disabled}>
            <AccordionSummary>Third Header</AccordionSummary>
            <AccordionDetails>Content of the third accordion.</AccordionDetails>
          </Accordion>
        </AccordionGroup>
      )}
    />
  );
}
