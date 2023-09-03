import * as React from 'react';
import SvgIcon from '@mui/joy/SvgIcon';

function HomeIcon() {
  return <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />;
}

<SvgIcon>
  <HomeIcon />
</SvgIcon>;

<SvgIcon component="div">
  <HomeIcon />
</SvgIcon>;

<SvgIcon data-testid="any">
  <HomeIcon />
</SvgIcon>;

// `color`
<SvgIcon color="primary">
  <HomeIcon />
</SvgIcon>;
<SvgIcon color="danger">
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

// `fontSize`
<SvgIcon fontSize="xs">
  <HomeIcon />
</SvgIcon>;
<SvgIcon fontSize="sm">
  <HomeIcon />
</SvgIcon>;
<SvgIcon fontSize="md">
  <HomeIcon />
</SvgIcon>;
<SvgIcon fontSize="lg">
  <HomeIcon />
</SvgIcon>;
<SvgIcon fontSize="xl">
  <HomeIcon />
</SvgIcon>;
<SvgIcon fontSize="xl2">
  <HomeIcon />
</SvgIcon>;
<SvgIcon fontSize="xl3">
  <HomeIcon />
</SvgIcon>;
<SvgIcon fontSize="xl4">
  <HomeIcon />
</SvgIcon>;

// @ts-expect-error there is no fontSize `small`
<SvgIcon fontSize="small">
  <HomeIcon />
</SvgIcon>;
