import * as React from 'react';
import LZString from 'lz-string';
import startCase from 'lodash/startCase';
import NextLink from 'next/link';
import { useTheme } from '@mui/joy/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import List from '@mui/joy/List';
import ListDivider from '@mui/joy/ListDivider';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';
import Visibility from '@mui/icons-material/Visibility';
import codeSandbox from 'docs/src/modules/sandbox/CodeSandbox';
import extractTemplates from 'docs/src/modules/utils/extractTemplates';

const cache = {};
const req = require.context('!raw-loader!./', true, /^\.\/[^/]+\/.*\.(js|tsx)$/);
req.keys().forEach((key) => {
  cache[key] = req(key);
});

function compress(object) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

function addHiddenInput(form, name, value) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

/**
 * To display a template on the site:
 * - Create a folder next to this file.
 * - The folder should have `App.(js|tsx)`
 * - The name of the folder will be used as the url and title
 */

export default function TemplateCollection() {
  const templates = extractTemplates(cache);
  const theme = useTheme();
  return (
    <List
      sx={{
        px: { xs: 2, sm: 0 },
        flexGrow: 1,
        gap: 4,
      }}
    >
      {Object.keys(templates).map((name, index) => {
        const item = templates[name];
        return (
          <React.Fragment key={name}>
            {index !== 0 && <ListDivider />}
            <Card
              component="li"
              key={name}
              sx={{
                bgcolor: 'initial',
                boxShadow: 'none',
                p: 0,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                  '& > *': {
                    minWidth: `clamp(0px, (400px - 100%) * 999 , 100%)`,
                  },
                }}
              >
                <Typography component="h3" fontSize="xl" fontWeight="xl">
                  {startCase(name)}
                </Typography>
                <NextLink
                  href={`/joy-ui/getting-started/templates/${name}/`}
                  passHref
                >
                  <Button
                    component="a"
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    data-ga-event-category="joy-template"
                    data-ga-event-label={name}
                    data-ga-event-action="preview"
                    startIcon={<Visibility />}
                    sx={{ ml: 'auto' }}
                  >
                    Live demo
                  </Button>
                </NextLink>
                <Button
                  variant="outlined"
                  color="neutral"
                  size="sm"
                  data-ga-event-category="joy-template"
                  data-ga-event-label={name}
                  data-ga-event-action="codesandbox"
                  onClick={() => {
                    const { files } = codeSandbox.createJoyTemplate({
                      ...item,
                      title: `${startCase(name)} Template - Joy UI`,
                      githubLocation: `${process.env.SOURCE_CODE_REPO}/blob/v${
                        process.env.LIB_VERSION
                      }/docs/data/joy/templates/${name}/App.${
                        item.codeVariant === 'TS' ? 'tsx' : 'js'
                      }`,
                    });
                    const parameters = compress({ files });

                    // ref: https://codesandbox.io/docs/api/#define-api
                    const form = document.createElement('form');
                    form.method = 'POST';
                    form.target = '_blank';
                    form.action = 'https://codesandbox.io/api/v1/sandboxes/define';
                    addHiddenInput(form, 'parameters', parameters);
                    addHiddenInput(
                      form,
                      'query',
                      item.codeVariant === 'TS' ? 'file=/App.tsx' : 'file=/App.js',
                    );
                    document.body.appendChild(form);
                    form.submit();
                    document.body.removeChild(form);
                  }}
                  startIcon={
                    <SvgIcon viewBox="0 0 1080 1080">
                      <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                    </SvgIcon>
                  }
                >
                  CodeSandbox
                </Button>
              </Box>
              <AspectRatio ratio="2" variant="outlined">
                <Box
                  sx={{
                    background: `center/cover no-repeat url(/static/screenshots/joy-ui/getting-started/templates/${name}${
                      theme.palette.mode === 'dark' ? '-dark' : ''
                    }.jpg)`,
                    transition: '0.3s',
                  }}
                />
              </AspectRatio>
            </Card>
          </React.Fragment>
        );
      })}
    </List>
  );
}
