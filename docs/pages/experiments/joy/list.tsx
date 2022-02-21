import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import {
  ColorPaletteProp,
  CssVarsProvider,
  useColorScheme,
  styled,
  experimental_sx as sx,
} from '@mui/joy/styles';
import NextLink from 'next/link';
import Collapse from '@mui/material/Collapse';
import Box, { BoxProps } from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import ListDivider from '@mui/joy/ListDivider';
import NestedList from '@mui/joy/NestedList';
import NestedListItem from '@mui/joy/NestedListItem';
import Typography from '@mui/joy/Typography';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import BeachAccess from '@mui/icons-material/BeachAccess';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import Star from '@mui/icons-material/StarBorder';
import Favorite from '@mui/icons-material/FavoriteBorder';
import DeleteForever from '@mui/icons-material/DeleteForever';
import CommentIcon from '@mui/icons-material/Comment';
import CheckBox from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlank from '@mui/icons-material/CheckBoxOutlineBlank';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Label from '@mui/icons-material/Label';
import People from '@mui/icons-material/People';
import Info from '@mui/icons-material/Info';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDownRounded';

// MuiNavDrawer
import pages from 'docs/data/material/pages';
import { MuiPage } from 'docs/src/pages';
import { pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import ToggleOffRoundedIcon from '@mui/icons-material/ToggleOffRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import HandymanRoundedIcon from '@mui/icons-material/HandymanRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import InvertColorsRoundedIcon from '@mui/icons-material/InvertColorsRounded';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';
import ChromeReaderModeRoundedIcon from '@mui/icons-material/ChromeReaderModeRounded';
import TableViewRoundedIcon from '@mui/icons-material/TableViewRounded';

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
      sx={{ minWidth: 40, p: '0.25rem' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

const Circle = ({
  sx: sxProp = [],
  color = 'neutral',
  ...props
}: Omit<BoxProps, 'color'> & { color?: ColorPaletteProp }) => (
  <Box
    {...props}
    sx={[
      (theme) => ({
        display: 'inline-flex',
        borderRadius: '40px',
        p: '0.5rem',
        ...theme.variants.light[color],
      }),
      ...(Array.isArray(sxProp) ? sxProp : [sxProp]),
    ]}
  />
);

function CheckboxList() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List>
      {[0, 1, 2, 3].map((value) => {
        const selected = checked.indexOf(value) !== -1;
        return (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton aria-label="comments" size="sm">
                <CommentIcon />
              </IconButton>
            }
          >
            <ListItemButton
              color={selected ? 'success' : undefined}
              role={undefined}
              onClick={handleToggle(value)}
            >
              <ListItemDecorator>
                {selected ? <CheckBox /> : <CheckBoxOutlineBlank />}
              </ListItemDecorator>
              Line item {value + 1}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}

function Gmail() {
  const [index, setIndex] = React.useState(0);
  return (
    <List
      sx={{
        '--List-padding': '0px',
        '--List-radius': '0px',
        '--List-item-paddingX': '0px',
        '--List-item-radius': '0 20px 20px 0',
        '--List-decorator-width': '64px',
        '--List-item-minHeight': '32px',
        '--List-item-secondaryActionWidth': '12px',
        '--List-gap': '0px',
        '--List-insetStartAddition': '13px',
        '& .MuiListItemDecorator-root': { justifyContent: 'flex-end', pr: '18px' },
      }}
    >
      <ListItem>
        <ListItemButton
          selected={index === 0}
          color={index === 0 ? 'danger' : undefined}
          onClick={() => setIndex(0)}
        >
          <ListItemDecorator sx={{ color: 'inherit' }}>
            <InboxIcon fontSize="lg" />
          </ListItemDecorator>
          <ListItemContent>Inbox</ListItemContent>
          <Typography level="body2" sx={{ fontWeight: 'bold', color: 'inherit' }}>
            1,950
          </Typography>
        </ListItemButton>
      </ListItem>
      <NestedListItem>
        <ListItemButton
          selected={index === 1}
          color={index === 1 ? 'info' : undefined}
          onClick={() => setIndex(1)}
        >
          <ListItemDecorator>
            <ArrowDropDown fontSize="lg" />
            <Label fontSize="lg" />
          </ListItemDecorator>
          Categories
        </ListItemButton>
        <NestedList>
          <ListItem>
            <ListItemButton
              selected={index === 2}
              color={index === 2 ? 'primary' : undefined}
              onClick={() => setIndex(2)}
            >
              <ListItemDecorator>
                <People fontSize="lg" />
              </ListItemDecorator>
              <ListItemContent>Social</ListItemContent>
              <Typography level="body2">4,320</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              selected={index === 3}
              color={index === 3 ? 'warning' : undefined}
              onClick={() => setIndex(3)}
            >
              <ListItemDecorator>
                <Info fontSize="lg" />
              </ListItemDecorator>
              <ListItemContent>Updates</ListItemContent>
              <Typography level="body2">22,252</Typography>
            </ListItemButton>
          </ListItem>
        </NestedList>
      </NestedListItem>
    </List>
  );
}

const MuiListItemContent = styled(ListItemContent)(
  sx({
    color: 'text.tertiary',
    textTransform: 'uppercase',
    fontSize: '11px',
    letterSpacing: '1.28px',
    fontWeight: 'lg',
  }),
);

const iconsMap = {
  DescriptionIcon: ArticleRoundedIcon,
  ToggleOnIcon: ToggleOffRoundedIcon,
  CodeIcon: CodeRoundedIcon,
  BuildIcon: HandymanRoundedIcon,
  CreateIcon: EditRoundedIcon,
  VisibilityIcon: VisibilityRoundedIcon,
  StyleIcon: InvertColorsRoundedIcon,
  AddIcon: AddCircleRoundedIcon,
  BookIcon: BookRoundedIcon,
  ReaderIcon: ChromeReaderModeRoundedIcon,
  TableViewIcon: TableViewRoundedIcon,
};

function MuiNav() {
  const [open, setOpen] = React.useState<boolean[]>([...Array(pages.length).map(() => false)]);
  const t = useTranslate();
  const grey = {
    // same as branding theme
    50: '#F3F6F9',
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7', // vs blueDark 900: WCAG 11.6 AAA, APCA 78 Best for text
    400: '#B2BAC2', // vs blueDark 900: WCAG 9 AAA, APCA 63.3 Ok for text
    500: '#A0AAB4', // vs blueDark 900: WCAG 7.5 AAA, APCA 54.3 Only for large text
    600: '#6F7E8C', // vs white bg: WCAG 4.1 AA, APCA 68.7 Ok for text
    700: '#3E5060', // vs white bg: WCAG 8.3 AAA, APCA 88.7 Best for text
    800: '#2D3843', // vs white bg: WCAG 11.9 AAA, APCA 97.3 Best for text
    900: '#1A2027',
  };
  const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    main: '#007FFF',
    500: '#007FFF',
    600: '#0072E5', // vs blueDark 900: WCAG 4.6 AAA (large), APCA 36 Not for reading text
    700: '#0059B2',
    800: '#004C99',
    900: '#003A75',
  };
  function createCssVars(object: any, prefix = '') {
    const result: Record<string, string> = {};
    Object.entries(object).forEach((entry) => {
      const [key, value] = entry as [string, string];
      result[`--joy-${prefix}-${key}`] = value;
    });
    return result;
  }
  return (
    <List
      sx={(theme) => ({
        // Actually, this part should be inside the theme but put it here for specific instance.
        ...createCssVars(grey, 'palette-neutral'),
        ...createCssVars(blue, 'palette-primary'),
        '--joy-palette-text-primary': theme.vars.palette.neutral[900],
        '--joy-palette-text-secondary': theme.vars.palette.neutral[700],
        '--joy-palette-text-tertiary': theme.vars.palette.neutral[600],
        '--joy-palette-neutral-textHoverBg': theme.vars.palette.neutral[50],
        '--joy-palette-neutral-textActiveBg': theme.vars.palette.neutral[50],
        '--joy-palette-primary-textColor': theme.vars.palette.primary[500],
        '--joy-palette-primary-lightColor': theme.vars.palette.primary[500],
        '--joy-palette-primary-lightBg': theme.vars.palette.primary[50],
        '--joy-palette-primary-lightHoverBg': 'rgba(0, 127, 255, 0.12)',
        '--joy-palette-primary-lightActiveBg': 'rgba(0, 127, 255, 0.12)',
        '[data-mui-color-scheme="dark"] &': {
          '--joy-palette-text-primary': '#fff',
          '--joy-palette-text-secondary': theme.vars.palette.neutral[400],
          '--joy-palette-neutral-textHoverBg': 'rgba(19, 47, 76, 0.4)',
          '--joy-palette-neutral-textActiveBg': 'rgba(19, 47, 76, 0.4)',
          '--joy-palette-primary-textColor': theme.vars.palette.primary[400],
          '--joy-palette-primary-lightColor': theme.vars.palette.primary[300],
          '--joy-palette-primary-lightBg': '#132f4c',
          '--joy-palette-primary-lightHoverBg': 'rgba(51, 153, 255, 0.24)',
          '--joy-palette-primary-lightActiveBg': 'rgba(51, 153, 255, 0.24)',
          '--List-background': 'rgb(10, 25, 41)',
        },
        '& *': {
          fontFamily: '"IBM Plex Sans"',
          WebkitFontSmoothing: 'antialiased',
          fontWeight: 500,
        },
        // ===============================================================

        // This is what we have to customize
        '--List-item-minHeight': '27px',
        '--List-decorator-width': '28px',
        '--List-radius': '0px',
        '--List-item-radius': '5px',
        '--List-gap': '10px',
        '--List-padding': '10px',
        '--List-item-paddingX': '2px',
        '--List-item-paddingY': '0px',
        '--List-item-fontSize': theme.vars.fontSize.sm,
        '--List-insetStartAddition': '28px',
        '--List-decorator-color': theme.vars.palette.primary.textColor,
      })}
    >
      {(pages as MuiPage[]).map((aPage, index) => {
        const hasDeeperLevel = (aPage.children || []).some(
          (nestedPage) => (nestedPage.children || []).length,
        );
        const IconComponent = aPage.icon ? iconsMap[aPage.icon as keyof typeof iconsMap] : null;
        return (
          <NestedListItem>
            <ListItemButton
              selectedColor="primary"
              sx={{ mb: '2px' }}
              onClick={() =>
                setOpen((bool) => {
                  const newBool = [...bool];
                  newBool[index] = !newBool[index];
                  return newBool;
                })
              }
            >
              <ListItemDecorator>
                <IconComponent fontSize="md" />
              </ListItemDecorator>
              <ListItemContent sx={{ color: 'text.primary' }}>
                {pageToTitleI18n(aPage, t) || ''}
              </ListItemContent>
              <KeyboardArrowDown
                fontSize="md"
                sx={{
                  transform: open[index] ? 'unset' : 'rotate(-90deg)',
                  color: 'var(--joy-palette-primary-textColor)',
                }}
              />
            </ListItemButton>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <NestedList
                sx={{
                  '--List-gap': hasDeeperLevel ? '17px' : '4px',
                  '--List-insetStartAddition': '0px',
                }}
              >
                {(aPage.children || []).map((nestedPage, nestedIndex) => {
                  if (!(nestedPage.children || []).length) {
                    return (
                      <ListItem>
                        <ListItemButton selectedColor="primary" selected={nestedIndex === 0}>
                          {pageToTitleI18n(nestedPage, t) || ''}
                        </ListItemButton>
                      </ListItem>
                    );
                  }
                  return (
                    <NestedListItem>
                      <MuiListItemContent>
                        <ListItemDecorator />
                        {pageToTitleI18n(nestedPage, t) || ''}
                      </MuiListItemContent>
                      <NestedList sx={{ '--List-gap': '4px' }}>
                        {(nestedPage.children || []).map((deepestPage) => (
                          <ListItem>
                            <ListItemButton selectedColor="primary">
                              {pageToTitleI18n(deepestPage, t) || ''}
                            </ListItemButton>
                          </ListItem>
                        ))}
                      </NestedList>
                    </NestedListItem>
                  );
                })}
              </NestedList>
            </Collapse>
          </NestedListItem>
        );
      })}
    </List>
  );
}

export default function JoyTypography() {
  return (
    <CssVarsProvider
      theme={{
        colorSchemes: {
          light: {
            palette: {
              neutral: {
                outlinedBorder: 'rgba(0, 0, 0, 0.12)',
              },
            },
          },
        },
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
      <GlobalStyles
        styles={{ body: { margin: 0, backgroundColor: 'var(--joy-palette-background-level1)' } }}
      />
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ px: 3, pb: 4 }}>
          <ColorSchemePicker />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gap: 2,
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            alignItems: 'flex-start',
          }}
        >
          {/* ex1 */}
          <List>
            <ListItem>Inbox</ListItem>
            <ListItem>Drafts</ListItem>
          </List>

          {/* ex2 */}
          <List>
            <ListItem>Inbox</ListItem>
            <ListDivider />
            <ListItem>Drafts</ListItem>
            <ListDivider />
            <ListItem>Trash</ListItem>
          </List>

          {/* ex3 */}
          <List>
            <ListItem>
              <ListItemDecorator>
                <InboxIcon fontSize="lg" />
              </ListItemDecorator>
              Inbox
            </ListItem>
            <ListItem>
              <ListItemDecorator />
              Drafts
            </ListItem>
            <ListItem>
              <ListItemDecorator />
              Trash
            </ListItem>
          </List>

          {/* ex4 */}
          <List>
            <ListItem>
              <ListItemButton color="primary">
                <ListItemDecorator>
                  <InboxIcon fontSize="lg" />
                </ListItemDecorator>
                Inbox
              </ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton color="success">
                <ListItemDecorator>
                  <DraftsIcon fontSize="lg" />
                </ListItemDecorator>
                Drafts
              </ListItemButton>
            </ListItem>
            <ListDivider />
            <ListItem>Trash</ListItem>
          </List>

          {/* ex5 */}
          <List sx={{ '--List-decorator-width': '3rem' }}>
            <ListItem>
              <ListItemDecorator>
                <Circle>
                  <InboxIcon />
                </Circle>
              </ListItemDecorator>
              <ListItemContent sx={{ pl: 1 }}>
                Inbox
                <Typography level="body2">Jan 9, 2014</Typography>
              </ListItemContent>
            </ListItem>
            <ListDivider inset="startContent" />
            <ListItem>
              <ListItemDecorator>
                <Circle>
                  <DraftsIcon fontSize="md" />
                </Circle>
              </ListItemDecorator>
              <ListItemContent sx={{ pl: 1 }}>
                Drafts
                <Typography level="body2">Jan 7, 2014</Typography>
              </ListItemContent>
            </ListItem>
            <ListDivider inset="startContent" />
            <ListItem>
              <ListItemDecorator>
                <Circle>
                  <BeachAccess />
                </Circle>
              </ListItemDecorator>
              <ListItemContent sx={{ pl: 1 }}>
                Vacation
                <Typography level="body2">July 20, 2014</Typography>
              </ListItemContent>
            </ListItem>
          </List>

          {/* ex6 */}
          <List sx={{ '--List-decorator-width': '56px' }}>
            <ListItem>
              <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                <Box
                  component="img"
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '40px',
                  }}
                />
              </ListItemDecorator>
              <div>
                <Typography>Brunch this weekend?</Typography>
                <Typography level="body2" sx={{ color: 'var(--joy-palette-text-primary)' }}>
                  Ali Connors{' '}
                  <Typography
                    component="span"
                    level="inherit"
                    sx={{ color: 'var(--joy-palette-text-secondary)' }}
                  >
                    {' '}
                    — I&apos;ll be in your neighborhood doing errands this…
                  </Typography>
                </Typography>
              </div>
            </ListItem>
            <ListDivider inset="startContent" />
            <ListItem>
              <ListItemDecorator sx={{ alignSelf: 'flex-start' }}>
                <Box
                  component="img"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '40px',
                  }}
                />
              </ListItemDecorator>
              <div>
                <Typography>Summer BBQ</Typography>
                <Typography level="body2" sx={{ color: 'var(--joy-palette-text-primary)' }}>
                  to Scott, Alex, Jennifer{' '}
                  <Typography
                    component="span"
                    level="inherit"
                    sx={{ color: 'var(--joy-palette-text-secondary)' }}
                  >
                    {' '}
                    — Wish I could come, but I&apos;m out of town this…
                  </Typography>
                </Typography>
              </div>
            </ListItem>
          </List>

          {/* ex7 */}
          <List component="nav">
            <ListItemButton color="primary">
              <ListItemContent>New file</ListItemContent>
              <Typography level="body2">⌘ N</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemContent>Copy</ListItemContent>
              <Typography level="body2">⌘ C</Typography>
            </ListItemButton>
            <ListItemButton>
              <ListItemContent>Check</ListItemContent>
            </ListItemButton>
            <ListDivider inset="gutter" />
            <ListItemButton disabled>
              <ListItemContent>Delete</ListItemContent>
              <Typography level="body2" sx={{ color: 'inherit' }}>
                ⌘ D
              </Typography>
            </ListItemButton>
          </List>

          {/* ex8 */}
          <List>
            <ListItem>
              <ListItemButton component="a" href="#">
                <ListItemContent>External Link</ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListItem>
              <NextLink href="/" passHref>
                <ListItemButton component="a">
                  <ListItemContent>Internal Link</ListItemContent>
                </ListItemButton>
              </NextLink>
            </ListItem>
          </List>

          {/* ex9 */}
          <List
            component="nav"
            sx={{
              '--List-radius': '0px',
              '--List-padding': '0px',
              '--List-gap': '0px',
              '--List-item-paddingX': '1rem',
              '--List-item-minHeight': '3rem',
            }}
          >
            <ListItemButton selected selectedVariant="contained" color="primary">
              <ListItemDecorator>
                <InboxIcon />
              </ListItemDecorator>
              <ListItemContent>Inbox</ListItemContent>
              <KeyboardArrowUp />
            </ListItemButton>
            <ListItemButton color="primary">
              <ListItemDecorator>
                <Star />
              </ListItemDecorator>
              <ListItemContent>Starred</ListItemContent>
            </ListItemButton>
            <ListDivider component="hr" />
            <ListItemButton color="primary">
              <ListItemDecorator>
                <Favorite />
              </ListItemDecorator>
              <ListItemContent>Favorite</ListItemContent>
            </ListItemButton>
          </List>

          {/* ex10 */}
          <List
            component="nav"
            sx={{ '--List-decorator-width': '56px', '--List-divider-gap': '0.5rem' }}
          >
            <ListItem
              secondaryAction={
                <Button variant="light" size="sm">
                  Clear
                </Button>
              }
            >
              <ListItemButton selected selectedVariant="light">
                <ListItemDecorator>
                  <Circle color="primary">
                    <InboxIcon />
                  </Circle>
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Inbox</Typography>
                  <Typography level="body2">Jan 9, 2014</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListDivider component="hr" />
            <ListItem
              secondaryAction={
                <Button variant="light" color="danger" size="sm">
                  Clear
                </Button>
              }
            >
              <ListItemButton selected selectedVariant="outlined" color="danger">
                <ListItemDecorator>
                  <Circle color="danger">
                    <Star />
                  </Circle>
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Starred</Typography>
                  <Typography level="body2">Jan 9, 2014</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
            <ListDivider component="hr" />
            <ListItem
              secondaryAction={
                <IconButton
                  variant="outlined"
                  color="success"
                  size="sm"
                  sx={{
                    borderColor: 'success.200',
                    color: 'success.100',
                    '&:hover': { bgcolor: 'success.700' },
                  }}
                >
                  <DeleteForever />
                </IconButton>
              }
            >
              <ListItemButton
                selected
                selectedVariant="contained"
                color="success"
                sx={(theme) => theme.variants.containedOverrides.success}
              >
                <ListItemDecorator>
                  <Circle color="success">
                    <Favorite />
                  </Circle>
                </ListItemDecorator>
                <ListItemContent>
                  <Typography>Favorite</Typography>
                  <Typography level="body2">Jan 9, 2014</Typography>
                </ListItemContent>
              </ListItemButton>
            </ListItem>
          </List>

          <List
            sx={{
              maxWidth: 360,
              maxHeight: 300,
              overflow: 'auto',
              '& ul': { p: 0 },
              '--List-padding': 0,
              '--List-item-paddingX': '1rem',
            }}
          >
            {[0, 1, 2, 3, 4].map((sectionId) => (
              <li key={`section-${sectionId}`}>
                <ul>
                  <ListItem sticky sx={{ pt: '1.5rem' }}>
                    <Typography level="body2">{`I'm sticky ${sectionId}`}</Typography>
                  </ListItem>
                  {[0, 1, 2].map((item) => (
                    <ListItem key={`item-${sectionId}-${item}`}>Item {item}</ListItem>
                  ))}
                </ul>
              </li>
            ))}
          </List>

          <Box>
            <List size="sm">
              <ListItem>
                <Typography level="body2">Small size</Typography>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star fontSize="lg" />
                </ListItemDecorator>
                <ListItemButton>This is a small list</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star fontSize="lg" />
                </ListItemDecorator>
                <ListItemButton>This is a small list</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star fontSize="lg" />
                </ListItemDecorator>
                <ListItemButton>This is a small list</ListItemButton>
              </ListItem>
            </List>
            <List size="lg" sx={{ mt: 1 }}>
              <ListItem>
                <Typography color="text.secondary">Large size</Typography>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star />
                </ListItemDecorator>
                <ListItemButton>This is a large list</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star />
                </ListItemDecorator>
                <ListItemButton>This is a large list</ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemDecorator>
                  <Star />
                </ListItemDecorator>
                <ListItemButton>This is a large list</ListItemButton>
              </ListItem>
            </List>
          </Box>

          <CheckboxList />

          <List
            sx={{
              '--List-insetStartAddition': '24px', // increase start gap on nested list item
            }}
          >
            <NestedListItem>
              <ListItemButton>
                <Typography>Category 1</Typography>
              </ListItemButton>
              <NestedList>
                <NestedListItem>
                  <ListItemButton>
                    <Typography level="body2">Subcategory 1.1</Typography>
                  </ListItemButton>
                  <NestedList>
                    <ListItem>
                      <ListItemButton>Menu item 1.1.1</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Menu item 1.1.2</ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton>Menu item 1.1.3</ListItemButton>
                    </ListItem>
                  </NestedList>
                </NestedListItem>
                <ListItem>
                  <ListItemButton>Menu item 1.2</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Menu item 1.3</ListItemButton>
                </ListItem>
              </NestedList>
            </NestedListItem>
            <ListItem>
              <ListItemButton>Menu item 2</ListItemButton>
            </ListItem>
            <ListItem>
              <ListItemButton>Menu item 3</ListItemButton>
            </ListItem>
          </List>

          <Gmail />

          <MuiNav />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
