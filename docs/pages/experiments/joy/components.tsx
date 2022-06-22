/* eslint-disable no-alert */
import * as React from 'react';
import { useRouter } from 'next/router';
import { GlobalStyles } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
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
import StarBorder from '@mui/icons-material/StarBorder';
import Favorite from '@mui/icons-material/FavoriteBorder';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import PlayArrow from '@mui/icons-material/PlayArrow';
import Delete from '@mui/icons-material/Delete';
import LocationOn from '@mui/icons-material/LocationOnOutlined';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import { brandingDarkTheme } from 'docs/src/modules/brandingTheme';

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
    <IconButton
      variant="outlined"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </IconButton>
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
        variant="soft"
        {...props}
        endDecorator={
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
    name: 'AvatarGroup',
    render: (props: any) => (
      <AvatarGroup {...props}>
        <Avatar src="/static/images/avatar/1.jpg" />
        <Avatar src="/static/images/avatar/2.jpg" />
        <Avatar src="/static/images/avatar/3.jpg" />
        <Avatar>+3</Avatar>
      </AvatarGroup>
    ),
    cssVars: [
      { id: '--AvatarGroup-gap', type: 'number', unit: 'px', defaultValue: -8 },
      { id: '--Avatar-ringSize', type: 'number', unit: 'px', defaultValue: 2 },
    ],
  },
  {
    name: 'Button',
    render: (props: any) => (
      <React.Fragment>
        <Button {...props}>Text</Button>
        <Button startIcon={<Add />} variant="soft" {...props}>
          Add more row
        </Button>
        <Button endIcon={<DeleteForever />} variant="outlined" {...props}>
          Delete
        </Button>
      </React.Fragment>
    ),
    cssVars: [
      { id: '--Button-paddingInline', type: 'number', unit: 'px', defaultValue: 24 },
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
        <IconButton variant="solid" color="danger" {...props}>
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
        <Switch variant="soft" {...props} />
        <Switch variant="soft" defaultChecked {...props} />
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
                  <IconButton variant="plain" color="danger">
                    <DeleteForever />
                  </IconButton>
                }
              >
                <ListItemButton>
                  <ListItemDecorator>
                    <StarBorder />
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
      { id: '--List-nestedInsetStart', type: 'number', unit: 'px', defaultValue: 0 },
      { id: '--List-item-radius', type: 'number', unit: 'px' },
    ],
  },
  {
    name: 'Input',
    render: (props: any) => (
      <React.Fragment>
        <Input
          placeholder="Placeholder"
          startDecorator={<Key />}
          endDecorator={
            <IconButton size="sm" color="neutral">
              <Visibility />
            </IconButton>
          }
          {...props}
        />
        <Input
          color="primary"
          placeholder="Placeholder"
          startDecorator={<Typography textColor="inherit">$</Typography>}
          endDecorator={<Typography textColor="text.tertiary">USD</Typography>}
          {...props}
        />
        <Input placeholder="Placeholder" color="danger" endDecorator={<Info />} {...props} />
        <Input
          placeholder="Placeholder"
          variant="soft"
          color="success"
          endDecorator={<TaskAlt />}
          {...props}
        />
        <Input
          placeholder="Placeholder"
          variant="solid"
          color="info"
          endDecorator={<TaskAlt />}
          {...props}
        />
      </React.Fragment>
    ),
    cssVars: [
      { id: '--Input-radius', type: 'number', unit: 'px', defaultValue: 8 },
      { id: '--Input-paddingInline', type: 'number', unit: 'px', defaultValue: 12 },
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
      { id: '--Input-decorator-offset', type: 'number', unit: 'px' },
    ],
  },
  {
    name: 'Checkbox',
    render: (props: any) => (
      <React.Fragment>
        <Checkbox {...props} />
        <Checkbox checked {...props} />
        <Checkbox indeterminate {...props} />
      </React.Fragment>
    ),
    cssVars: [{ id: '--Checkbox-size', type: 'number', unit: 'px', defaultValue: 20 }],
  },
  {
    name: 'Card',
    render: (props: any) => (
      <Box component="ul" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Card
          component="li"
          variant="outlined"
          sx={{ ...props?.sx, '&:focus-within': { boxShadow: 'lg' } }}
        >
          <CardOverflow variant="outlined">
            <AspectRatio ratio="1">
              <img
                src="https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?auto=format&fit=crop&w=1770"
                alt=""
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  borderRadius: '20px',
                  p: '0.5rem',
                  fontSize: 'xs',
                  color: '#fff',
                  bgcolor: 'rgba(0,0,0,0.5)',
                }}
              >
                04:26
              </Box>
              <IconButton
                size="lg"
                variant="solid"
                sx={{
                  position: 'absolute',
                  zIndex: 2,
                  borderRadius: '50%',
                  right: '1rem',
                  bottom: 'calc(-1/2 * var(--IconButton-size))',
                }}
              >
                <PlayArrow />
              </IconButton>
            </AspectRatio>
          </CardOverflow>
          <Typography level="h2" sx={{ fontSize: 'lg', mt: 3 }}>
            <Link href="#minimal-photo" overlay>
              Minimal photography
            </Link>
          </Typography>
          <Typography level="body2" sx={{ mt: 0.5, mb: 2 }}>
            By <Link href="#sukjit">Sujith</Link>
          </Typography>
          <CardOverflow
            variant="outlined"
            sx={{
              display: 'flex',
              gap: 1,
              py: 1.5,
              px: 'var(--Card-padding)',
              mt: 'auto',
              borderTopColor: 'background.level2',
              bgcolor: 'background.level1',
            }}
          >
            <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.primary' }}>
              6.3k views
            </Typography>
            <Box sx={{ width: 2, bgcolor: 'divider' }} />
            <Typography level="body2" sx={{ fontWeight: 'md', color: 'text.primary' }}>
              1 hour ago
            </Typography>
          </CardOverflow>
        </Card>
        <Card
          component="li"
          size="lg"
          sx={{ ...props?.sx, minHeight: '360px', '&:hover': { boxShadow: 'xl' } }}
        >
          <CardCover>
            <img
              src="https://images.unsplash.com/photo-1525630558331-067c957817a9?auto=format&fit=crop&w=2250"
              alt=""
            />
          </CardCover>
          <CardCover
            sx={{
              background:
                'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 30%), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 50%)',
            }}
          />
          <CardContent sx={{ justifyContent: 'flex-end' }}>
            <Typography level="h2" sx={{ mb: 1, fontSize: 'lg' }}>
              <Link href="#the-beach" underline="none" overlay sx={{ color: 'neutral.50' }}>
                The Beach
              </Link>
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography startDecorator={<LocationOn />} sx={{ color: 'neutral.300' }}>
                Tarifa, Spain
              </Typography>
              <Typography startDecorator={<StarBorder />} sx={{ color: 'neutral.300' }}>
                4.8
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    ),
    cssVars: [
      { id: '--Card-padding', type: 'number', unit: 'px', defaultValue: 16 },
      { id: '--Card-radius', type: 'number', unit: 'px', defaultValue: 8 },
    ],
  },
  {
    name: 'Chip',
    render: (props: any) => (
      <React.Fragment>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <Chip
            variant="soft"
            size="sm"
            startDecorator={
              <Avatar
                src="/static/images/avatar/1.jpg"
                variant="outlined"
                sx={{ '--Avatar-size': '24px', borderColor: 'background.body' }}
              />
            }
            {...props}
          >
            Robert Stark
          </Chip>
          <Chip
            variant="soft"
            startDecorator={
              <Avatar
                src="/static/images/avatar/2.jpg"
                size="sm"
                variant="outlined"
                sx={{ borderColor: 'background.body' }}
              />
            }
            {...props}
          >
            Robert Stark
          </Chip>
          <Chip
            variant="soft"
            size="lg"
            startDecorator={
              <Avatar
                src="/static/images/avatar/3.jpg"
                variant="outlined"
                sx={{ borderColor: 'background.body', '--variant-borderWidth': '2px' }}
              />
            }
            {...props}
          >
            Robert Stark
          </Chip>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip variant="outlined" onClick={() => alert('test')} {...props}>
            Delete
            <Delete sx={{ ml: 0.5, mr: -0.5 }} />
          </Chip>
          <Chip variant="outlined" color="success" onClick={() => alert('test')} {...props}>
            <Info sx={{ mr: 0.5, ml: -0.5 }} />
            Info
          </Chip>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip variant="soft" color="neutral" endDecorator={<ChipDelete />} {...props}>
            Fruit
          </Chip>
          <Chip
            variant="soft"
            color="neutral"
            endDecorator={<ChipDelete variant="outlined" />}
            {...props}
          >
            Fruit
          </Chip>
          <Chip
            variant="outlined"
            color="neutral"
            endDecorator={<ChipDelete variant="soft" />}
            {...props}
          >
            Fruit
          </Chip>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip
            startDecorator={<Favorite sx={{ ml: 0.5 }} />}
            variant="outlined"
            color="danger"
            onClick={() => {}}
            {...props}
          >
            Favorite
          </Chip>
          <Chip
            startDecorator={<Favorite sx={{ ml: 0.5 }} />}
            variant="outlined"
            color="neutral"
            onClick={() => {}}
            {...props}
          >
            Favorite
          </Chip>
          <Chip
            startDecorator={<Favorite sx={{ ml: 0.5 }} />}
            variant="outlined"
            color="neutral"
            onClick={() => {}}
            {...props}
          >
            Favorite
          </Chip>
        </Box>
      </React.Fragment>
    ),
    cssVars: [
      { id: '--Icon-fontSize', type: 'number', unit: 'px', defaultValue: 18 },
      { id: '--Chip-radius', type: 'number', unit: 'px', defaultValue: 24 },
      { id: '--Chip-gap', type: 'number', unit: 'px', defaultValue: 6 },
      { id: '--Chip-paddingBlock', type: 'number', unit: 'px', defaultValue: 4 },
      { id: '--Chip-paddingInline', type: 'number', unit: 'px', defaultValue: 12 },
      { id: '--Chip-delete-size', type: 'number', unit: 'px', defaultValue: 24 },
      { id: '--Chip-delete-radius', type: 'number', unit: 'px' },
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
        <List sx={{ mt: 2 }}>
          {components.map((config) => (
            <ListItem key={config.name} sx={{ mb: 1 }}>
              <ListItemButton
                color={config.name === current ? 'primary' : 'neutral'}
                variant={config.name === current ? 'soft' : 'plain'}
                selected={config.name === current}
                onClick={() => setCurrent(config.name)}
                sx={{
                  '&.Mui-selected': {
                    borderRight: '2px solid',
                    borderColor: 'primary.containedBg',
                  },
                }}
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
          <ThemeProvider theme={brandingDarkTheme}>
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
    <CssVarsProvider>
      <GlobalStyles styles={{ body: { margin: 0 } }} />
      {mounted && <Playground initialName={router.query.name as string} />}
    </CssVarsProvider>
  );
}
