import * as React from 'react';
import clsx from 'clsx';
import Script from 'next/script';
// @ts-ignore
import LZString from 'lz-string';
import { GlobalStyles, decomposeColor } from '@mui/system';
import {
  TabsUnstyled,
  TabsListUnstyled,
  TabUnstyled,
  PopperUnstyled,
  PopperUnstyledOwnProps,
  ModalUnstyled,
} from '@mui/base';
import { CssVarsProvider, extendTheme, styled, useColorScheme, useTheme } from '@mui/joy/styles';
import type { Theme, ColorPaletteProp, VariantProp, PaletteRange } from '@mui/joy/styles';
import Avatar from '@mui/joy/Avatar';
import Badge from '@mui/joy/Badge';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Chip from '@mui/joy/Chip';
import Container from '@mui/joy/Container';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Link from '@mui/joy/Link';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Radio from '@mui/joy/Radio';
import Switch from '@mui/joy/Switch';
import SvgIcon from '@mui/joy/SvgIcon';
import TextField, { TextFieldProps } from '@mui/joy/TextField';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import RadioGroup from '@mui/joy/RadioGroup';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import CheckIcon from '@mui/icons-material/Check';
import BrandingProvider from 'docs/src/BrandingProvider';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import codeSandbox from 'docs/src/modules/sandbox/CodeSandbox';
import extractTemplates from 'docs/src/modules/utils/extractTemplates';

function compress(object: any) {
  return LZString.compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

function addHiddenInput(form: any, name: string, value: any) {
  const input = document.createElement('input');
  input.type = 'hidden';
  input.name = name;
  input.value = value;
  form.appendChild(input);
}

function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const RANGE = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;
const VARIANTS = ['plain', 'outlined', 'soft', 'solid'] as const;
const STATES = ['', 'Hover', 'Active', 'Disabled'] as const;
const PROPERTIES = ['Bg', 'Color', 'Border'] as const;

const getColorVars = (palette: ColorPaletteProp) => {
  const range: string[] = [];
  RANGE.forEach((r) => {
    range.push(`var(--joy-palette-${palette}-${r})`);
  });
  VARIANTS.forEach((v) => {
    STATES.forEach((s) => {
      PROPERTIES.forEach((p) => {
        range.push(`var(--joy-palette-${palette}-${v}${s}${p})`);
      });
    });
  });
  return range;
};

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackdropUnstyled = React.forwardRef<HTMLDivElement, { open?: boolean; className: string }>(
  (props, ref) => {
    const { open, className, ...other } = props;
    return <div className={clsx({ 'MuiBackdrop-open': open }, className)} ref={ref} {...other} />;
  },
);

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.72);
  backdrop-filter: blur(4px);
  -webkit-tap-highlight-color: transparent;
