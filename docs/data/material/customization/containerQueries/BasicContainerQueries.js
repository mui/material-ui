import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const DynamicCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.containerQueries.up(350)]: {
    flexDirection: 'row',
  },
}));

const Image = styled('img')(({ theme }) => ({
  alignSelf: 'stretch',
  aspectRatio: '16 / 9',
  objectFit: 'cover',
  width: '100%',
  maxHeight: 160,
  transition: '0.4s',
  [theme.containerQueries.up(350)]: {
    maxWidth: '36%',
    maxHeight: 'initial',
  },
  [theme.containerQueries.up(500)]: {
    maxWidth: 240,
  },
}));

const Content = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  flex: 'auto',
  transition: 'padding 0.4s',
  [theme.containerQueries.up(500)]: {
    padding: theme.spacing(3),
  },
}));

const Line = styled('div')(({ theme }) => ({
  position: 'absolute',
  height: '100vh',
  top: 0,
  transform: 'translateY(-400px)',
  left: 0,
  borderLeft: '1px dashed',
  borderColor: (theme.vars || theme).palette.divider,
  color: (theme.vars || theme).palette.text.secondary,
  fontSize: '0.875rem',
  fontFamily: 'Menlo, monospace',
  '& span': {
    position: 'absolute',
    top: 'calc(400px - 1em)',
    left: 4,
  },
}));

export default function BasicContainerQueries() {
  return (
    <Box
      sx={{
        position: 'relative',
        paddingBlock: 2,
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
          containerType: 'inline-size',
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
