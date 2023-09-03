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
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import Visibility from '@mui/icons-material/Visibility';
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
    link: 'https://twitter.com/MUI_hq',
  },
  SteveEberger: {
    name: 'Steve Ernstberger',
    link: 'https://twitter.com/SteveEberger',
  },
};

const templates = [
  {
    name: 'order-dashboard',
    author: authors.MUI,
    design: {
      name: 'Untitled UI',
      link: 'https://www.figma.com/community/file/1020079203222518115/%E2%9D%96-Untitled-UI-%E2%80%93-FREE-Figma-UI-kit-and-design-system',
    },
  },
  {
    name: 'profile-dashboard',
    author: authors.MUI,
    design: {
      name: 'Untitled UI',
      link: 'https://www.figma.com/community/file/1020079203222518115/%E2%9D%96-Untitled-UI-%E2%80%93-FREE-Figma-UI-kit-and-design-system',
    },
  },
  {
    name: 'messages',
    author: authors.SteveEberger,
    design: {
      name: 'Untitled UI',
      link: 'https://www.figma.com/community/file/1020079203222518115/%E2%9D%96-Untitled-UI-%E2%80%93-FREE-Figma-UI-kit-and-design-system',
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
      link: 'https://www.figma.com/community/file/1020079203222518115/%E2%9D%96-Untitled-UI-%E2%80%93-FREE-Figma-UI-kit-and-design-system',
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
    name: 'framesx-web-blocks',
    author: authors.MUI,
    design: {
      name: 'Frames X',
      link: 'https://framesxfigma.buninux.com/',
    },
  },
  {
    name: 'email',
    author: authors.MUI,
  },
];

export default function TemplateCollection() {
  const joyTemplates = sourceJoyTemplates();

  return (
    <List
      sx={{
        px: { xs: 2, sm: 0 },
        flexGrow: 1,
        gap: 4,
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
            sx={(theme) => ({
              bgcolor: 'initial',
              boxShadow: 'none',
              overflow: 'auto',
              transition: 'border-color 0.3s, transform 0.2s, box-shadow 0.4s',
              '&:hover': {
                '--joy-shadowChannel': 'var(--joy-palette-primary-lightChannel)',
                boxShadow: theme.shadow.md,
                borderColor: 'primary.500',
                transform: 'translateY(-2px)',
                [theme.getColorSchemeSelector('dark')]: {
                  '--joy-shadowChannel': 'var(--joy-palette-primary-darkChannel)',
                },
              },
            })}
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
                    background: `center/cover no-repeat url(/static/screenshots/joy-ui/getting-started/templates/${template.name}.jpg)`,
                    transition: '0.3s',
                    [theme.getColorSchemeSelector('dark')]: {
                      background: `center/cover no-repeat url(/static/screenshots/joy-ui/getting-started/templates/${template.name}-dark.jpg)`,
                    },
                  })}
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
                  />
                </NextLink>
              </AspectRatio>
            </CardOverflow>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                <Typography
                  component="h3"
                  fontSize="lg"
                  fontWeight="xl"
                  slotProps={{ endDecorator: { sx: { ml: 'auto' } } }}
                  sx={{ mr: 'auto' }}
                >
                  {startCase(template.name)}
                </Typography>
                <NextLink
                  href={`/joy-ui/getting-started/templates/${template.name}/`}
                  passHref
                  legacyBehavior
                >
                  <IconButton
                    component="a"
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    aria-label="See live preview"
                    data-ga-event-category="joy-template"
                    data-ga-event-label={template.name}
                    data-ga-event-action="preview"
                  >
                    <Visibility />
                  </IconButton>
                </NextLink>
                <IconButton
                  variant="outlined"
                  color="neutral"
                  size="sm"
                  aria-label="Code sandbox playground"
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
                >
                  <SvgIcon viewBox="0 0 1080 1080">
                    <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                  </SvgIcon>
                </IconButton>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                }}
              >
                {template.author && (
                  <Typography level="body-sm" fontWeight="md">
                    Built by{' '}
                    <Link
                      href={template.author.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <b>{template.author.name}</b>
                    </Link>
                  </Typography>
                )}
                {template.design && (
                  <React.Fragment>
                    <Typography level="caption" fontWeight="md" sx={{ mx: 0.5 }}>
                      •
                    </Typography>
                    <Typography level="body-sm" fontWeight="md">
                      Designed by{' '}
                      <Link
                        href={template.design.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <b>{template.design.name}</b>
                      </Link>
                    </Typography>
                  </React.Fragment>
                )}
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </List>
  );
}
