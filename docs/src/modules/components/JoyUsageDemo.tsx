import * as React from 'react';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import { ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio, { radioClasses } from '@mui/joy/Radio';
import ListItemDecorator, { listItemDecoratorClasses } from '@mui/joy/ListItemDecorator';
import Switch from '@mui/joy/Switch';
import Select from '@mui/joy/Select';
import Option, { optionClasses } from '@mui/joy/Option';
import Sheet from '@mui/joy/Sheet';
import Check from '@mui/icons-material/Check';
import TextField from '@mui/joy/TextField';
import { inputClasses } from '@mui/joy/Input';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';

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

interface JoyUsageDemoProps<ComponentProps> {
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
    knob?: 'switch' | 'color' | 'select' | 'input' | 'radio' | 'number';
    /**
     * The options for these knobs: `select` and `radio`
     */
    options?: Array<string>;
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
  }>;
  /**
   * A function to override the code block result.
   */
  getCodeBlock?: (code: string, props: ComponentProps) => string;
  renderDemo: (props: ComponentProps) => React.ReactElement;
}

export default function JoyUsageDemo<T extends { [k: string]: any } = {}>({
  componentName,
  childrenAccepted = false,
  data,
  renderDemo,
  getCodeBlock = defaultGetCodeBlock,
}: JoyUsageDemoProps<T>) {
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
  return (
    <Box
      sx={{
        mt: 2,
        flexGrow: 1,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 2,
        '& .markdown-body pre': {
          margin: 0,
          borderRadius: 'sm',
        },
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 999, minWidth: 0 }}>
        <Box
          sx={{
            flexGrow: 1,
            m: 'auto',
            display: 'flex',
            alignItems: 'center',
            p: 1,
          }}
        >
          {renderDemo(demoProps)}
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
      <Sheet
        variant="outlined"
        sx={{
          flexShrink: 0,
          gap: 2,
          p: 2,
          borderRadius: 'sm',
        }}
      >
        <Box
          sx={{
            mb: 1,
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
            variant="outlined"
            color="neutral"
            size="sm"
            onClick={() => setProps(initialProps as T)}
            sx={{
              visibility: !shallowEqual(props, initialProps) ? 'visible' : 'hidden',
              '--IconButton-size': '30px',
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
          {data.map(({ propName, knob, options = [], defaultValue }) => {
            const resolvedValue = props[propName] ?? defaultValue;
            if (!knob) {
              return null;
            }
            if (knob === 'switch') {
              return (
                <FormControl
                  key={propName}
                  size="sm"
                  orientation="horizontal"
                  sx={{ justifyContent: 'space-between' }}
                >
                  <FormLabel sx={{ textTransform: 'capitalize' }}>{propName}</FormLabel>
                  <Switch
                    checked={Boolean(resolvedValue)}
                    onChange={(event) =>
                      setProps((latestProps) => ({
                        ...latestProps,
                        [propName]: event.target.checked,
                      }))
                    }
                    endDecorator={resolvedValue ? 'True' : 'False'}
                    componentsProps={{
                      endDecorator: {
                        sx: {
                          minWidth: 30,
                        },
                      },
                    }}
                    sx={{
                      fontSize: 'xs',
                      color: 'text.secondary',
                      textTransform: 'capitalize',
                      '--Switch-track-background': (theme) =>
                        `rgba(${theme.vars.palette.neutral.mainChannel} / 0.3)`,
                      '&:hover': {
                        '--Switch-track-background': (theme) =>
                          `rgba(${theme.vars.palette.neutral.mainChannel} / 0.5)`,
                      },
                    }}
                  />
                </FormControl>
              );
            }
            if (knob === 'radio') {
              const labelId = `${componentName}-${propName}`;
              return (
                <FormControl key={propName} size="sm">
                  <FormLabel sx={{ textTransform: 'capitalize' }}>{propName}</FormLabel>
                  <RadioGroup
                    row
                    name={labelId}
                    value={resolvedValue}
                    onChange={(event) =>
                      setProps((latestProps) => ({
                        ...latestProps,
                        [propName]: event.target.value,
                      }))
                    }
                    sx={{ flexWrap: 'wrap', gap: 1 }}
                  >
                    {options.map((value) => {
                      const checked = resolvedValue === value;
                      return (
                        <Chip
                          key={value}
                          variant="plain"
                          color={checked ? 'primary' : 'neutral'}
                          size="sm"
                          sx={{ bgcolor: 'background.body' }}
                        >
                          <Radio
                            size="sm"
                            variant={checked ? 'solid' : 'outlined'}
                            color={checked ? 'primary' : 'neutral'}
                            label={<Typography>{value}</Typography>}
                            value={value}
                            disableIcon
                            overlay
                          />
                        </Chip>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              );
            }
            if (knob === 'color') {
              return (
                <FormControl key={propName} sx={{ mb: 1 }} size="sm">
                  <FormLabel>Color</FormLabel>
                  <RadioGroup
                    row
                    name={`${componentName}-color`}
                    value={resolvedValue || ''}
                    onChange={(event) =>
                      setProps((latestProps) => ({
                        ...latestProps,
                        color: event.target.value,
                      }))
                    }
                    sx={{ flexWrap: 'wrap', gap: 1.5 }}
                  >
                    {['primary', 'neutral', 'danger', 'info', 'success', 'warning'].map((value) => {
                      const checked = resolvedValue === value;
                      return (
                        <Sheet
                          key={value}
                          sx={{
                            width: 28,
                            height: 28,
                            bgcolor: 'unset',
                            textTransform: 'capitalize',
                          }}
                        >
                          <Radio
                            variant="solid"
                            color={value as ColorPaletteProp}
                            label={value}
                            value={value}
                            disableIcon
                            overlay
                            sx={{
                              [`& .${radioClasses.action}`]: { bgcolor: `${value}.500` },
                              [`& .${radioClasses.label}`]: {
                                fontSize: '10px',
                                color: 'text.secondary',
                                position: 'absolute',
                                bottom: '-1rem',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                opacity: '0.01', // prevent double for touch device.
                                transition: '0.2s',
                              },
                              [`&:hover, &.${radioClasses.focusVisible}, &.${radioClasses.checked}`]:
                                {
                                  [`& .${radioClasses.label}`]: {
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
                    })}
                  </RadioGroup>
                </FormControl>
              );
            }
            if (knob === 'select') {
              return (
                <FormControl key={propName} size="sm">
                  <FormLabel sx={{ textTransform: 'capitalize' }}>{propName}</FormLabel>
                  <Select
                    placeholder="Select a variant..."
                    componentsProps={{
                      listbox: {
                        sx: {
                          '--List-decorator-size': '24px',
                        },
                      },
                    }}
                    value={(resolvedValue || 'none') as string}
                    onChange={(val) =>
                      setProps((latestProps) => ({
                        ...latestProps,
                        [propName]: val,
                      }))
                    }
                  >
                    {options.map((value) => (
                      <Option
                        key={value}
                        value={value}
                        label={value}
                        sx={{
                          [`&.${optionClasses.selected}`]: {
                            [`& .${listItemDecoratorClasses.root}`]: {
                              opacity: 1,
                            },
                          },
                        }}
                      >
                        <ListItemDecorator sx={{ opacity: 0 }}>
                          <CheckRounded />
                        </ListItemDecorator>
                        {value}
                      </Option>
                    ))}
                  </Select>
                </FormControl>
              );
            }
            if (knob === 'input') {
              return (
                <TextField
                  key={propName}
                  label={propName}
                  size="sm"
                  value={
                    typeof props[propName] === 'string'
                      ? props[propName] || ''
                      : String(defaultValue) || ''
                  }
                  onChange={(event) =>
                    setProps((latestProps) => ({
                      ...latestProps,
                      [propName]: event.target.value,
                    }))
                  }
                  sx={{
                    textTransform: 'capitalize',
                    [`& .${inputClasses.root}`]: {
                      bgcolor: 'background.body',
                    },
                  }}
                />
              );
            }
            if (knob === 'number') {
              return (
                <TextField
                  key={propName}
                  label={propName}
                  size="sm"
                  type="number"
                  value={
                    typeof props[propName] === 'number'
                      ? (props[propName] as number)
                      : (defaultValue as string)
                  }
                  onChange={(event) =>
                    setProps((latestProps) => ({
                      ...latestProps,
                      [propName]: Number.isNaN(event.target.valueAsNumber)
                        ? undefined
                        : event.target.valueAsNumber,
                    }))
                  }
                  sx={{
                    textTransform: 'capitalize',
                    [`& .${inputClasses.root}`]: {
                      bgcolor: 'background.body',
                    },
                  }}
                />
              );
            }
            return null;
          })}
        </Box>
      </Sheet>
    </Box>
  );
}
