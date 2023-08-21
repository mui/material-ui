import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import JoyUsageDemo from 'docs/src/modules/components/JoyUsageDemo';

export default function AccordionUsage() {
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
          `<Accordion${props.disabled ? ' disabled' : ''}${
            props.variant === 'solid' ? ` variant=${props.variant}` : ''
          }>
    <AccordionSummary${
      props.variant === 'solid' ? ` variant=${props.variant}` : ''
    }>Title</AccordionSummary>
    <AccordionDetails${
      props.variant === 'solid' ? ` variant=${props.variant}` : ''
    }>Content</AccordionDetails>
  </Accordion>`,
        )
      }
      renderDemo={({ disabled, ...props }) => (
        <AccordionGroup
          {...props}
          sx={{ width: 300, maxWidth: '100%', alignSelf: 'flex-start', mb: 3 }}
        >
          <Accordion
            variant={props.variant === 'solid' ? 'solid' : undefined}
            disabled={disabled}
          >
            <AccordionSummary
              variant={props.variant === 'solid' ? 'solid' : undefined}
            >
              First Header
            </AccordionSummary>
            <AccordionDetails
              variant={props.variant === 'solid' ? 'solid' : undefined}
            >
              Content of the first accordion.
            </AccordionDetails>
          </Accordion>
          <Accordion
            disabled={disabled}
            variant={props.variant === 'solid' ? 'solid' : undefined}
          >
            <AccordionSummary
              variant={props.variant === 'solid' ? 'solid' : undefined}
            >
              Second Header
            </AccordionSummary>
            <AccordionDetails
              variant={props.variant === 'solid' ? 'solid' : undefined}
            >
              Content of the second accordion.
            </AccordionDetails>
          </Accordion>
          <Accordion
            disabled={disabled}
            variant={props.variant === 'solid' ? 'solid' : undefined}
          >
            <AccordionSummary
              variant={props.variant === 'solid' ? 'solid' : undefined}
            >
              Third Header
            </AccordionSummary>
            <AccordionDetails
              variant={props.variant === 'solid' ? 'solid' : undefined}
            >
              Content of the third accordion.
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      )}
    />
  );
}
