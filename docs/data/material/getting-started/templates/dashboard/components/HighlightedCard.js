import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';

const Card = styled(MuiCard)(({ theme }) => ({
  border: '1px solid',
  borderColor:
    theme.palette.mode === 'light'
      ? theme.palette.primary.light
      : theme.palette.primary.dark,
  boxShadow: 'none',
  background:
    theme.palette.mode === 'light'
      ? 'hsl(210, 100%, 98%)'
      : 'hsla(210, 100%, 15%, 0.25)',
  color:
    theme.palette.mode === 'light'
      ? theme.palette.grey[900]
      : theme.palette.grey[200],
}));

export default function HighlightedCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <InsightsRoundedIcon color="primary" />
        <Typography component="h2" variant="subtitle2" fontWeight="600" gutterBottom>
          Explore your data
        </Typography>
        <Typography color="text.secondary" sx={{ mb: '8px' }}>
          Uncover performance and visitor insights with our data wizardry.
        </Typography>
        <Button
          variant="outlined"
          size="small"
          color="primary"
          endIcon={<ChevronRightRoundedIcon />}
        >
          Get insights
        </Button>
      </CardContent>
    </Card>
  );
}
