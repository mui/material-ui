import * as React from 'react';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import { styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Typography from '@mui/joy/Typography';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import Check from '@mui/icons-material/Check';

const Select = styled('select')(({ theme }) => ({
  padding: '0.25rem',
  border: 'none',
  borderRadius: theme.radius.sm,
  width: '100%',
  minHeight: '2rem',
  ...theme.typography.body2,
  ...theme.variants.outlined.neutral,
  [theme.focus.selector]: {
    borderColor: theme.vars.palette.primary[500],
    boxShadow: `inset 0 0 0 1px ${theme.vars.palette.primary[500]}`,
    outline: 'none',
  },
}));

const defaultProps = {
  variant: 'plain',
  color: 'neutral',
};

function createCode(name, inProps) {
  let code = `<${name}`;
  const props = Object.entries(inProps).sort((a, b) => a[0] - b[0]);

  if (!Object.keys(props).length) {
    code = `${code} />`;
  } else {
    let children = '';
    props.forEach((prop) => {
      if (prop[0] !== 'children' && prop[1] !== undefined) {
        if (props.length <= 2) {
          code = `${code} ${prop[0]}=${
            typeof prop[1] === 'number' ? `{${prop[1]}}` : `"${prop[1]}"`
          }`;
        } else {
          code = `${code}\n  ${prop[0]}=${
            typeof prop[1] === 'number' ? `{${prop[1]}}` : `"${prop[1]}"`
          }`;
        }
      } else {
        children = prop[1];
      }
    });
    if (children) {
      code = `${code}>\n  ${children}\n</${name}>`;
    } else {
      code = `${code}${props.length > 2 ? `\n/>` : ` />`}`;
    }
  }

  return code;
}

export default function SheetUsage() {
  const [props, setProps] = React.useState({});
  const { variant = defaultProps.variant, color = defaultProps.color } = props;
  return (
    <Box
      sx={{
        m: -1.5,
        mt: 0.5,
        flexGrow: 1,
        maxWidth: 'calc(100% + 24px)',
        display: 'flex',
        gap: 1.5,
        '& .markdown-body pre': {
          margin: 0,
          borderRadius: 'xs',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 999 }}>
        <Box
          sx={{
            flexGrow: 1,
            m: 'auto',
            display: 'flex',
            alignItems: 'center',
            p: 2,
          }}
        >
          <Sheet
            {...props}
            sx={{
              width: 250,
              height: 200,
              m: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography sx={{ color: 'inherit' }} fontSize="md">
              Sheet
            </Typography>
          </Sheet>
        </Box>
        <BrandingProvider mode="dark">
          <HighlightedCode
            code={createCode('Sheet', { ...props, children: '...' })}
            language="jsx"
            sx={{ display: { xs: 'none', md: 'block' } }}
          />
        </BrandingProvider>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          p: 2,
          bgcolor: 'background.level1',
          borderRadius: 'xs',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            minWidth: '160px',
          }}
        >
          <Box>
            <Typography
              component="label"
              level="body2"
              fontWeight="lg"
              htmlFor="variant-select"
              mb={0.5}
            >
              variant
            </Typography>
            <Select
              id="variant-select"
              value={variant}
              onChange={(event) => {
                return setProps((latestProps) => ({
                  ...latestProps,
                  variant: event.target.value,
                }));
              }}
            >
              <option value="plain">plain</option>
              <option value="outlined">outlined</option>
              <option value="soft">soft</option>
              <option value="solid">solid</option>
            </Select>
          </Box>
          <Box>
            <Typography
              id="badge-color-selector"
              level="body2"
              fontWeight="lg"
              mb={1}
            >
              color
            </Typography>
            <RadioGroup
              row
              name="badge-color"
              aria-labelledby="badge-color-selector"
              value={color}
              onChange={(event) => {
                return setProps((latestProps) => ({
                  ...latestProps,
                  color: event.target.value,
                }));
              }}
              sx={{ flexWrap: 'wrap', gap: 1 }}
            >
              {['neutral', 'primary', 'danger', 'info', 'success', 'warning'].map(
                (value) => {
                  const checked = color === value;
                  return (
                    <Sheet
                      key={value}
                      sx={{ width: 28, height: 28, bgcolor: 'unset' }}
                    >
                      <Radio
                        variant="solid"
                        color={value}
                        label={value}
                        value={value}
                        disableIcon
                        overlay
                        sx={{
                          '& .JoyRadio-action': { bgcolor: `${value}.500` },
                          '& .JoyRadio-label': {
                            fontSize: '10px',
                            color: 'text.secondary',
                            position: 'absolute',
                            bottom: '-1rem',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            opacity: 0,
                            transition: '0.2s',
                          },
                          '&:hover, &.Joy-focusVisible': {
                            '& .JoyRadio-label': {
                              opacity: 1,
                              bottom: '-1.25rem',
                            },
                          },
                        }}
                      />
                      {checked && (
                        <Check
                          fontSize="md"
                          sx={{
                            color: '#fff',
                            zIndex: 1,
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            pointerEvents: 'none',
                          }}
                        />
                      )}
                    </Sheet>
                  );
                },
              )}
            </RadioGroup>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
