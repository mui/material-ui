import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { green, orange, red } from '../getDashboardTheme';

const trendColors = { up: green[400], down: red[300], neutral: orange[400] };
const trendValues = { up: '+25%', down: '-25%', neutral: '+5%' };

function AreaGradient({ color, id }) {
  return (
    <defs>
      <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%" stopColor={color} stopOpacity={0.5} />
        <stop offset="100%" stopColor={color} stopOpacity={0} />
      </linearGradient>
    </defs>
  );
}

AreaGradient.propTypes = {
  color: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

function StatCard({ title, value, interval, trend, data }) {
  const color = trendColors[trend];
  return (
    <Card variant="outlined" sx={{ height: '100%' }}>
      <CardContent>
        <Stack>
          <Box display="flex" alignItems="flex-end">
            <Typography
              sx={{ fontSize: 14, flexGrow: 1, fontWeight: 'medium' }}
              color="text.secondary"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                flexGrow: 1,
                fontWeight: 600,
                textAlign: 'right',
              }}
              color={trendColors[trend]}
              gutterBottom
            >
              {trendValues[trend]}
            </Typography>
          </Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-end"
            flexGrow="1"
          >
            <Stack justifyContent="space-between">
              <Typography variant="h5" component="div">
                {value}
              </Typography>
              <Typography sx={{ fontSize: 12 }} color="text.secondary">
                {interval}
              </Typography>
            </Stack>
            <Box sx={{ width: 140, height: 80 }}>
              <SparkLineChart
                colors={[color]}
                data={data}
                area
                sx={{
                  '& .MuiAreaElement-root': {
                    fill: `url(#area-gradient-${value})`,
                  },
                }}
              >
                <AreaGradient color={color} id={`area-gradient-${value}`} />
              </SparkLineChart>
            </Box>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

StatCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
  interval: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  trend: PropTypes.oneOf(['down', 'neutral', 'up']).isRequired,
  value: PropTypes.string.isRequired,
};

export default StatCard;