`;

const StyledTabs = styled('div')({
  position: 'relative',
  zIndex: 1,
});
const StyledTabList = styled('div')({
  display: 'flex',
});
const StyledTab = styled('button')(({ theme }) => ({
  padding: '8px 16px',
  display: 'flex',
  alignItems: 'center',
  minHeight: 40,
  border: 'none',
  borderBottom: '2px solid transparent',
  background: 'transparent',
  outline: 'none',
  [theme.focus.selector]: {
    ...theme.focus.default,
    outlineOffset: '-4px',
  },
  '&.Mui-selected': {
    borderBottomColor: theme.vars.palette.primary[500],
    color: theme.vars.palette.primary.plainColor,
  },
}));

const IOSTabList = styled('div')(({ theme }) => ({
  ...theme.variants.soft.neutral,
  borderRadius: theme.vars.radius.md,
  display: 'flex',
  padding: '4px',
  gap: '4px',
}));
const IOSTab = styled('button')(({ theme }) => ({
  border: 'none',
  fontSize: theme.vars.fontSize.xs,
  fontWeight: theme.vars.fontWeight.md,
  padding: theme.spacing(0.75, 1.5),
  textAlign: 'center',
  flex: 1,
  borderRadius: theme.vars.radius.sm,
  backgroundColor: 'initial',
  color: theme.vars.palette.text.secondary,
  cursor: 'pointer',
  [theme.focus.selector]: theme.focus.default,
  '&.Mui-selected': {
    backgroundColor: theme.vars.palette.background.surface,
    boxShadow: theme.vars.shadow.sm,
    color: theme.vars.palette.text.primary,
  },
}));

const StyledPopper = styled(Sheet)(({ theme }) => ({
  zIndex: 1000,
  boxShadow: theme.vars.shadow.md,
  borderRadius: theme.vars.radius.sm,
  height: 240,
  overflow: 'auto',
}));

const ComponentsGrid = ({ variant, color }: { variant: VariantProp; color: ColorPaletteProp }) => {
  const props = { variant, color };
  const components = [
    { name: 'Avatar', element: <Avatar {...props}>AB</Avatar> },
    {
      name: 'Badge',
      element: (
        <Badge badgeContent="99+" {...props}>
          <Box sx={{ width: 40, height: 40, bgcolor: 'background.level3' }} />
        </Badge>
      ),
    },
    {
      name: 'Button',
      element: (
        <Button {...props} endIcon={<KeyboardArrowRight />}>
          Button
        </Button>
      ),
    },
    {
      name: 'Card',
      element: (
        <Card {...props}>
          <Typography level="inherit" fontSize="md" fontWeight="md">
            Yosemite National Park
          </Typography>
          <Typography level="body2" sx={{ mt: 0.5 }}>
            California
          </Typography>
        </Card>
      ),
    },
    {
      name: 'Checkbox',
      element: (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Checkbox {...props} checked={false} label="unchecked" />
          <Checkbox {...props} checked label="checked" />
        </Box>
      ),
    },
    {
      name: 'Chip',
      element: (
        <Chip {...props} onClick={() => {}} startDecorator={<FavoriteBorder />}>
          Light
        </Chip>
      ),
    },
    {
      name: 'IconButton',
      element: (
        <IconButton {...props}>
          <FavoriteBorder />
        </IconButton>
      ),
    },
    {
      name: 'Input',
      element: <Input placeholder="Placeholder" {...props} />,
    },
    {
      name: 'Link',
      element: <Link {...props}>Link</Link>,
    },
    {
      name: 'List',
      element: (
        <List {...props} sx={{ mx: 2, '--List-padding': '8px', '--List-gap': '4px' }}>
          <ListItem {...props}>Item 1</ListItem>
          <ListItem {...props}>Item 2</ListItem>
        </List>
      ),
    },
    {
      name: 'ListItemButton',
      element: (
        <List sx={{ mx: 2 }}>
          <ListItemButton {...props}>Button</ListItemButton>
        </List>
      ),
    },
    {
      name: 'Radio',
      element: (
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Radio {...props} checked={false} label="unchecked" />
          <Radio {...props} checked label="checked" />
        </Box>
      ),
    },
    {
      name: 'Switch',
      element: <Switch {...props} />,
    },
    {
      name: 'Typography',
      element: <Typography {...props}>Text</Typography>,
    },
  ];
  return (
    <Sheet
      sx={{
        my: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gridAutoRows: 'minmax(120px, auto)',
        borderWidth: '1px 0px 0px 1px',
        borderStyle: 'solid',
        borderColor: 'divider',
        maxHeight: 'calc(100vh - 200px)',
        overflowY: 'auto',
        '& > div': {
          borderWidth: '0 1px 1px 0',
          borderStyle: 'solid',
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          pt: 4,
          pb: 1,
        },
      }}
    >
      {components.map((item) => (
        <div key={item.name}>
          <Chip
            variant="soft"
            color="neutral"
            size="sm"
            sx={{
              position: 'absolute',
              top: '0px',
              left: '0px',
              borderRadius: 0,
              fontSize: 'xs2',
            }}
          >
            {item.name}
          </Chip>
          {item.element}
        </div>
      ))}
    </Sheet>
  );
};

const ColorField = ({
  value,
  minLabelWidth,
  onValidColor,
  onEmptyColor,
  ...props
}: TextFieldProps & {
  minLabelWidth: number | string;
  onValidColor: (color: string) => void;
  onEmptyColor: () => void;
  value: string;
}) => {
  const [internalValue, setInternalValue] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const focused = React.useRef(false);
  React.useEffect(() => {
    if (value !== internalValue && !focused.current) {
      setInternalValue(value || '');
    }
  }, [value, internalValue]);
  return (
    <TextField
      {...props}
      placeholder="e.g. #fff"
      size="sm"
      error={isError}
      endDecorator={
        internalValue && !isError ? (
          <Sheet
            variant="outlined"
            sx={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              mr: -0.5,
              bgcolor: internalValue,
            }}
          />
        ) : null
      }
      value={internalValue}
      onFocus={(event) => {
        (event.target as HTMLInputElement).select();
        focused.current = true;
      }}
      onBlur={() => {
        focused.current = false;
      }}
      onChange={(event) => {
        const { value: inputValue } = event.target;
        setInternalValue(inputValue);
        if (inputValue === '') {
          onEmptyColor();
          setIsError(false);
        } else {
          try {
            decomposeColor(inputValue); // if inputValue is not a valid color, it throws an error
            onValidColor(inputValue);
            setIsError(false);
          } catch (error) {
            setIsError(true);
          }
        }
      }}
      sx={{ flexDirection: 'row', '& > label': { minWidth: minLabelWidth, mb: 0 } }}
    />
  );
};

const PaletteRangeForm = ({
  palette,
  setPaletteToken,
}: {
  palette: ColorPaletteProp;
  setPaletteToken: (colorScheme: string, scale: string, value: string) => void;
}) => {
  const theme = useTheme();
  return (
    <React.Fragment>
      {RANGE.map((scale) => (
        <ColorField
          key={scale}
          label={`${scale}:`}
          minLabelWidth={32}
          value={theme.palette[palette][scale]}
          onValidColor={(val) => setPaletteToken(theme.palette.colorScheme, scale, val)}
          onEmptyColor={() => setPaletteToken(theme.palette.colorScheme, scale, '')}
        />
      ))}
    </React.Fragment>
  );
};

const ColorAutocomplete = ({
  value,
  minLabelWidth,
  onValidColor,
  onEmptyColor,
  tokens,
  ...props
}: TextFieldProps & {
  minLabelWidth: number | string;
  onValidColor: (color: string) => void;
  onEmptyColor: () => void;
  value: string;
  tokens: string[];
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [internalValue, setInternalValue] = React.useState('');
  const [isError, setIsError] = React.useState(false);
  const focused = React.useRef(false);
  const clickingRef = React.useRef(false);
  const scrollableRef = React.useRef<HTMLDivElement | null>(null);
  const matches: string[] = [];
  const unmatches: string[] = [];
  tokens.forEach((item) => {
    if (internalValue && item.includes(internalValue)) {
      matches.push(item);
    } else {
      unmatches.push(item);
    }
  });
  const modifiers = React.useMemo<PopperUnstyledOwnProps['modifiers']>(
    () => [
      {
        name: 'offset',
        options: {
          offset: [0, 4],
        },
      },
    ],
    [],
  );
  React.useEffect(() => {
    if (value !== internalValue && !focused.current && !anchorEl) {
      // sync value only when input is not focused and popup is not open
      // meanining when user is not interact with this field.
      setInternalValue(value || '');
    }
  }, [value, internalValue, anchorEl]);
  const renderOption = (variable: string) => (
    <ListItemButton
      key={variable}
      onMouseDown={() => {
        clickingRef.current = true; // this is called before input's onBlur to not close the popup
      }}
      onClick={() => {
        clickingRef.current = false; // reset the clickingRef
        setIsError(false);
        setInternalValue(variable);
        onValidColor(variable);
        setAnchorEl(null); // close the popup
      }}
    >
      <ListItemDecorator>
        <Sheet
          variant="outlined"
          sx={{
            width: 16,
            height: 16,
            borderRadius: '50%',
            bgcolor: variable,
          }}
        />
      </ListItemDecorator>
      {variable.replace(/var\(--joy-([^)]+)\)/, '$1')}
    </ListItemButton>
  );
  return (
    <React.Fragment>
      <TextField
        {...props}
        placeholder="e.g. #fff"
        size="sm"
        error={isError}
        value={internalValue}
        endDecorator={
          internalValue && !isError ? (
            <Sheet
              variant="outlined"
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                mr: -0.5,
                bgcolor: internalValue,
              }}
            />
          ) : null
        }
        sx={{
          flexDirection: 'row',
          gap: 0.5,
          '& > label': { minWidth: 80, mb: 0, '& + div': { flexGrow: 1, fontSize: 'xs' } },
        }}
        onChange={(event) => {
          const { value: inputValue } = event.target;
          setInternalValue(inputValue);
          if (scrollableRef.current) {
            scrollableRef.current.scrollTop = 0;
          }
          if (inputValue === '') {
            onEmptyColor();
            setIsError(false);
          } else if (inputValue.match(/var\(--joy-[^)]+\)/)) {
            onValidColor(inputValue);
            setIsError(false);
          } else {
            try {
              decomposeColor(inputValue); // if inputValue is not a valid color, it throws an error
              onValidColor(inputValue);
              setIsError(false);
            } catch (error) {
              setIsError(true);
            }
          }
        }}
        onFocus={(event) => {
          (event.target as HTMLInputElement).select();
          setAnchorEl(event.target.parentNode as HTMLElement);
          focused.current = true;
        }}
        onBlur={() => {
          focused.current = false;
          if (!clickingRef.current) {
            // don't close if clicking on the option
            setAnchorEl(null);
          }
        }}
      />
      <PopperUnstyled
        ref={scrollableRef}
        variant="outlined"
        component={StyledPopper}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        modifiers={modifiers}
        placement="bottom-start"
      >
        <List
          component="div"
          size="sm"
          sx={{
            '--List-item-fontSize': '12px',
            '--List-decorator-width': '20px',
          }}
        >
          {matches.length > 0 ? (
            <React.Fragment>
              <ListItem
                sticky
                sx={{
                  letterSpacing: 'md',
                  textTransform: 'uppercase',
                  fontSize: 'xs2',
                  fontWeight: 'lg',
                }}
              >
                Best matches
              </ListItem>
              {matches.map(renderOption)}
              <ListItem
                sticky
                sx={{
                  letterSpacing: 'md',
                  textTransform: 'uppercase',
                  fontSize: 'xs2',
                  fontWeight: 'lg',
                }}
              >
                Others
              </ListItem>
              {unmatches.map(renderOption)}
            </React.Fragment>
          ) : (
            unmatches.map(renderOption)
          )}
        </List>
      </PopperUnstyled>
    </React.Fragment>
  );
};

const VariantStyleForm = ({
  variant,
  palette,
  setPaletteToken,
}: {
  variant: VariantProp;
  palette: ColorPaletteProp;
  setPaletteToken: (colorScheme: string, scale: string, value: string) => void;
}) => {
  const [state, setState] = React.useState('initial');
  const theme = useTheme();
  const bgToken = `${variant}${
    state === 'initial' ? '' : capitalize(state)
  }Bg` as keyof PaletteRange;
  const borderToken = `${variant}${
    state === 'initial' ? '' : capitalize(state)
  }Border` as keyof PaletteRange;
  const colorToken = `${variant}${
    state === 'initial' ? '' : capitalize(state)
  }Color` as keyof PaletteRange;
  const tokens = React.useMemo(() => getColorVars(palette), [palette]);
  return (
    <React.Fragment>
      <TabsUnstyled
        component={StyledTabs}
        value={state}
        onChange={(event, value) => setState(value as VariantProp)}
      >
        <TabsListUnstyled component={IOSTabList}>
          <TabUnstyled component={IOSTab} value="initial">
            initial
          </TabUnstyled>
          <TabUnstyled component={IOSTab} value="hover">
            hover
          </TabUnstyled>
          <TabUnstyled component={IOSTab} value="active">
            active
          </TabUnstyled>
          <TabUnstyled component={IOSTab} value="disabled">
            disabled
          </TabUnstyled>
        </TabsListUnstyled>
      </TabsUnstyled>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1.5 }}>
        <ColorAutocomplete
          label="background:"
          minLabelWidth={80}
          tokens={tokens}
          value={theme.palette[palette][bgToken]}
          onValidColor={(val) => setPaletteToken(theme.palette.colorScheme, bgToken, val)}
          onEmptyColor={() => setPaletteToken(theme.palette.colorScheme, bgToken, '')}
        />
        <ColorAutocomplete
          label="border-color:"
          minLabelWidth={80}
          tokens={tokens}
          value={theme.palette[palette][borderToken]}
          onValidColor={(val) => setPaletteToken(theme.palette.colorScheme, borderToken, val)}
          onEmptyColor={() => setPaletteToken(theme.palette.colorScheme, borderToken, '')}
        />
        <ColorAutocomplete
          label="color:"
          minLabelWidth={80}
          tokens={tokens}
          value={theme.palette[palette][colorToken]}
          onValidColor={(val) => setPaletteToken(theme.palette.colorScheme, colorToken, val)}
          onEmptyColor={() => setPaletteToken(theme.palette.colorScheme, colorToken, '')}
        />
      </Box>
      <Typography level="body3" mt={1}>
        ***The value must be added for both light and dark color schemes to work properly.
      </Typography>
    </React.Fragment>
  );
};

const ColorSchemeToggle = () => {
  const [mounted, setMounted] = React.useState(false);
  const { mode, setMode } = useColorScheme();
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  return (
    <IconButton
      size="sm"
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      sx={{ position: 'absolute', top: '1rem', right: '1rem' }}
    >
      {mode === 'dark' ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
};

const isObjectEmpty = (object: Record<string, any>) => {
  return Object.keys(object).length === 0;
};

const CodeResult = ({
  lightPalette,
  darkPalette,
}: {
  lightPalette: Record<string, any>;
  darkPalette: Record<string, any>;
}) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const lightPaletteNotEmpty = ['primary', 'neutral', 'danger', 'info', 'success', 'warning'].some(
    // @ts-ignore
    (c) => !isObjectEmpty(lightPalette[c]),
  );
  const darkPaletteNotEmpty = ['primary', 'neutral', 'danger', 'info', 'success', 'warning'].some(
    // @ts-ignore
    (c) => !isObjectEmpty(darkPalette[c]),
  );
  const filteredLightPalette: typeof lightPalette = {};
  Object.keys(lightPalette).forEach((p) => {
    if (!isObjectEmpty(lightPalette[p])) {
      filteredLightPalette[p] = lightPalette[p];
    }
  });
  const filteredDarkPalette: typeof darkPalette = {};
  Object.keys(darkPalette).forEach((p) => {
    if (!isObjectEmpty(darkPalette[p])) {
      filteredDarkPalette[p] = darkPalette[p];
    }
  });
  if (!mounted) {
    return null;
  }
  // @ts-ignore
  if (!window.prettier || !window.prettierPlugins) {
    return null;
  }
  const code = // @ts-ignore
    window.prettier.format(
      // TODO: this can be extracted to utils which leverage code spliting. ref: https://github.com/reactjs/reactjs.org/pull/4675/files#diff-a61e22f2361e0263647a61bb60382a75c3f1063ce8d415b30ce08949e54c4079
      `extendTheme({
colorSchemes: {
  light: {
    palette: ${JSON.stringify(filteredLightPalette)}
  },
  dark: {
    palette: ${JSON.stringify(filteredDarkPalette)}
  }
}
});`,
      {
        parser: 'babel',
        // @ts-ignore
        plugins: window.prettierPlugins,
      },
    );
  const { result } = extractTemplates({
    './result/App.tsx': `import * as React from 'react';
