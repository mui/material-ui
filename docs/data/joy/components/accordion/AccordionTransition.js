import * as React from 'react';
import Box from '@mui/joy/Box';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import { BrandingProvider } from '@mui/docs/branding';

export default function AccordionTransition() {
  const [transition, setTransition] = React.useState('0.2s ease');
  return (
    <Stack spacing={2} sx={{ alignItems: 'center', flex: 1 }}>
      <RadioGroup
        orientation="horizontal"
        value={transition}
        onChange={(event) => {
          setTransition(event.target.value);
        }}
      >
        <Radio value="0.2s ease" label="Easing" />
        <Radio value="mix" label="Mix" />
      </RadioGroup>
      <AccordionGroup
        transition={
          transition === 'mix'
            ? {
                initial: '0.3s ease-out',
                expanded: '0.2s ease',
              }
            : transition
        }
        sx={{ maxWidth: 400 }}
      >
        <Accordion>
          <AccordionSummary>📖 How to animate the panel?</AccordionSummary>
          <AccordionDetails>
            <Typography>
              The AccordionGroup supports the <code>transition</code> prop to
              customize the animation of the panel. You can provide a <b>string</b>{' '}
              value or an <b>object</b> to fine tune the animation at the initial and
              expanded states.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>🤔 Does it work with dynamic height?</AccordionSummary>
          <AccordionDetails>
            <Typography>
              Absolutely yes! an by the way, it is <b>pure CSS</b>.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>🪄 What kind of magic this is?</AccordionSummary>
          <AccordionDetails>
            <Typography>
              The panel is a <b>CSS Grid</b> which can be transitioned by the{' '}
              <code>grid-template-rows</code> property.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
      <Box sx={{ width: '100%' }}>
        <BrandingProvider>
          <HighlightedCode
            code={`<AccordionGroup transition=${
              transition === 'mix'
                ? `{{
  initial: "0.3s ease-out",
  expanded: "0.2s ease",
}}`
                : `"${transition}"`
            }>`}
            language="jsx"
          />
        </BrandingProvider>
      </Box>
    </Stack>
  );
}
