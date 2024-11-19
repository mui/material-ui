import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import SvgIcon from '@mui/material/SvgIcon';
import Visibility from '@mui/icons-material/Visibility';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';
import { useTranslate, type Translate } from '@mui/docs/i18n';
import { sxChip } from 'docs/src/modules/components/AppNavDrawerItem';

function layouts(translation: Translate) {
  return [
    {
      title: translation('dashboardToolpadTitle'),
      description: translation('dashboardToolpadDescr'),
      href: 'https://deploy-preview-4415--mui-toolpad-docs.netlify.app/toolpad/core/templates/nextjs-dashboard',
      source: 'https://github.com/mui/toolpad/tree/master/examples/core/auth-nextjs-themed',
      codeSandbox:
        'https://codesandbox.io/s/github/mui/toolpad/tree/master/examples/core/auth-nextjs-themed',
      stackBlitz: null,
      hasDarkMode: false,
      new: true,
    },
  ];
}

export default function ToolpadCoreTemplates() {
  const translation = useTranslate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, mb: 4 }}>
      {layouts(translation).map((layout) => {
        const templateId = layout.source.split('/').pop();
        const imagePath = new URL(layout.href).pathname;
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }} key={layout.title}>
            <Typography component="h3" variant="h6" sx={{ fontWeight: 'semiBold' }}>
              {layout.title}
              {layout.new && <Chip label="NEW" sx={sxChip('success')} />}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              {layout.description}
            </Typography>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderColor: 'divider',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  '&:hover > .MuiCardMedia-root': {
                    filter: 'blur(4px)',
                  },
                  '&:hover > .MuiButtonBase-root': {
                    opacity: 1,
                  },
                }}
              >
                <CardMedia
                  component="img"
                  // The image source is generated from `pnpm template:screenshot toolpad`, do not modify the image manually.
                  image={`/static/screenshots${imagePath.replace(/\/$/, '')}.jpg`}
                  title={layout.title}
                  sx={(theme) => ({
                    aspectRatio: '16 / 9',
                    objectPosition: 'top',
                    transition: 'filter 0.3s',
                    ...theme.applyStyles('dark', {
                      content: 'var(--src)',
                    }),
                  })}
                  style={{
                    // @ts-ignore Allow adding a CSS Variable
                    '--src': layout.hasDarkMode
                      ? `url(/static/screenshots${layout.href.replace(/\/$/, '')}-dark.jpg)`
                      : `url(/static/screenshots${layout.href.replace(/\/$/, '')}.jpg)`,
                  }}
                />
                <Button
                  variant="text"
                  endIcon={<OpenInNewRoundedIcon />}
                  component={Link}
                  href={layout.href}
                  data-ga-event-category="toolpad-core-template"
                  data-ga-event-label={layout.title}
                  data-ga-event-action="preview-img"
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    opacity: 0,
                    transition: 'opacity 0.5s ease',
                    backgroundColor: 'background.paper',
                    '&:hover': {
                      backgroundColor: 'background.default',
                    },
                  }}
                >
                  See live preview
                </Button>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 2,
                  borderTop: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {layout.stackBlitz ? (
                    <Tooltip title="Edit in StackBlitz">
                      <IconButton
                        color="primary"
                        size="small"
                        aria-label="StackBlitz playground"
                        data-ga-event-category="toolpad-core-template"
                        data-ga-event-label={templateId}
                        data-ga-event-action="stackblitz"
                        onClick={() => {
                          if (layout.stackBlitz) {
                            window.open(layout.stackBlitz, '_blank', 'noopener,noreferrer');
                          }
                        }}
                      >
                        <SvgIcon viewBox="0 0 19 28">
                          <path d="M8.13378 16.1087H0L14.8696 0L10.8662 11.1522L19 11.1522L4.13043 27.2609L8.13378 16.1087Z" />
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                  ) : null}
                  {layout.codeSandbox ? (
                    <Tooltip title="Edit in CodeSandbox">
                      <IconButton
                        color="primary"
                        size="small"
                        aria-label="CodeSandbox playground"
                        data-ga-event-category="toolpad-core-template"
                        data-ga-event-label={templateId}
                        data-ga-event-action="codesandbox"
                        onClick={() => {
                          window.open(layout.codeSandbox, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        <SvgIcon viewBox="0 0 1080 1080">
                          <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                        </SvgIcon>
                      </IconButton>
                    </Tooltip>
                  ) : null}
                  {layout.source ? (
                    <Tooltip title="See source code">
                      <IconButton component="a" href={layout.source} color="primary" size="small">
                        <CodeRoundedIcon />
                      </IconButton>
                    </Tooltip>
                  ) : null}
                </Box>
                {layout.href ? (
                  <Button
                    component="a"
                    href={layout.href}
                    size="small"
                    variant="outlined"
                    color="primary"
                    startIcon={<Visibility sx={{ mr: 0.5 }} />}
                    data-ga-event-category="toolpad-core-template"
                    data-ga-event-label={layout.title}
                    data-ga-event-action="preview-img"
                    sx={{ alignSelf: 'self-start' }}
                  >
                    Live preview
                  </Button>
                ) : null}
              </Box>
            </Card>
          </Box>
        );
      })}
    </Box>
  );
}
