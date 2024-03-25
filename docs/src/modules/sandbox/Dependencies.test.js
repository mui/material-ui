import { expect } from 'chai';
import SandboxDependencies from './Dependencies';

describe('Dependencies', () => {
  before(() => {
    process.env.SOURCE_CODE_REPO = 'https://github.com/mui/material-ui';
  });

  after(() => {
    delete process.env.SOURCE_CODE_REPO;
  });

  const s1 = `
import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/material/styles';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import { SliderUnstyled } from '@mui/base/SliderUnstyled';
import FooBar, { Qux } from '@foo-bar/bip';
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl
`;

  it('should handle @ dependencies', () => {
    const { dependencies } = SandboxDependencies({
      raw: s1,
      codeVariant: 'JS',
    });
    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@foo-bar/bip': 'latest',
      '@mui/material': 'next',
      '@mui/base': 'next',
      'prop-types': 'latest',
    });
  });

  it('should handle * dependencies', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import * as _ from '@unexisting/thing';
import Draggable from 'react-draggable';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import { withStyles } from '@mui/material/styles';
const suggestions = [
`;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
      '@unexisting/thing': 'latest',
      'autosuggest-highlight': 'latest',
      'prop-types': 'latest',
      'react-draggable': 'latest',
    });
  });

  it('should support direct import', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import { withStyles } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider as MuiPickersLocalizationProvider, KeyboardTimePicker, KeyboardDatePicker } from '@mui/lab';
`;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      'prop-types': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
      '@mui/lab': 'next',
    });
  });

  it('should support import for side effect', () => {
    const source = `
import * as React from 'react';
import PropTypes from 'prop-types';
import '@mui/material/Grid';
import '@mui/material/styles';
import '@mui/lab/AdapterDateFns';
import '@mui/lab';
import 'exceljs';
`;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      'prop-types': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
      '@mui/lab': 'next',
      exceljs: 'latest',
    });
  });

  it('can collect required @types packages', () => {
    const { dependencies } = SandboxDependencies({
      raw: s1,
      codeVariant: 'TS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      'prop-types': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@foo-bar/bip': 'latest',
      '@mui/material': 'next',
      '@mui/base': 'next',
      '@types/foo-bar__bip': 'latest',
      '@types/prop-types': 'latest',
      '@types/react-dom': 'latest',
      '@types/react': 'latest',
      typescript: 'latest',
    });
  });

  it('should handle @types correctly', () => {
    const { dependencies } = SandboxDependencies({
      raw: `import utils from '../utils';`,
      codeVariant: 'TS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
      '@types/react-dom': 'latest',
      '@types/react': 'latest',
      typescript: 'latest',
    });
  });

  it('should handle multilines', () => {
    const source = `
import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  LocalizationProvider as MuiPickersLocalizationProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@mui/lab';
    `;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
      '@mui/lab': 'next',
    });
  });

  it('should include core if lab present', () => {
    const source = `
import lab from '@mui/lab';
    `;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'JS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'next',
      '@mui/lab': 'next',
    });
  });

  it('can use codesandbox deploys if a commit is given', () => {
    const source = `
import * as Material from '@mui/material';
import * as Base from '@mui/base';
import * as IconsMaterial from '@mui/icons-material';
import * as Lab from '@mui/lab';
import * as Styles from '@mui/styles';
import * as System from '@mui/system';
import * as Utils from '@mui/utils';
    `;

    const { dependencies } = SandboxDependencies(
      {
        raw: source,
        codeVariant: 'JS',
      },
      { commitRef: '2d0e8b4daf20b7494c818b6f8c4cc8423bc99d6f' },
    );

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/material': 'https://pkg.csb.dev/mui/material-ui/commit/2d0e8b4d/@mui/material',
      '@mui/icons-material':
        'https://pkg.csb.dev/mui/material-ui/commit/2d0e8b4d/@mui/icons-material',
      '@mui/lab': 'https://pkg.csb.dev/mui/material-ui/commit/2d0e8b4d/@mui/lab',
      '@mui/styles': 'https://pkg.csb.dev/mui/material-ui/commit/2d0e8b4d/@mui/styles',
      '@mui/system': 'https://pkg.csb.dev/mui/material-ui/commit/2d0e8b4d/@mui/system',
      '@mui/utils': 'https://pkg.csb.dev/mui/material-ui/commit/2d0e8b4d/@mui/utils',
      '@mui/base': 'https://pkg.csb.dev/mui/material-ui/commit/2d0e8b4d/@mui/base',
    });
  });

  it('should not have . as a dependency', () => {
    const source = `import * as React from 'react';
import Box, { BoxProps } from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

const Root = (props: BoxProps) => (
  <Box
    {...props}
    sx={[
      {
        bgcolor: 'background.bodyEmail',
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
          md: 'minmax(160px, 300px) minmax(300px, 500px) minmax(500px, 1fr)',
        },
        gridTemplateRows: '64px 1fr',
        minHeight: '100vh',
      },
      ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
    ]}
  />
);

export default {
  Root,
  Header,
  SideNav,
  SidePane,
  SideDrawer,
  Main,
};

import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import type { Theme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';

// Icons import
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import MenuIcon from '@mui/icons-material/Menu';

// custom
import emailTheme from './theme';
import Layout from './components/Layout';
import Navigation from './components/Navigation';
import Mails from './components/Mails';
import MailContent from './components/MailContent';

const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="primary" />;
  }
  return (
    <IconButton
      size="sm"
      variant="outlined"
      color="primary"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
};

export default function EmailExample() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <CssVarsProvider disableTransitionOnChange theme={emailTheme}>
      <GlobalStyles<Theme>
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
          <Navigation />
        </Layout.SideDrawer>
      )}
      <Layout.Root
        sx={{
          ...(drawerOpen && {
            height: '100vh',
            overflow: 'hidden',
          }),
        }}
      >
        <Layout.Header>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <IconButton
              variant="outlined"
              size="sm"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant="solid"
              sx={{ display: { xs: 'none', sm: 'inherit' } }}
            >
              <MailRoundedIcon />
            </IconButton>
            <Typography fontWeight={700}>Email</Typography>
          </Box>
          <Input
            size="sm"
            placeholder="Search anything…"
            startDecorator={<SearchRoundedIcon color="primary" />}
            endDecorator={
              <IconButton variant="outlined" size="sm" color="neutral">
                <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
                  /
                </Typography>
              </IconButton>
            }
            sx={{
              flexBasis: '500px',
              display: {
                xs: 'none',
                sm: 'flex',
              },
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1.5 }}>
            <IconButton
              size="sm"
              variant="outlined"
              color="primary"
              sx={{ display: { xs: 'inline-flex', sm: 'none' } }}
            >
              <SearchRoundedIcon />
            </IconButton>
            <IconButton size="sm" variant="outlined" color="primary">
              <GridViewRoundedIcon />
            </IconButton>
            <ColorSchemeToggle />
          </Box>
        </Layout.Header>
        <Layout.SideNav>
          <Navigation />
        </Layout.SideNav>
        <Layout.SidePane>
          <Box
            sx={{
              p: 2,
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              textColor="neutral.500"
              fontWeight={700}
              sx={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '.1rem',
              }}
            >
              Unread
            </Typography>
            <IconButton
              size="sm"
              variant="plain"
              color="primary"
              sx={{ '--IconButton-size': '24px' }}
            >
              <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
            </IconButton>
          </Box>
          <Box sx={{ py: 10 }}>
            <Typography
              textColor="text.tertiary"
              level="body-sm"
              sx={{ textAlign: 'center' }}
            >
              You&apos;ve read all messages in your inbox.
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              textColor="neutral.500"
              fontWeight={700}
              sx={{
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '.1rem',
              }}
            >
              Everything else
            </Typography>
            <IconButton
              size="sm"
              variant="plain"
              color="primary"
              sx={{ '--IconButton-size': '24px' }}
            >
              <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
            </IconButton>
          </Box>
          <Mails />
        </Layout.SidePane>
        <Layout.Main>
          <MailContent />
        </Layout.Main>
      </Layout.Root>
    </CssVarsProvider>
  );
}
    `;

    const { dependencies } = SandboxDependencies({
      raw: source,
      codeVariant: 'TS',
    });

    expect(dependencies).to.deep.equal({
      react: 'latest',
      'react-dom': 'latest',
      '@emotion/react': 'latest',
      '@emotion/styled': 'latest',
      '@mui/icons-material': 'next',
      '@mui/joy': 'next',
      '@mui/material': 'next',
      '@mui/system': 'next',
      '@types/react': 'latest',
      '@types/react-dom': 'latest',
      typescript: 'latest',
    });
  });
});
