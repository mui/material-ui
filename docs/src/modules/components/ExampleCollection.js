import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';

const examples = [
  {
    name: 'Next.js App Router',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs',
    tsLink: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts',
    src: '/static/images/examples/next.svg',
  },
  {
    name: 'Vite.js',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-vite',
    tsLink: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-vite-ts',
    src: '/static/images/examples/vite.svg',
  },
  {
    name: 'Next.js Pages Router',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-pages-router',
    tsLink:
      'https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-pages-router-ts',
    src: '/static/images/examples/next.svg',
  },
  {
    name: 'Remix',
    label: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-remix-ts',
    src: '/static/images/examples/remix.svg',
  },
  {
    name: 'Tailwind CSS + CRA',
    label: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-cra-tailwind-ts',
    src: '/static/images/examples/tailwindcss.svg',
  },
  {
    name: 'Create React App',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-cra',
    tsLink: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-cra-ts',
    src: '/static/images/examples/cra.svg',
  },
  {
    name: 'styled-components',
    label: 'View JS example',
    tsLabel: 'View TS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-cra-styled-components',
    tsLink:
      'https://github.com/mui/material-ui/tree/master/examples/material-ui-cra-styled-components-ts',
    src: '/static/images/examples/styled.png',
  },
  {
    name: 'Gatsby',
    label: 'View JS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-gatsby',
    src: '/static/images/examples/gatsby.svg',
  },
  {
    name: 'Preact',
    label: 'View JS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-preact',
    src: '/static/images/examples/preact.svg',
  },
  {
    name: 'CDN',
    label: 'View JS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-via-cdn',
    src: <FilterDramaIcon />,
  },
  {
    name: 'Express.js (server-rendered)',
    label: 'View JS example',
    link: 'https://github.com/mui/material-ui/tree/master/examples/material-ui-express-ssr',
    src: '/static/images/examples/express.png',
  },
];

export default function ExampleCollection() {
  return (
    <Grid container spacing={2}>
      {examples.map((example) => (
        <Grid key={example.name} xs={12} sm={6}>
          <Card
            sx={[
              {
                p: 2,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                bgcolor: '#fff',
                backgroundImage: 'none',
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider',
                boxShadow: 'none',
              },
              (theme) =>
                theme.applyDarkStyles({
                  bgcolor: 'transparent',
                  borderColor: 'divider',
                }),
            ]}
          >
            <Avatar
              imgProps={{
                width: '40',
                height: '40',
                loading: 'lazy',
              }}
              {...(typeof example.src === 'string'
                ? { src: example.src }
                : { children: example.src })}
              alt={example.name}
            />
            <div>
              <Typography variant="body" fontWeight="semiBold">
                {example.name}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                }}
                data-ga-event-category="material-ui-example"
                data-ga-event-label={example.name}
                data-ga-event-action="click"
              >
                <Link
                  href={example.link}
                  variant="body2"
                  sx={{
                    fontWeight: 'medium',
                    display: 'flex',
                    alignItems: 'center',
                    mt: 0.5,
                  }}
                >
                  {example.label}
                  <ChevronRightRoundedIcon fontSize="small" />
                </Link>
                {!!example.tsLink && (
                  <React.Fragment>
                    <Typography
                      variant="caption"
                      sx={{
                        display: { xs: 'none', sm: 'block' },
                        opacity: 0.2,
                        mr: 0.75,
                      }}
                    >
                      /
                    </Typography>
                    <Link
                      href={example.tsLink}
                      variant="body2"
                      sx={{
                        fontWeight: 'medium',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {example.tsLabel}
                      <ChevronRightRoundedIcon fontSize="small" />
                    </Link>
                  </React.Fragment>
                )}
              </Box>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
