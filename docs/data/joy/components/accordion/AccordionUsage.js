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
            props.variant === 'solid'
              ? ` variant=${props.variant} color=${props.color}`
              : ''
          }>
    <AccordionSummary${
      props.variant === 'solid'
        ? ` variant=${props.variant} color=${props.color}`
        : ''
    }>Title</AccordionSummary>
    <AccordionDetails${
      props.variant === 'solid'
        ? ` variant=${props.variant} color=${props.color}`
        : ''
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
            {...(props.variant === 'solid' && {
              variant: 'solid',
              color: props.color,
            })}
            disabled={disabled}
          >
            <AccordionSummary
              {...(props.variant === 'solid' && {
                variant: 'solid',
                color: props.color,
              })}
            >
              First Header
            </AccordionSummary>
            <AccordionDetails
              {...(props.variant === 'solid' && {
                variant: 'solid',
                color: props.color,
              })}
            >
              Content of the first accordion.
            </AccordionDetails>
          </Accordion>
          <Accordion
            disabled={disabled}
            {...(props.variant === 'solid' && {
              variant: 'solid',
              color: props.color,
            })}
          >
            <AccordionSummary
              {...(props.variant === 'solid' && {
                variant: 'solid',
                color: props.color,
              })}
            >
              Second Header
            </AccordionSummary>
            <AccordionDetails
              {...(props.variant === 'solid' && {
                variant: 'solid',
                color: props.color,
              })}
            >
              Content of the second accordion.
            </AccordionDetails>
          </Accordion>
          <Accordion
            disabled={disabled}
            {...(props.variant === 'solid' && {
              variant: 'solid',
              color: props.color,
            })}
          >
            <AccordionSummary
              {...(props.variant === 'solid' && {
                variant: 'solid',
                color: props.color,
              })}
            >
              Third Header
            </AccordionSummary>
            <AccordionDetails
              {...(props.variant === 'solid' && {
                variant: 'solid',
                color: props.color,
              })}
            >
              Content of the third accordion.
            </AccordionDetails>
          </Accordion>
        </AccordionGroup>
      )}
    />
  );
}
