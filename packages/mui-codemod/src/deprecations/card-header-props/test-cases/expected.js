import CardHeader from '@mui/material/CardHeader';
import { CardHeader as MyCardHeader } from '@mui/material';

<CardHeader
  slotProps={{
    title: { variant: 'h6' },
    subheader: { variant: 'body2' }
  }} />;
<CardHeader
  slotProps={{ title: {
    ...{ variant: 'h6' },
    ...{ variant: 'h1' }
  }, subheader: {
    ...{ variant: 'body2' },
    ...{ variant: 'h2' }
  } }} />;
<CardHeader
  slotProps={{ title: {
    ...{ variant: 'h6' },
    ...{ sx: { color: 'red' } }
  }, subheader: {
    ...{ variant: 'body2' },
    ...{ sx: { color: 'red' } }
  } }} />;
<MyCardHeader
  slotProps={{
    title: { variant: 'h6' },
    subheader: { variant: 'body2' }
  }} />;

<CustomCardHeader
  titleTypographyProps={{ variant: 'h6' }}
  subheaderTypographyProps={{ variant: 'body2' }}
/>;
