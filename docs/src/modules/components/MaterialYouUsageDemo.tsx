import * as React from 'react';
import { useTheme as md2UseTheme } from '@mui/material/styles';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel, { formLabelClasses } from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import {
  extendTheme,
  CssVarsProvider as MaterialYouCssVarsProvider,
  useColorScheme,
} from '@mui/material-next/styles';

type Mode = 'light' | 'dark' | 'system';

const materialYouTheme = extendTheme();
const shallowEqual = (item1: { [k: string]: any }, item2: { [k: string]: any }) => {
  let equal = true;
  Object.entries(item1).forEach(([key, value]: [string, any]) => {
    if (item2[key] !== value) {
      equal = false;
    }
  });
  return equal;
};

const defaultGetCodeBlock = (code: string) => code;

function createCode(
  data: {
    name: string;
    props: Record<string, string | number | boolean>;
    childrenAccepted?: boolean;
  },
  getCodeBlock = defaultGetCodeBlock,
) {
  const { props: inProps, name, childrenAccepted } = data;
  const closedJsx = childrenAccepted ? '>' : '/>';
  let code = `<${name}`;
  const props = Object.entries(inProps).sort((a, b) => a[0].localeCompare(b[0]));

  if (!Object.keys(props).length) {
    code = `${code} ${closedJsx}`;
  } else {
    let children = '';
    props.forEach((prop) => {
      if (prop[0] !== 'children' && prop[1] !== undefined) {
        if (props.length <= 2) {
          if (typeof prop[1] === 'boolean') {
            code = `${code} ${prop[0]}${prop[1] ? '' : '={false}'}`;
          } else if (typeof prop[1] === 'function') {
            code = `${code} ${prop[0]}={${(prop[1] as Function).toString()}}`;
          } else {
            code = `${code} ${prop[0]}=${
              typeof prop[1] === 'number' ? `{${prop[1]}}` : `"${prop[1]}"`
            }`;
          }
        } else if (typeof prop[1] === 'function') {
          code = `${code}\n  ${prop[0]}={${(prop[1] as Function).toString()}}`;
        } else if (typeof prop[1] === 'boolean') {
          code = `${code}\n  ${prop[0]}${prop[1] ? '' : '={false}'}`;
        } else {
          code = `${code}\n  ${prop[0]}=${
            typeof prop[1] === 'number' ? `{${prop[1]}}` : `"${prop[1]}"`
          }`;
        }
      } else {
        children = prop[1] as string;
      }
    });
    if (children) {
      code = `${code}${props.length > 2 ? `\n>` : '>'}\n  ${children}\n</${name}>`;
    } else {
      code = `${code}${props.length > 2 ? `\n${closedJsx}` : `${childrenAccepted ? '>' : ' />'}`}`;
    }
  }

  return getCodeBlock(code);
}

export const prependLinesSpace = (code: string, size: number = 2) => {
  const newCode: string[] = [];
  code.split('\n').forEach((line) => {
    newCode.push(`${Array(size).fill(' ').join('')}${line}`);
  });
  return newCode.join('\n');
};

function ModeSwitcher({ md2Mode }: { md2Mode: Mode }) {
  const { setMode } = useColorScheme();
  React.useEffect(() => {
    setMode(md2Mode);
  }, [md2Mode, setMode]);
  return null;
}

interface MaterialYouUsageDemoProps<ComponentProps> {
  /**
   * Name of the component to show in the code block.
   */
  componentName: string;
  /**
   * For displaying the close bracket of the component in the code block.
   * if `true`, shows '>' otherwise shows '/>'
   */
  childrenAccepted?: boolean;
  /**
   * Configuration
   */
  data: Array<{
    /**
     * Name of the prop, e.g. 'children'
     */
    propName: Extract<keyof ComponentProps, string>;
    /**
     * The controller to be used:
     * - `switch`: render the switch component for boolean
     * - `color`: render the built-in color selector
     * - `select`: render <select> with the specified options
     * - `input`: render <input />
     * - `radio`: render group of radios
     */
    knob?:
      | 'switch'
      | 'color'
      | 'select'
      | 'input'
      | 'radio'
      | 'controlled'
      | 'number'
      | 'placement';
    /**
     * The options for these knobs: `select` and `radio`
     */
    options?: Array<string>;
    /**
     * The labels for these knobs: `radio`
     */
    labels?: Array<string>;
    /**
     * The default value to be used by the components.
     * If exists, it will be injected to the `renderDemo` callback but it will not show
     * in the code block.
     *
     * To make it appears in the code block, specified `codeBlockDisplay: true`
     */
    defaultValue?: string | number | boolean;
    /**
     * If not specify (`undefined`), the prop displays when user change the value
     * If `true`, the prop with defaultValue will always display in the code block.
     * If `false`, the prop does not display in the code block.
     */
    codeBlockDisplay?: boolean;
    onChange?: (event: React.SyntheticEvent) => void;
  }>;
  /**
   * A function to override the code block result.
   */
  getCodeBlock?: (code: string, props: ComponentProps) => string;
  renderDemo: (props: ComponentProps) => React.ReactElement;
}

