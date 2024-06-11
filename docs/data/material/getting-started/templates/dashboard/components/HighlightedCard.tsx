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
  boxShadow: 'none',
  borderColor: theme.palette.primary.light,
  background: 'hsl(210, 100%, 98%)',
  color: theme.palette.grey[900],
  ...theme.applyStyles('dark', {
    borderColor: theme.palette.primary.dark,
    background: 'hsla(210, 100%, 15%, 0.25)',
    color: theme.palette.grey[200],
  }),
}));

export default function HighlightedCard() {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <InsightsRoundedIcon color="primary" />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          Explore your data
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
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
