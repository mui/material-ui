import * as React from 'react';
import { useRouter } from 'next/router';
import { GlobalStyles } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import ListDivider from '@mui/joy/ListDivider';
import Switch from '@mui/joy/Switch';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import Add from '@mui/icons-material/Add';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Key from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import Info from '@mui/icons-material/Info';
import TaskAlt from '@mui/icons-material/TaskAltRounded';
import Inbox from '@mui/icons-material/Inbox';
import Drafts from '@mui/icons-material/Drafts';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Star from '@mui/icons-material/StarBorder';
import Favorite from '@mui/icons-material/FavoriteBorder';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{
        p: '0.25rem',
        width: 'var(--Button-minHeight)',
      }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const ControlInput = ({ id, label = 'Label', unit, ...props }: any) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 80px',
        alignItems: 'center',
        my: 1,
        gap: 1,
        justifyContent: 'space-between',
      }}
    >
      <Typography
        htmlFor={id}
        component="label"
        sx={{ fontSize: 'var(--joy-fontSize-sm)', flexShrink: 0 }}
      >
        {label}
      </Typography>
      <Input
        id={id}
        size="sm"
        variant="light"
        {...props}
        endAdornment={
          unit ? (
            <Typography level="body3" sx={{ pointerEvents: 'none' }}>
              {unit}
            </Typography>
          ) : null
        }
      />
    </Box>
  );
};

