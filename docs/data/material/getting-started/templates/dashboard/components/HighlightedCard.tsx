import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Card as MuiCard } from '@mui/material';
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
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row', md: 'column' },
        justifyContent: 'space-between',
        alignItems: { xs: 'space-between', sm: 'flex-end', md: 'space-between' },
      }}
    >
      <CardContent>
        <InsightsRoundedIcon color="primary" />
        <Typography component="h2" variant="subtitle2" fontWeight="600" gutterBottom>
          Explore your data
        </Typography>
        <Typography color="text.secondary">
          Uncover performance and visitor insights with our data wizardry.
        </Typography>
      </CardContent>
      <Button
        variant="outlined"
        size="small"
        color="secondary"
        endIcon={<ChevronRightRoundedIcon />}
        fullWidth
      >
        Get insights
      </Button>
    </Card>
  );
}
