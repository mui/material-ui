import * as React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Line from './Line';
import Content from './Content';
import DynamicCard from './DynamicCard';
import Image from './Image';

export default function BasicContainerQueries() {
  return (
    <Box
      sx={{
        position: 'relative',
        paddingBlock: 2,
        ml: 2,
        mr: 'auto',
        '*:has(> &)': {
          overflow: 'hidden',
        },
      }}
    >
      <Line>
        <span>0px</span>
      </Line>
      <Line sx={{ left: 350 }}>
        <span>350px</span>
      </Line>
      <Line sx={{ left: 500 }}>
        <span>500px</span>
      </Line>
      <Box
        sx={{
          overflow: 'auto',
          resize: 'horizontal',
          width: 400,
          maxWidth: 'min(80vw, 600px)',
          containerType: 'inline-size', // required for container queries
        }}
      >
        <DynamicCard variant="outlined">
          <Image
            alt="The house from the offer."
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
          />
          <Content>
            <div>
              <Typography
                component="div"
                sx={{ color: 'text.secondary', fontSize: '0.875rem' }}
              >
                123 Main St, Phoenix AZ
              </Typography>
              <Typography
                component="div"
                sx={{
                  color: 'primary.main',
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                }}
              >
                $280,000 — $310,000
              </Typography>
            </div>
            <Chip
              size="small"
              label="Confidence score: 85%"
              sx={{ p: 0, width: 'fit-content' }}
            />
          </Content>
        </DynamicCard>
      </Box>
    </Box>
  );
}
