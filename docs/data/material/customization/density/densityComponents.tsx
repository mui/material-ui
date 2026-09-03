import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

/**
 * Pure rendering: what each family looks like, and the props its toolbar exposes.
 * Nothing here knows that the result is measured — selectors, aspects and tokens
 * all live in `densityAnnotationSpecs`, so an annotation change never touches a
 * component.
 */
export type ControlValue = string | boolean;

export interface Control {
  /** the component's own prop, shown as the control's label. */
  prop: string;
  type: 'select' | 'switch';
  options?: string[];
  initial: ControlValue;
}

export interface ComponentSpec {
  /** at most two, rendered left to right in the toolbar. */
  controls?: Control[];
  render: (values: Record<string, ControlValue>) => React.ReactNode;
}

export const DENSITY_COMPONENTS: Record<string, ComponentSpec> = {
  Accordion: {
    render: () => (
      <Accordion defaultExpanded sx={{ width: 300 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <LocalShippingIcon />
          <Typography>Shipping</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">Free above $50.</Typography>
        </AccordionDetails>
      </Accordion>
    ),
  },
};

export const COMPONENT_NAMES = Object.keys(DENSITY_COMPONENTS);
