import * as React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Folder from '@material-ui/icons/Folder';

export default function ThemeAccordion() {
  return (
    <div>
      <Accordion variant="outlined">
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{ display: 'flex' }}>
            <Folder fontSize="small" />
            <div>
              <Typography>Fonts</Typography>
              <Typography variant="body2" color="text.secondary">
                Typefaces used in this branding project.
              </Typography>
            </div>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2" color="text.secondary">
            Tag line headings (h1, h2) use `Plus Jakarta Sans`, whereas the rest of the elements use
            `IBM Plex Sans`.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion variant="outlined">
        <AccordionSummary
          disabled
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Box sx={{ display: 'flex' }}>
            <Folder fontSize="small" />
            <div>
              <Typography>Libs</Typography>
              <Typography variant="body2" color="text.secondary">
                Cool ones we used on some our apps.
              </Typography>
            </div>
          </Box>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
