import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function formatNumber(n: number): string {
  let formatted: string;
  if (n >= 1000000) {
    formatted = (n / 1000000).toFixed(1);
    formatted += 'M';
  } else if (n >= 1000) {
    formatted = (n / 1000).toFixed(1);
    formatted += 'K';
  } else {
    return n.toString();
  }
  return formatted;
}

export default function MuiStatistics() {
  const [data, setData] = React.useState([{ title: '', metadata: '' }]);
  React.useEffect(() => {
    async function getStatistics() {
      const api = 'https://api.github.com/repos/mui/material-ui';
      let res: any = await fetch(api);
      res = await res.json();
      setData([
        { title: '5M', metadata: 'Weekly downloads on npm' },
        { title: formatNumber(res?.stargazers_count), metadata: 'Stars on GitHub' },
        { title: '2.7k', metadata: 'Open-source contributors' },
        { title: '18.4k', metadata: 'Followers on Twitter' },
      ]);
    }
    getStatistics();
  }, []);
  return (
    <Grid item xs={12} md={6} container spacing={4}>
      {data.map((item) => (
        <Grid key={item.title} item xs={6}>
          <Box
            sx={(theme) => ({
              height: '100%',
              pl: 2,
              borderLeft: '1px solid',
              borderColor: 'primary.100',
              ...theme.applyDarkStyles({
                borderColor: 'primaryDark.600',
              }),
            })}
          >
            <Typography
              component="div"
              variant="h4"
              fontWeight="bold"
              sx={(theme) => ({
                color: 'primary.main',
                ...theme.applyDarkStyles({
                  color: 'primary.200',
                }),
              })}
            >
              {item.title}
            </Typography>
            <Typography color="text.secondary">{item.metadata}</Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
