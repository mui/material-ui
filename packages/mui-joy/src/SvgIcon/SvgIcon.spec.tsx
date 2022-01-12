import SvgIcon from '@mui/joy/SvgIcon';
import * as React from 'react';

const HomeIcon = () => <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;

<SvgIcon>
  <HomeIcon />
</SvgIcon>;

<SvgIcon component="div">
  <HomeIcon />
</SvgIcon>;

<SvgIcon data-testid="any">
  <HomeIcon />
</SvgIcon>;

<SvgIcon color="primary">
  <HomeIcon />
</SvgIcon>;
<SvgIcon color="danger">
  <HomeIcon />
</SvgIcon>;
<SvgIcon color="info">
  <HomeIcon />
</SvgIcon>;
<SvgIcon color="success">
  <HomeIcon />
</SvgIcon>;
<SvgIcon color="warning">
  <HomeIcon />
</SvgIcon>;
<SvgIcon color="neutral">
  <HomeIcon />
</SvgIcon>;

<SvgIcon fontSize="extraSmall">
  <HomeIcon />
</SvgIcon>;
<SvgIcon fontSize="small">
  <HomeIcon />
</SvgIcon>;
<SvgIcon fontSize="medium">
  <HomeIcon />
</SvgIcon>;
<SvgIcon fontSize="large">
  <HomeIcon />
</SvgIcon>;
<SvgIcon fontSize="extraLarge">
  <HomeIcon />
</SvgIcon>;

// @ts-expect-error there is no fontSize `sm`
<SvgIcon fontSize="sm">
  <HomeIcon />
</SvgIcon>;
