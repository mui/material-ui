import * as React from 'react';
import LZString from 'lz-string';
import startCase from 'lodash/startCase';
import NextLink from 'next/link';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
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
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 0 },
        flexGrow: 1,
        display: 'grid',
        gap: 4,
        gridTemplateColumns: 'repeat(auto-fill, minmax(256px, 1fr))',
      }}
    >
      {Object.keys(templates).map((name) => {
        const item = templates[name];
        return (
          <Card key={name} sx={{ bgcolor: 'initial', boxShadow: 'none', p: 0 }}>
            <AspectRatio>
              <img alt="" src="/static/images/cards/yosemite.jpeg" />
            </AspectRatio>
            <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
              <Typography component="h3" fontSize="xl" fontWeight="lg">
                {startCase(name)}
              </Typography>
              <Box sx={{ ml: 'auto', display: 'flex', gap: 1, zIndex: 1 }}>
                <NextLink href={`/joy-ui/templates/${name}/`} passHref>
                  <IconButton
                    component="a"
                    variant="plain"
                    color="neutral"
                    data-ga-event-category="joy-template"
                    data-ga-event-label={name}
                    data-ga-event-action="preview"
                  >
                    <Visibility />
                  </IconButton>
                </NextLink>
                <IconButton
                  variant="plain"
                  color="neutral"
                  data-ga-event-category="joy-template"
                  data-ga-event-label={name}
                  data-ga-event-action="codesandbox"
                  onClick={() => {
                    const { files } = codeSandbox.createJoyTemplate({
                      ...item,
                      title: name,
                    });
                    console.log('files', files);
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
                >
                  <SvgIcon viewBox="0 0 1024 1024">
                    <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                  </SvgIcon>
                </IconButton>
              </Box>
            </Box>
          </Card>
        );
      })}
    </Box>
  );
}