export default function MaterialYouUsageDemo<T extends { [k: string]: any } = {}>({
  componentName,
  childrenAccepted = false,
  data,
  renderDemo,
  getCodeBlock = defaultGetCodeBlock,
}: MaterialYouUsageDemoProps<T>) {
  const initialProps = {} as { [k in keyof T]: any };
  let demoProps = {} as { [k in keyof T]: any };
  let codeBlockProps = {} as { [k in keyof T]: any };
  data.forEach((p) => {
    demoProps[p.propName] = p.defaultValue;
    if (p.codeBlockDisplay) {
      initialProps[p.propName] = p.defaultValue;
    }
    if (!p.knob) {
      codeBlockProps[p.propName] = p.defaultValue;
    }
  });
  const [props, setProps] = React.useState<T>(initialProps as T);
  demoProps = { ...demoProps, ...props };
  codeBlockProps = { ...props, ...codeBlockProps };
  data.forEach((p) => {
    if (p.codeBlockDisplay === false) {
      delete codeBlockProps[p.propName];
    }
  });

  const md2Theme = md2UseTheme();
  return (
    <Box
      sx={{
        flexGrow: 1,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        '& .markdown-body pre': {
          margin: 0,
          borderRadius: 'md',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 999, minWidth: 0, p: 3 }}>
        <Box
          sx={{
            flexGrow: 1,
            m: 'auto',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <MaterialYouCssVarsProvider theme={materialYouTheme}>
            <ModeSwitcher md2Mode={md2Theme.palette.mode} />
            {renderDemo(demoProps)}
          </MaterialYouCssVarsProvider>
        </Box>
        <BrandingProvider mode="dark">
          <HighlightedCode
            code={createCode(
              {
                name: componentName,
                props: codeBlockProps,
                childrenAccepted,
              },
              (code) => getCodeBlock(code, demoProps),
            )}
            language="jsx"
            sx={{ display: { xs: 'none', md: 'block' } }}
          />
        </BrandingProvider>
      </Box>
      <Box
        sx={{
          flexShrink: 0,
          gap: 2,
          p: 3,
          mt: 1,
          borderLeft: '1px solid',
          borderColor: 'divider',
          backdropFilter: 'blur(8px)',
          minWidth: '280px',
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography id="usage-props" component="h3" fontWeight="lg" sx={{ scrollMarginTop: 160 }}>
            Playground
          </Typography>
          <IconButton
            aria-label="Reset all"
            size="small"
            onClick={() => setProps(initialProps as T)}
            sx={{
              visibility: !shallowEqual(props, initialProps) ? 'visible' : 'hidden',
            }}
          >
            <ReplayRoundedIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
            [`& .${formLabelClasses.root}`]: {
              fontWeight: 'lg',
            },
          }}
        >
          {data.map(({ propName, knob, options = [], defaultValue, onChange }) => {
            const resolvedValue = props[propName] ?? defaultValue;
            if (!knob) {
              return null;
            }
            if (knob === 'switch') {
              return (
                <FormControl
                  key={propName}
                  size="small"
                  // orientation="horizontal"
                  sx={{ justifyContent: 'space-between' }}
                >
                  <FormLabel sx={{ textTransform: 'capitalize' }}>{propName}</FormLabel>
                  <Switch
                    checked={Boolean(resolvedValue)}
                    onChange={(event) => {
                      setProps((latestProps) => ({
                        ...latestProps,
                        [propName]: event.target.checked,
                      }));
                      onChange?.(event);
                    }}
                    sx={{
                      fontSize: 'xs',
                      color: 'text.secondary',
                      textTransform: 'capitalize',
                    }}
                  />
                </FormControl>
              );
            }
            if (knob === 'select') {
              return (
                <FormControl key={propName} size="small">
                  <FormLabel sx={{ textTransform: 'capitalize' }}>{propName}</FormLabel>
                  <Select
                    placeholder="Select a variant..."
                    value={(resolvedValue || 'none') as string}
                    onChange={(event) => {
                      setProps((latestProps) => ({
                        ...latestProps,
                        [propName]: event.target.value,
                      }));
                      onChange?.(event as React.SyntheticEvent);
                    }}
                  >
                    {options.map((value) => (
                      <MenuItem key={value} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              );
            }
            return null;
          })}
        </Box>
      </Box>
    </Box>
  );
}