const components: {
  name: string;
  render: (props: any) => React.ReactElement;
  cssVars: {
    id: string;
    type?: 'number';
    unit?: 'px';
    defaultValue?: number;
    inputProps?: React.AllHTMLAttributes<HTMLInputElement>;
  }[];
}[] = [
  {
    name: 'Button',
    render: (props: any) => (
      <React.Fragment>
        <Button {...props}>Text</Button>
        <Button startIcon={<Add />} variant="light" {...props}>
          Add more row
        </Button>
        <Button endIcon={<DeleteForever />} variant="outlined" {...props}>
          Delete
        </Button>
      </React.Fragment>
    ),
    cssVars: [
      { id: '--Button-minHeight', type: 'number', unit: 'px', defaultValue: 40 },
      { id: '--Button-gutter', type: 'number', unit: 'px', defaultValue: 24 },
      { id: '--Button-iconOffsetStep', type: 'number', defaultValue: 2 },
      { id: '--Button-gap', type: 'number', unit: 'px' },
    ],
  },
  {
    name: 'IconButton',
    render: (props: any) => (
      <React.Fragment>
        <IconButton color="success" {...props}>
          <Add />
        </IconButton>
        <IconButton variant="contained" color="danger" {...props}>
          <DeleteForever />
        </IconButton>
        <IconButton variant="outlined" color="primary" {...props}>
          <Moon />
        </IconButton>
        <IconButton variant="outlined" color="primary" shape="circular" {...props}>
          <Sun />
        </IconButton>
      </React.Fragment>
    ),
    cssVars: [{ id: '--IconButton-size', type: 'number', unit: 'px', defaultValue: 40 }],
  },
  {
    name: 'Switch',
    render: (props: any) => (
      <React.Fragment>
        <Switch variant="outlined" {...props} />
        <Switch variant="outlined" defaultChecked {...props} />
        <Switch variant="light" {...props} />
        <Switch variant="light" defaultChecked {...props} />
        <Switch {...props} />
        <Switch defaultChecked {...props} />
      </React.Fragment>
    ),
    cssVars: [
      { id: '--Switch-track-radius', type: 'number', unit: 'px', defaultValue: 16 },
      { id: '--Switch-track-width', type: 'number', unit: 'px', defaultValue: 48 },
      { id: '--Switch-track-height', type: 'number', unit: 'px', defaultValue: 24 },
      { id: '--Switch-thumb-size', type: 'number', unit: 'px', defaultValue: 16 },
      { id: '--Switch-thumb-radius', type: 'number', unit: 'px' },
      { id: '--Switch-thumb-width', type: 'number', unit: 'px' },
      { id: '--Switch-thumb-offset', type: 'number', unit: 'px' },
    ],
  },
  {
    name: 'List',
    render: (props: any) => (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minWidth: 375,
          gap: 2,
          p: 2,
          mt: '-80px',
          bgcolor: 'var(--joy-palette-background-level2)',
          '& > *': { bgcolor: 'var(--joy-palette-background-body)' },
        }}
      >
        <List {...props}>
          <ListDivider inset="startContent" />
          <ListItem>
            <ListItemDecorator>
              <Inbox />
            </ListItemDecorator>
            <ListItemContent>
              Inbox
              <Typography level="body2">Jan 9, 2014</Typography>
            </ListItemContent>
          </ListItem>
          <ListDivider inset="startContent" />
        </List>
        <List component="nav" {...props}>
          <ListItem nested>
            <ListItemButton selected color="primary">
              <ListItemDecorator>
                <Inbox />
              </ListItemDecorator>
              <ListItemContent>Inbox</ListItemContent>
              <KeyboardArrowUp />
            </ListItemButton>
            <List>
              <ListItem
                nested
                component="div"
                endAction={
                  <IconButton variant="text" color="danger">
                    <DeleteForever />
                  </IconButton>
                }
              >
                <ListItemButton>
                  <ListItemDecorator>
                    <Star />
                  </ListItemDecorator>
                  <ListItemContent>Starred</ListItemContent>
                </ListItemButton>
                <List>
                  <ListItem>
                    <ListItemButton>
                      <ListItemDecorator>
                        <Drafts />
                      </ListItemDecorator>
                      Draft
                    </ListItemButton>
                  </ListItem>
                </List>
              </ListItem>
            </List>
          </ListItem>
          <ListDivider component="hr" />
          <ListItemButton>
            <ListItemDecorator>
              <Favorite />
            </ListItemDecorator>
            <ListItemContent>Favorite</ListItemContent>
          </ListItemButton>
        </List>
        <List component="nav" size="sm" {...props}>
          <ListItemButton>
            <ListItemContent>New file</ListItemContent>
            <Typography level="body2">⌘ N</Typography>
          </ListItemButton>
          <ListItemButton>
            <ListItemContent>Copy</ListItemContent>
            <Typography level="body2">⌘ C</Typography>
          </ListItemButton>
          <ListDivider inset="gutter" />
          <ListItemButton disabled>
            <ListItemContent>Delete</ListItemContent>
            <Typography level="body2">⌘ D</Typography>
          </ListItemButton>
        </List>
      </Box>
    ),
    cssVars: [
      { id: '--List-padding', type: 'number', unit: 'px', defaultValue: 0 },
      { id: '--List-gap', type: 'number', unit: 'px', defaultValue: 6 },
      { id: '--List-radius', type: 'number', unit: 'px', defaultValue: 0 },
      { id: '--List-item-minHeight', type: 'number', unit: 'px', defaultValue: 40 },
      { id: '--List-item-paddingY', type: 'number', unit: 'px', defaultValue: 6 },
      { id: '--List-item-paddingLeft', type: 'number', unit: 'px', defaultValue: 6 },
      { id: '--List-item-paddingRight', type: 'number', unit: 'px', defaultValue: 6 },
      { id: '--List-item-fontSize', type: 'number', unit: 'px', defaultValue: 16 },
      { id: '--List-decorator-width', type: 'number', unit: 'px', defaultValue: 40 },
      { id: '--List-divider-gap', type: 'number', unit: 'px', defaultValue: 0 },
      { id: '--List-nestedInsetStart', type: 'number', unit: 'px', defaultValue: 12 },
      { id: '--List-item-radius', type: 'number', unit: 'px' },
    ],
  },
  {
    name: 'Input',
    render: (props: any) => (
      <React.Fragment>
        <Input
          placeholder="Placeholder"
          startAdornment={<Key />}
          endAdornment={
            <IconButton size="sm" color="neutral">
              <Visibility />
            </IconButton>
          }
          {...props}
        />
        <Input
          color="primary"
          placeholder="Placeholder"
          startAdornment={<Typography color="inherit">$</Typography>}
          endAdornment={<Typography color="text.tertiary">USD</Typography>}
          {...props}
        />
        <Input placeholder="Placeholder" color="danger" endAdornment={<Info />} {...props} />
        <Input
          placeholder="Placeholder"
          variant="light"
          color="success"
          endAdornment={<TaskAlt />}
          {...props}
        />
        <Input
          placeholder="Placeholder"
          variant="contained"
          color="info"
          endAdornment={<TaskAlt />}
          {...props}
        />
      </React.Fragment>
    ),
    cssVars: [
      { id: '--Input-height', type: 'number', unit: 'px', defaultValue: 40 },
      { id: '--Input-radius', type: 'number', unit: 'px', defaultValue: 8 },
      { id: '--Input-gutter', type: 'number', unit: 'px', defaultValue: 12 },
      { id: '--Input-gap', type: 'number', unit: 'px', defaultValue: 8 },
      {
        id: '--Input-placeholderOpacity',
        type: 'number',
        defaultValue: 0.5,
        inputProps: {
          step: '0.1',
          max: '1',
          min: '0',
        },
      },
      { id: '--Input-focusedThickness', type: 'number', unit: 'px' },
      { id: '--Input-adornment-offset', type: 'number', unit: 'px' },
    ],
  },
];

