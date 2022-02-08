import * as React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Masonry from '@mui/lab/Masonry';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const heights = [150, 30, 90, 70, 90, 100, 150, 30, 50, 80];

export default function MasonryWithVariableHeightItems() {
  return (
    <Box sx={{ width: 500, minHeight: 377 }}>
      <Masonry columns={3} spacing={2}>
        {heights.map((height, index) => (
          <Paper key={index}>
            <Accordion sx={{ minHeight: height }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>Accordion {index + 1}</Typography>
              </AccordionSummary>
              <AccordionDetails>Contents</AccordionDetails>
            </Accordion>
          </Paper>
        ))}
      </Masonry>
    </Box>
  );
}
