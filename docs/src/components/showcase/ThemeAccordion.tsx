import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Accordion, { accordionClasses } from '@mui/material/Accordion';
import AccordionSummary, { accordionSummaryClasses } from '@mui/material/AccordionSummary';
import AccordionDetails, { accordionDetailsClasses } from '@mui/material/AccordionDetails';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FontDownloadRoundedIcon from '@mui/icons-material/FontDownloadRounded';
import Folder from '@mui/icons-material/Folder';

export default function ThemeAccordion() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Fade in timeout={700}>
      <Box
        sx={[
          {
            [`& .${accordionClasses.root}`]: {
              bgcolor: '#fff',
              borderColor: 'grey.200',
              boxShadow: (theme) => `0px 4px 8px ${alpha(theme.palette.grey[200], 0.6)}`,

              [`&.${accordionClasses.expanded}`]: {
                margin: 0,
              },
              '&:not(:first-of-type)': {
                marginTop: '-1px',
              },
            },
            [`& .${accordionSummaryClasses.root}`]: {
              [`&.${accordionSummaryClasses.expanded}`]: {
                minHeight: 'auto',
              },
              [`& .${accordionSummaryClasses.content}`]: {
                flexDirection: 'column',
                margin: '20px 0 !important',
                '& svg': {
                  marginTop: '3px',
                  marginRight: '20px',
                  color: 'grey.500',
                },
              },
              [`& .${accordionSummaryClasses.expandIconWrapper}`]: {
                color: 'primary.500',
              },
            },
            [`& .${accordionDetailsClasses.root}`]: {
              paddingTop: 0,
            },
          },
          (theme) =>
            theme.applyDarkStyles({
              [`& .${accordionClasses.root}`]: {
                bgcolor: 'primaryDark.900',
                borderColor: 'primaryDark.700',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
              },
              [`& .${accordionSummaryClasses.root}`]: {
                [`& .${accordionSummaryClasses.content}`]: {
                  '& svg': {
                    color: 'grey.300',
                  },
                },
              },
            }),
        ]}
      >
        <Accordion
          variant="outlined"
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ color: 'primary.400' }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Box sx={{ display: 'flex' }}>
              <FontDownloadRoundedIcon fontSize="small" />
              <div>
                <Typography sx={{ fontWeight: 500 }}>Typography</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Fonts used in this website revamp project.
                </Typography>
              </div>
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Tag line headings (h1, h2) use General Sans, whereas the rest of the website use IBM
              Plex Sans.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          variant="outlined"
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            disabled
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Box sx={{ display: 'flex' }}>
              <Folder fontSize="small" />
              <div>
                <Typography>Hacks</Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Some of our secrets to make this website.
                </Typography>
              </div>
            </Box>
          </AccordionSummary>
        </Accordion>
      </Box>
    </Fade>
  );
}
