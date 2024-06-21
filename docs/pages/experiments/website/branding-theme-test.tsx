import * as React from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Head from 'docs/src/modules/components/Head';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import AppHeader from 'docs/src/layouts/AppHeader';
import Section from 'docs/src/layouts/Section';
import AppFooter from 'docs/src/layouts/AppFooter';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Link } from '@mui/docs/Link';

export default function BrandingThemeTest() {
  return (
    <BrandingCssVarsProvider>
      <Head title="MUI Branding Theme Test" description="" />
      <AppHeader gitHubRepository="https://github.com/mui/material-ui" />
      <main id="main-content">
        <Section>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content', mb: 4 }}>
            <Link href="/">Link with no role</Link>
            <Link href="/" role="menuitem">
              Link role menuitem
            </Link>
          </Stack>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content' }}>
            <Chip size="small" variant="outlined" color="primary" label="Hiring" />
            <Chip size="small" variant="outlined" color="info" label="Hiring" />
            <Chip size="small" variant="outlined" color="error" label="Hiring" />
            <Chip size="small" variant="outlined" color="warning" label="Hiring" />
            <Chip size="small" variant="outlined" color="success" label="Hiring" />
          </Stack>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content', mt: 8 }}>
            <Button variant="contained">This button</Button>
            <Button variant="outlined">This button</Button>
            <Button variant="text">This button</Button>
          </Stack>
          <Stack direction="row" spacing={2} useFlexGap sx={{ width: 'fit-content', mt: 8 }}>
            <Button variant="contained" size="small" color="primary">
              Contained primary
            </Button>
            <Button variant="contained" size="small" color="secondary">
              Contained secondary
            </Button>
            <Button variant="outlined" size="small" color="primary">
              Outlined primary
            </Button>
            <Button variant="outlined" size="small" color="secondary">
              Outlined secondary
            </Button>
            <Button variant="text" size="small">
              This button
            </Button>
            <IconButton color="primary">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton color="info">
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton>
              <GitHubIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Section>
        <Divider />
      </main>
      <AppFooter stackOverflowUrl="https://stackoverflow.com/questions/tagged/material-ui" />
    </BrandingCssVarsProvider>
  );
}
