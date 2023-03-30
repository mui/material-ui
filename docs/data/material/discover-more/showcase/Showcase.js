import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import appList from './appList';

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// Returns a function that sorts reverse numerically by value of `key`
function sortFactory(key) {
  return function sortNumeric(a, b) {
    if (b[key] < a[key]) {
      return -1;
    }
    if (b[key] > a[key]) {
      return 1;
    }
    return 0;
  };
}

const sortFunctions = {
  dateAdded: sortFactory('dateAdded'),
  similarWebVisits: sortFactory('similarWebVisits'),
  stars: sortFactory('stars'),
};

export default function Showcase() {
  const [sortFunctionName, setSortFunctionName] = React.useState('dateAdded');
  const sortFunction = sortFunctions[sortFunctionName];
  const t = useTranslate();

  const handleChangeSort = (event) => {
    setSortFunctionName(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FormControl sx={{ mb: 4, minWidth: 120 }}>
        <InputLabel htmlFor="sort">Sort by</InputLabel>
        <Select
          value={sortFunctionName}
          onChange={handleChangeSort}
          label="Sort by"
          inputProps={{ id: 'sort' }}
        >
          <MenuItem value="dateAdded">{t('newest')}</MenuItem>
          <MenuItem value="similarWebVisits">{t('traffic')}</MenuItem>
          <MenuItem value="stars">{t('stars')}</MenuItem>
        </Select>
      </FormControl>
      {stableSort(
        appList.filter((item) => item[sortFunctionName] !== undefined),
        sortFunction,
      ).map((app) => (
        <div key={app.title}>
          <Typography component="h2" variant="h4" gutterBottom sx={{ mb: 2 }}>
            <span>{app.title}</span>
            {app.source ? (
              <IconButton
                href={app.source}
                target="_blank"
                aria-label={`${app.title} ${t('sourceCode')}`}
              >
                <GitHubIcon />
              </IconButton>
            ) : null}
          </Typography>
          {app.image ? (
            <Card
              sx={{
                mb: 1,
                maxWidth: 600,
                display: 'flex',
                textDecoration: 'none',
              }}
              component="a"
              href={app.link}
              rel="noopener nofollow"
              target="_blank"
            >
              <CardMedia
                component="img"
                loading="lazy"
                src={`/static/images/showcase/${app.image}`}
                sx={{
                  minHeight: 200,
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? 'grey.900' : 'grey.100',
                  bgcolor: 'currentColor',
                }}
                title={app.title}
              />
            </Card>
          ) : (
            <Link
              variant="body2"
              target="_blank"
              rel="noopener nofollow"
              href={app.link}
              gutterBottom
            >
              {t('visit')}
            </Link>
          )}
          <Typography gutterBottom>{app.description}</Typography>
          <Typography
            variant="caption"
            display="block"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 600 }}
          >
            {app.dateAdded}
          </Typography>
        </div>
      ))}
    </Box>
  );
}
