import CardHeader from '@mui/material-v7/CardHeader';
import { CardHeader as MyCardHeader } from '@mui/material-v7';

<CardHeader
  titleTypographyProps={{ variant: 'h6' }}
  subheaderTypographyProps={{ variant: 'body2' }}
/>;
<CardHeader
  titleTypographyProps={{ variant: 'h6' }}
  subheaderTypographyProps={{ variant: 'body2' }}
  slotProps={{ title: { variant: 'h1' }, subheader: { variant: 'h2' } }}
/>;
<CardHeader
  titleTypographyProps={{ variant: 'h6' }}
  subheaderTypographyProps={{ variant: 'body2' }}
  slotProps={{ title: { sx: { color: 'red' } }, subheader: { sx: { color: 'red' } } }}
/>;
<MyCardHeader
  titleTypographyProps={{ variant: 'h6' }}
  subheaderTypographyProps={{ variant: 'body2' }}
/>;

<CustomCardHeader
  titleTypographyProps={{ variant: 'h6' }}
  subheaderTypographyProps={{ variant: 'body2' }}
/>;
