import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';

const data = [
  {
    src:
      'https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ',
    title: 'Don Diablo @ Tomorrowland Main Stage 2019 | Official…',
    channel: 'Don Diablo',
    views: '396 k views',
    createdAt: 'a week ago',
  },
  {
    src:
      'https://i.ytimg.com/vi/ycHr1G0Gffg/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAS6ZJ5RYa2R3Ksp9d8cLzY_8DMOA',
    title: 'Top Latino Songs 2019 - Luis Fonsi, Ozuna, Nicky Jam…',
    channel: 'Dj Yanky Plus',
    views: '2.1 M views',
    createdAt: '4 months ago',
  },
  {
    src:
      'https://i.ytimg.com/vi/kkLk2XWMBf8/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB4GZTFu1Ju2EPPPXnhMZtFVvYBaw',
    title: 'Calvin Harris, Sam Smith - Promises (Official Video)',
    channel: 'Calvin Harris',
    views: '130 M views',
    createdAt: '10 months ago',
  },
];

interface MediaProps {
  loading?: boolean;
}

function Media(props: MediaProps) {
  const { loading = false } = props;

  return (
    <Grid container wrap="nowrap">
      {(loading ? Array.from(new Array(3)) : data).map((item, index) => (
        <Box key={index} width={210} marginRight={0.5} my={5}>
          {item ? (
            <img style={{ width: 210, height: 118 }} alt={item.title} src={item.src} />
          ) : (
            <Skeleton variant="rect" width={210} height={118} />
          )}
          {item ? (
            <Box paddingRight={2}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography display="block" variant="caption" color="textSecondary">
                {item.channel}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <React.Fragment>
              <Skeleton />
              <Skeleton width="60%" />
            </React.Fragment>
          )}
        </Box>
      ))}
    </Grid>
  );
}

export default function YouTube() {
  return (
    <Box overflow="hidden" clone>
      <Paper>
        <Box px={3}>
          <Media loading />
          <Media />
        </Box>
      </Paper>
    </Box>
  );
}
