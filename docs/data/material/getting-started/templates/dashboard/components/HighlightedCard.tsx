import * as React from 'react';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Card as MuiCard } from '@mui/material';

import { styled } from '@mui/material/styles';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InsightsIcon from '@mui/icons-material/Insights';

const Card = styled(MuiCard)(({ theme }) => ({
  border: '1px solid',
  borderColor:
    theme.palette.mode === 'light'
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
  boxShadow: 'none',
  background:
    theme.palette.mode === 'light'
      ? 'hsl(210, 100%, 97%)'
      : 'hsla(210, 100%, 16%, 0.4)',
  color:
    theme.palette.mode === 'light'
      ? theme.palette.grey[900]
      : theme.palette.grey[200],
}));

export default function HighlightedCard() {
  return (
    <Card variant="highlighted" sx={{ height: '100%' }}>
      <CardContent>
        <InsightsIcon color="primary" />
        <Typography
          sx={{ fontSize: 14, flexGrow: 1, fontWeight: 'medium' }}
          gutterBottom
        >
          Uncover performance and visitor insights with our data wizardry!
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button size="small" color="secondary" endIcon={<ChevronRightIcon />}>
          Get insights
        </Button>
      </CardActions>
    </Card>
  );
}