function Playground({ initialName }: { initialName?: string }) {
  const router = useRouter();
  const [current, setCurrent] = React.useState(initialName || components[0].name);
  const [componentVars, setComponentVars] = React.useState<Record<string, any>>(
    components.reduce((result, curr) => ({ ...result, [curr.name]: {} }), {}),
  );
  const data = components.find(({ name }) => name === current);
  const renderedSx = data?.name
    ? Object.entries(componentVars[data?.name])
        .map(([key, value]) => `  '${key}': '${value}',`)
        .join('\n')
    : null;

  React.useEffect(() => {
    if (router.query.name !== current) {
      router.replace({
        query: { name: current },
      });
    }
  }, [current, router]);
  return (
    <Box sx={{ maxWidth: { md: 1152, xl: 1536 }, mx: 'auto', display: 'flex' }}>
      <Box
        sx={{
          width: 256,
          minHeight: '100vh',
          boxShadow: 'var(--joy-shadow-sm)',
        }}
      >
        <Box sx={{ pl: 5, pt: 2 }}>
          <ColorSchemePicker />
        </Box>
        <List
          sx={{
            mt: 2,
            '--List-insetStart': '1.25rem',
            '--List-radius': '1rem',
          }}
        >
          {components.map((config) => (
            <ListItem key={config.name} sx={{ mb: 1 }}>
              <ListItemButton
                color={config.name === current ? 'primary' : 'neutral'}
                selected={config.name === current}
                onClick={() => setCurrent(config.name)}
              >
                {config.name}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        className="Canvas"
        sx={{
          position: 'relative',
          flexGrow: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: '100px',
          gap: 2,
        }}
      >
        {data?.render({ sx: componentVars[data.name] })}
        <Box
          sx={{
            position: 'absolute',
            left: '1rem',
            right: '1rem',
            bottom: '1rem',
          }}
        >
          <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
            <HighlightedCode
              component={MarkdownElement}
              code={`<${current} sx={{${renderedSx ? `\n${renderedSx}\n ` : ''}}}
/>`}
              language="jsx"
            />
          </ThemeProvider>
        </Box>
      </Box>
      <Box sx={{ width: 300, display: 'flex', flexDirection: 'column', pt: '100px' }}>
        <Box
          sx={{
            bgcolor: 'var(--joy-palette-background-level1)',
            borderRadius: '4px',
            minHeight: 300,
            py: 1.5,
            px: 2,
          }}
        >
          <Typography level="body2" sx={{ mb: 2 }}>
            CSS variables
          </Typography>
          {data?.cssVars.map((cssVar) => (
            <ControlInput
              key={cssVar.id}
              type="number"
              label={cssVar.id}
              unit={cssVar.unit}
              componentsProps={{
                input: cssVar.inputProps,
              }}
              value={
                componentVars[data?.name!]?.[cssVar.id]?.replace(cssVar.unit, '') ||
                cssVar.defaultValue?.toString() ||
                ''
              }
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value;
                setComponentVars((latest) => {
                  const vars = { ...latest[data.name] };
                  if (!value) {
                    delete vars[cssVar.id];
                  } else {
                    vars[cssVar.id] = cssVar.unit ? `${value}${cssVar.unit}` : value;
                  }
                  return {
                    ...latest,
                    [data.name]: vars,
                  };
                });
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default function JoyComponents() {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <CssVarsProvider
      theme={{
        components: {
          MuiSvgIcon: {
            defaultProps: {
              fontSize: 'xl',
            },
            styleOverrides: {
              root: ({ ownerState, theme }) => ({
                ...(ownerState.fontSize &&
                  ownerState.fontSize !== 'inherit' && {
                    fontSize: theme.vars.fontSize[ownerState.fontSize],
                  }),
                ...(ownerState.color &&
                  ownerState.color !== 'inherit' && {
                    color: theme.vars.palette[ownerState.color].textColor,
                  }),
              }),
            },
          },
        },
      }}
    >
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      {mounted && <Playground initialName={router.query.name as string} />}
    </CssVarsProvider>
  );
}
