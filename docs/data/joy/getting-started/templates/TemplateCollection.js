import * as React from 'react';
import startCase from 'lodash/startCase';
import NextLink from 'next/link';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import Visibility from '@mui/icons-material/Visibility';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import codeSandbox from 'docs/src/modules/sandbox/CodeSandbox';
import sourceJoyTemplates from 'docs/src/modules/joy/sourceJoyTemplates';

/**
 * To display a template on the site:
 * - Create a folder next to this file.
 * - The folder should have `App.(js|tsx)`
 * - The name of the folder will be used as the url and title
 */

const authors = {
  MUI: {
    name: 'MUI',
    link: 'https://x.com/MUI_hq',
  },
  SteveEberger: {
    name: 'Steve Ernstberger',
    link: 'https://x.com/SteveEberger',
  },
};

const templates = [
  {
    name: 'order-dashboard',
    author: authors.MUI,
    design: {
      name: 'Untitled UI',
      link: 'https://www.figma.com/community/file/1020079203222518115/untitled-ui-free-figma-ui-kit-and-design-system-v2-0',
    },
  },
  {
    name: 'profile-dashboard',
    author: authors.MUI,
    design: {
      name: 'Untitled UI',
      link: 'https://www.figma.com/community/file/1020079203222518115/untitled-ui-free-figma-ui-kit-and-design-system-v2-0',
    },
  },
  {
    name: 'messages',
    author: authors.SteveEberger,
    design: {
      name: 'Untitled UI',
      link: 'https://www.figma.com/community/file/1020079203222518115/untitled-ui-free-figma-ui-kit-and-design-system-v2-0',
    },
  },
  {
    name: 'sign-in-side',
    author: authors.MUI,
  },
  {
    name: 'rental-dashboard',
    author: authors.SteveEberger,
    design: {
      name: 'Untitled UI',
      link: 'https://www.figma.com/community/file/1020079203222518115/untitled-ui-free-figma-ui-kit-and-design-system-v2-0',
    },
  },
  {
    name: 'team',
    author: authors.MUI,
  },
  {
    name: 'files',
    author: authors.MUI,
  },
  {
    name: 'email',
    author: authors.MUI,
  },
  {
    name: 'framesx-web-blocks',
    author: authors.MUI,
    design: {
      name: 'Frames X',
      link: 'https://framesxdesign.com/product',
    },
  },
];

export default function TemplateCollection() {
  const joyTemplates = sourceJoyTemplates();

  return (
    <List
      sx={{
        px: { xs: 2, sm: 0 },
        flexGrow: 1,
        gap: 3,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      }}
    >
      {templates.map((template) => {
        const item = joyTemplates.map.get(template.name);
        return (
          <Card
            component="li"
            variant="outlined"
            key={template.name}
            sx={{ bgcolor: 'initial', overflow: 'auto', borderRadius: 12 }}
          >
            <CardOverflow>
              <AspectRatio
                ratio="2"
                variant="plain"
                sx={{
                  borderRadius: 0,
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box
                  sx={(theme) => ({
                    background: 'var(--template-name)',
                    [theme.getColorSchemeSelector('dark')]: {
                      background: 'var(--template-name-dark)',
                    },
                  })}
                  style={{
                    '--template-name': `center/cover no-repeat url(/static/screenshots/joy-ui/getting-started/templates/${template.name}.jpg)`,
                    '--template-name-dark': `center/cover no-repeat url(/static/screenshots/joy-ui/getting-started/templates/${template.name}-dark.jpg)`,
                  }}
                />
                <NextLink
                  href={`/joy-ui/getting-started/templates/${template.name}/`}
                  passHref
                  legacyBehavior
                >
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <Link
                    tabIndex={-1}
                    overlay
                    aria-hidden
                    data-ga-event-category="joy-template"
                    data-ga-event-label={template.name}
                    data-ga-event-action="preview-img"
                    sx={[
                      (theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        gap: 1,
                        transition: '0.15s',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        opacity: 0,
                        top: 0,
                        left: 0,
                        bgcolor: `rgba(${theme.vars.palette.primary.lightChannel} / 0.3)`,
                        backdropFilter: 'blur(4px)',
                        '&:hover, &:focus': {
                          opacity: 1,
                        },
                        [theme.getColorSchemeSelector('dark')]: {
                          bgcolor: `rgba(${theme.vars.palette.primary.darkChannel} / 0.3)`,
                        },
                      }),
                    ]}
                  >
                    <Visibility />
                    <Typography
                      textColor="text.primary"
                      sx={{ fontWeight: 'bold', fontFamily: 'IBM Plex Sans' }}
                    >
                      View live preview
                    </Typography>
                  </Link>
                </NextLink>
              </AspectRatio>
            </CardOverflow>
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                component="h3"
                sx={{
                  fontFamily: 'IBM Plex Sans',
                  fontSize: 'lg',
                  fontWeight: 'xl',
                }}
              >
                {startCase(template.name)}
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  mb: 2,
                }}
              >
                {template.author && (
                  <Typography
                    level="body-sm"
                    sx={{ fontWeight: 'md', fontFamily: 'IBM Plex Sans' }}
                  >
                    Built by{' '}
                    <Link
                      href={template.author.link}
                      target="_blank"
                      rel="noopener nofollow"
                    >
                      <b>{template.author.name}</b>
                    </Link>
                  </Typography>
                )}
                {template.design && (
                  <React.Fragment>
                    <Typography
                      level="caption"
                      textColor="text.tertiary"
                      sx={{ fontWeight: 'md', mx: 0.5 }}
                    >
                      •
                    </Typography>
                    <Typography
                      level="body-sm"
                      sx={{ fontWeight: 'md', fontFamily: 'IBM Plex Sans' }}
                    >
                      Designed by{' '}
                      <Link
                        href={template.design.link}
                        target="_blank"
                        rel="noopener nofollow"
                      >
                        <b>{template.design.name}</b>
                      </Link>
                    </Typography>
                  </React.Fragment>
                )}
              </Box>
              <Box
                sx={{
                  mt: 'auto',
                  width: '100%',
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1.5,
                }}
              >
                <NextLink
                  href={`https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/${template.name}`}
                  passHref
                  legacyBehavior
                >
                  <Button
                    component="a"
                    variant="outlined"
                    color="neutral"
                    fullWidth
                    startDecorator={<CodeRoundedIcon />}
                    aria-label="Source code"
                    data-ga-event-category="joy-template"
                    data-ga-event-label={template.name}
                    data-ga-event-action="preview"
                    sx={{ fontFamily: 'IBM Plex Sans' }}
                  >
                    Source
                  </Button>
                </NextLink>
                <Button
                  variant="outlined"
                  color="neutral"
                  fullWidth
                  startDecorator={
                    <SvgIcon viewBox="0 0 1080 1080">
                      <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                    </SvgIcon>
                  }
                  aria-label="CodeSandbox playground"
                  data-ga-event-category="joy-template"
                  data-ga-event-label={template.name}
                  data-ga-event-action="codesandbox"
                  onClick={() =>
                    codeSandbox
                      .createJoyTemplate({
                        ...item,
                        title: `${startCase(template.name)} Template - Joy UI`,
                        githubLocation: `${process.env.SOURCE_CODE_REPO}/blob/v${
                          process.env.LIB_VERSION
                        }/docs/data/joy/templates/${template.name}/App.${
                          item.codeVariant === 'TS' ? 'tsx' : 'js'
                        }`,
                      })
                      .openSandbox()
                  }
                  sx={{ fontFamily: 'IBM Plex Sans' }}
                >
                  CodeSandbox
                </Button>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </List>
  );
}
