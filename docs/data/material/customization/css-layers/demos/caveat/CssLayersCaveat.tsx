import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';

export default function CssLayersCaveat() {
  // @focus-start @padding 1
  const [subLayers, setSubLayers] = React.useState(false);
  const theme = React.useMemo(() => {
    return createTheme({
      modularCssLayers: subLayers,
      cssVariables: true,
      components: {
        MuiAccordion: {
          styleOverrides: {
            root: {
              margin: 0,
            },
          },
        },
      },
    });
  }, [subLayers]);
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}
      >
        <Typography
          component="span"
          sx={{ marginRight: '8px', fontSize: '14px', color: 'text.secondary' }}
        >
          Single layer
        </Typography>
        <Switch checked={subLayers} onChange={() => setSubLayers(!subLayers)} />
        <Typography
          component="span"
          sx={{ marginLeft: '8px', fontSize: '14px', color: 'text.secondary' }}
        >
          Sub-layers
        </Typography>
      </Box>
      <ThemeProvider theme={theme}>
        <div>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography component="span">Accordion 1</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography component="span">Accordion 2</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
              malesuada lacus ex, sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion>
        </div>
      </ThemeProvider>
    </div>
  );
  // @focus-end
}
