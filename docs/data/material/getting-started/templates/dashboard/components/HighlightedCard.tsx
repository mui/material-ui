import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InsightsIcon from '@mui/icons-material/Insights';

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
        <Button
          size="small"
          variant="text"
          color="primary"
          endIcon={<ChevronRightIcon />}
        >
          Get insights
        </Button>
      </CardActions>
    </Card>
  );
}