import { CssVarsProvider, useColorScheme, extendTheme } from '@mui/joy/styles';
import Button from "@mui/joy/Button";

const ColorSchemeToggle = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <Button variant="outlined" color="primary" />;
  }
  return (
    <Button
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
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
};

const theme = ${code}

export default function App() {
  return (
    <CssVarsProvider theme={theme}>
      <ColorSchemeToggle />
    </CssVarsProvider>
  );
};
`,
  });
  return (
    <React.Fragment>
      <BrandingProvider>
        <HighlightedCode
          code={lightPaletteNotEmpty || darkPaletteNotEmpty ? code : ''}
          language="jsx"
          sx={{
            '& pre': { p: '8px', m: 0, '& code[class*="language-"]': { fontSize: '12px' } },
          }}
        />
      </BrandingProvider>
      <Button
        startIcon={
          <SvgIcon viewBox="0 0 1080 1080">
            <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
          </SvgIcon>
        }
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => {
          const { files } = codeSandbox.createJoyTemplate({
            ...result,
            githubLocation: '',
            title: `Joy UI - Variant theming starter`,
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
            result.codeVariant === 'TS' ? 'file=/App.tsx' : 'file=/App.js',
          );
          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
        }}
      >
        Open code sandbox
      </Button>
    </React.Fragment>
  );
};

const GetCode = (props: {
  lightPalette: Record<string, any>;
  darkPalette: Record<string, any>;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <React.Fragment>
      <Button
        color="success"
        onClick={handleOpen}
        sx={{ position: 'absolute', insetBlockEnd: '1rem', insetInline: '1rem' }}
      >
        See result
      </Button>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        components={{ Backdrop }}
      >
        <Sheet
          sx={{
            width: '60vw',
            boxShadow: '0 0 12px 0 rgba(0,0,0,0.8)',
            p: 3,
            minHeight: 200,
            borderRadius: 'lg',
          }}
        >
          <CodeResult {...props} />
        </Sheet>
      </Modal>
    </React.Fragment>
  );
};

export default function VariantStudio() {
  const [selectedVariant, setVariant] = React.useState<VariantProp>('outlined');
  const [selectedColor, setColor] = React.useState<ColorPaletteProp>('neutral');
  const [lightPalette, setLightPalette] = React.useState<Partial<Record<ColorPaletteProp, any>>>({
    primary: {},
    neutral: {},
    danger: {},
    info: {},
    success: {},
    warning: {},
  });
  const [darkPalette, setDarkPalette] = React.useState<Partial<Record<ColorPaletteProp, any>>>({
    primary: {},
    neutral: {},
    danger: {},
    info: {},
    success: {},
    warning: {},
  });
  const setPaletteToken = (colorScheme: string, token: string, value: string) => {
    let palette = lightPalette;
    let setPalette = setLightPalette;
    if (colorScheme === 'dark') {
      palette = darkPalette;
      setPalette = setDarkPalette;
    }
    const newPalette = {
      ...palette,
      [selectedColor]: { ...palette[selectedColor], [token]: value },
    };
    if (!value) {
      delete newPalette[selectedColor][token];
    }
    return setPalette(newPalette);
  };
  const rootTheme = React.useMemo(
    () =>
      extendTheme({
        colorSchemes: {
          light: {
            palette: {
              ...lightPalette,
              background: {
                body: 'var(--joy-palette-neutral-50)',
              },
            },
          },
          dark: {
            palette: darkPalette,
          },
        },
      }),
    [lightPalette, darkPalette],
  );
  return (
    <CssVarsProvider theme={rootTheme} disableTransitionOnChange>
      <Script src="https://unpkg.com/prettier@2.7.1/standalone.js" />
      <Script src="https://unpkg.com/prettier@2.7.1/parser-babel.js" />
      <GlobalStyles
        styles={(theme: Theme) => ({
          body: {
            backgroundColor: theme.vars.palette.background.body,
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
            fontSize: theme.vars.fontSize.md,
          },
          '*': {
            boxSizing: 'border-box',
          },
        })}
      />
      <Container>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Box sx={{ flexGrow: 1 }}>
            <Sheet
              sx={(theme) => ({
                pt: 3,
                zIndex: 1,
                boxShadow: `0 0 0 calc(50vmax - 1px) ${theme.vars.palette.background.surface}`,
                clipPath: 'inset(0px -50vmax)',
              })}
            >
              <Typography level="h1" fontSize="lg" mb={2}>
                ⚡️ Variant Studio
              </Typography>
              <TabsUnstyled
                component={StyledTabs}
                value={selectedVariant}
                onChange={(event, value) => setVariant(value as VariantProp)}
              >
                <TabsListUnstyled component={StyledTabList}>
                  <TabUnstyled component={StyledTab} value="plain">
                    Plain
                  </TabUnstyled>
                  <TabUnstyled component={StyledTab} value="outlined">
                    Outlined
                  </TabUnstyled>
                  <TabUnstyled component={StyledTab} value="soft">
                    Soft
                  </TabUnstyled>
                  <TabUnstyled component={StyledTab} value="solid">
                    Solid
                  </TabUnstyled>
                </TabsListUnstyled>
              </TabsUnstyled>
              <Box
                sx={(theme) => ({
                  mt: '-1px',
                  height: '1px',
                  bgcolor: 'divider',
                  boxShadow: `0 0 0 calc(50vmax - 1px) ${theme.vars.palette.divider}`,
                  clipPath: 'inset(0px -50vmax)',
                })}
              />
            </Sheet>
            <RadioGroup
              name="color-palette"
              row
              size="sm"
              value={selectedColor}
              onChange={(event) => setColor(event.target.value as ColorPaletteProp)}
              sx={{ px: 1, py: 2, gap: '1rem' }}
            >
              {(['primary', 'neutral', 'danger', 'info', 'success', 'warning'] as const).map(
                (name) => {
                  const checked = selectedColor === name;
                  return (
                    <Chip
                      key={name}
                      variant={checked ? 'solid' : 'outlined'}
                      color={name}
                      startDecorator={
                        checked && <CheckIcon sx={{ zIndex: 1, pointerEvents: 'none' }} />
                      }
                    >
                      <Radio
                        variant={checked ? 'solid' : 'soft'}
                        color={name}
                        disableIcon
                        overlay
                        label={name}
                        value={name}
                        checked={checked}
                      />
                    </Chip>
                  );
                },
              )}
            </RadioGroup>
            <ComponentsGrid variant={selectedVariant} color={selectedColor} />
          </Box>
          <Box sx={{ zIndex: 1, flexBasis: '400px', maxWidth: '400px', p: 1, height: '100vh' }}>
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                boxShadow: 'sm',
                height: '100%',
                p: 2,
                position: 'relative',
              }}
            >
              <ColorSchemeToggle />
              <Typography fontWeight="lg">
                <Typography variant="soft" color="neutral" mr={0.25} borderRadius="xs">
                  {selectedColor}
                </Typography>{' '}
                palette tokens
              </Typography>
              <Typography level="body3" mb={1}>
                These are semantic tokens that are generated for each palette.
              </Typography>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(2, minmax(0px, 1fr))',
                  columnGap: 1.5,
                  rowGap: 1,
                }}
              >
                <PaletteRangeForm palette={selectedColor} setPaletteToken={setPaletteToken} />
              </Box>
              <Typography fontWeight="lg" mt={3}>
                <Typography variant="soft" color="neutral" mr={0.25} borderRadius="xs">
                  {selectedVariant}
                </Typography>{' '}
                variant style
              </Typography>
              <Typography level="body3" mb={1}>
                For each variant and state, the styles are generated based on the value of each CSS
                property.
              </Typography>
              <VariantStyleForm
                palette={selectedColor}
                variant={selectedVariant}
                setPaletteToken={setPaletteToken}
              />
              <GetCode lightPalette={lightPalette} darkPalette={darkPalette} />
            </Sheet>
          </Box>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, py: 5, justifyContent: 'center' }}>
          <Typography>This screen is too small to render the studio.</Typography>
        </Box>
      </Container>
    </CssVarsProvider>
  );
}
