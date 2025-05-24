import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiPaper from '@mui/material/Paper';
import copy from 'clipboard-copy';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import flexsearch from 'flexsearch';
import SearchIcon from '@mui/icons-material/Search';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import allIcons from '@mui/symbols-material/icons';
import synonyms from '@mui/symbols-material/synonyms';
import { Link } from '@mui/docs/Link';
import { useTranslate } from '@mui/docs/i18n';
import useQueryParameterState from 'docs/src/modules/utils/useQueryParameterState';
import Head from 'next/head';
import FontIcon from '@mui/material/Icon';
import clsx from 'clsx';

import { HighlightedCode } from '@mui/docs/HighlightedCode';

const FlexSearchIndex = flexsearch.Index;

// Debugging
// const allIcons = [
//   { module: 'Menu', name: 'menu' },
//   { module: 'ExitToApp', name: 'exit_to_app' },
//   { module: 'Delete', name: 'delete' },
//   { module: 'DeleteForever', name: 'delete_forever' },
// ];

function selectNode(node) {
  // Clear any current selection
  const selection = window.getSelection();
  selection.removeAllRanges();

  // Select code
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.addRange(range);
}

const iconWidth = 40;

const ICON_CLASS = 'font-icon';

const StyledIcon = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  color: (theme.vars ?? theme).palette.text.secondary,
  margin: '0 4px',
  '& > div': {
    flexGrow: 1,
    fontSize: '.6rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    width: `calc(${iconWidth}px + ${theme.spacing(2)} * 2 + 2px)`,
  },
  [`& .${ICON_CLASS}`]: {
    width: iconWidth,
    height: iconWidth,
    boxSizing: 'content-box',
    cursor: 'pointer',
    color: (theme.vars ?? theme).palette.text.primary,
    border: '1px solid transparent',
    fontSize: iconWidth,
    borderRadius: '12px',
    transition: theme.transitions.create(['background-color', 'box-shadow'], {
      duration: theme.transitions.duration.shortest,
    }),
    padding: theme.spacing(2),
    margin: theme.spacing(0.5, 0),
    '&:hover': {
      backgroundColor: (theme.vars ?? theme).palette.background.default,
      borderColor: (theme.vars ?? theme).palette.primary.light,
    },
  },
}));

const handleIconClick = (icon) => () => {
  window.gtag('event', 'material-symbols', {
    eventAction: 'click',
    eventLabel: icon.name,
  });
  window.gtag('event', 'material-symbols-theme', {
    eventAction: 'click',
    eventLabel: icon.theme,
  });
};

function handleLabelClick(event) {
  selectNode(event.currentTarget);
}

function Icon(props) {
  const { icon, onOpenClick } = props;

  /* eslint-disable jsx-a11y/click-events-have-key-events */
  return (
    <StyledIcon
      key={icon.module}
      onClick={Math.random() < 0.1 ? handleIconClick(icon) : null}
    >
      <FontIcon
        className={clsx(ICON_CLASS, 's')}
        tabIndex={-1}
        onClick={onOpenClick}
        title={icon.module}
        baseClassName=""
        sx={{
          fontWeight: 'normal',
          fontStyle: 'normal',
          lineHeight: 1,
          letterSpacing: 'normal',
          textTransform: 'none',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          wordWrap: 'normal',
          direction: 'ltr',
          WebkitFontFeatureSettings: 'liga',
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {icon.name}
      </FontIcon>
      <div className={clsx(ICON_CLASS, 'ph')}>
        <Skeleton
          animation="wave"
          height={iconWidth}
          width={iconWidth}
          sx={{
            transform: 'none',
            backgroundColor: 'grey.900',
          }}
        />
      </div>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO: a11y */}
      <div onClick={handleLabelClick}>{icon.module}</div>
      {/* eslint-enable jsx-a11y/click-events-have-key-events */}
    </StyledIcon>
  );
}

const Icons = React.memo(function Icons(props) {
  const { icons, handleOpenClick } = props;

  return (
    <div>
      {icons.map((icon) => (
        <Icon key={icon.module} icon={icon} onOpenClick={handleOpenClick} />
      ))}
    </div>
  );
});

Icons.propTypes = {
  handleOpenClick: PropTypes.func.isRequired,
  icons: PropTypes.array.isRequired,
};

const ImportLink = styled(Link)(({ theme }) => ({
  textAlign: 'right',
  padding: theme.spacing(0.5, 1),
}));

const Markdown = styled(HighlightedCode)(({ theme }) => ({
  cursor: 'pointer',
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    '& code': {
      backgroundColor: '#96c6fd80',
    },
  },
  '& pre': {
    borderRadius: 0,
    margin: 0,
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  cursor: 'pointer',
  transition: theme.transitions.create('background-color', {
    duration: theme.transitions.duration.shortest,
  }),
  '&:hover': {
    backgroundColor: '#96c6fd80',
  },
}));

const CanvasComponent = styled('div')(({ theme }) => ({
  fontSize: 210,
  color: (theme.vars ?? theme).palette.text.primary,
  backgroundSize: '30px 30px',
  backgroundColor: 'transparent',
  backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0',
  backgroundImage:
    'linear-gradient(45deg, #e6e6e6 25%, transparent 25%), linear-gradient(-45deg, #e6e6e6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e6e6e6 75%), linear-gradient(-45deg, transparent 75%, #e6e6e6 75%)',
  ...theme.applyStyles('dark', {
    backgroundImage:
      'linear-gradient(45deg, #595959 25%, transparent 25%), linear-gradient(-45deg, #595959 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #595959 75%), linear-gradient(-45deg, transparent 75%, #595959 75%)',
  }),
}));

const FontSizeComponent = styled('span')(({ theme }) => ({
  margin: theme.spacing(2),
}));

const ContextComponent = styled('div', {
  shouldForwardProp: (prop) => prop !== 'contextColor' && prop !== 'as',
})(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  boxSizing: 'content-box',
  variants: [
    {
      props: {
        contextColor: 'primary',
      },
      style: {
        color: (theme.vars ?? theme).palette.primary.main,
      },
    },
    {
      props: {
        contextColor: 'primaryInverse',
      },
      style: {
        color: (theme.vars ?? theme).palette.primary.contrastText,
        backgroundColor: (theme.vars ?? theme).palette.primary.main,
      },
    },
    {
      props: {
        contextColor: 'textPrimary',
      },
      style: {
        color: (theme.vars ?? theme).palette.text.primary,
      },
    },
    {
      props: {
        contextColor: 'textPrimaryInverse',
      },
      style: {
        color: (theme.vars ?? theme).palette.background.paper,
        backgroundColor: (theme.vars ?? theme).palette.text.primary,
      },
    },
    {
      props: {
        contextColor: 'textSecondary',
      },
      style: {
        color: (theme.vars ?? theme).palette.text.secondary,
      },
    },
    {
      props: {
        contextColor: 'textSecondaryInverse',
      },
      style: {
        color: (theme.vars ?? theme).palette.background.paper,
        backgroundColor: (theme.vars ?? theme).palette.text.secondary,
      },
    },
  ],
}));

const DialogDetails = React.memo(function DialogDetails(props) {
  const { open, selectedIcon, theme, weight, handleClose } = props;

  const t = useTranslate();
  const [copied1, setCopied1] = React.useState(false);
  const [copied2, setCopied2] = React.useState(false);

  const handleClick = (tooltip) => async (event) => {
    await copy(event.currentTarget.textContent);
    const setCopied = tooltip === 1 ? setCopied1 : setCopied2;

    setCopied(true);
  };

  const iconStyles = React.useCallback(
    (fontSize) => (th) => ({
      fontFamily: `Material Symbols ${theme}`,
      fontVariationSettings: `'wght' ${weight}, 'GRAD' ${th.colorSchemes.dark ? '-25' : '0'}`,
      fontSize,
      fontWeight: 'normal',
      fontStyle: 'normal',
      lineHeight: 1,
      letterSpacing: 'normal',
      textTransform: 'none',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      wordWrap: 'normal',
      direction: 'ltr',
      WebkitFontFeatureSettings: 'liga',
      WebkitFontSmoothing: 'antialiased',
    }),
    [theme, weight],
  );

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 2.5,
          backgroundImage: 'none',
          border: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {selectedIcon ? (
        <React.Fragment>
          <DialogTitle>
            <Tooltip
              placement="right"
              title={copied1 ? t('copied') : t('clickToCopy')}
              slotProps={{
                transition: {
                  onExited: () => setCopied1(false),
                },
              }}
            >
              <Title component="span" variant="inherit" onClick={handleClick(1)}>
                {selectedIcon.module}
              </Title>
            </Tooltip>
          </DialogTitle>
          <Tooltip
            placement="top"
            title={copied2 ? t('copied') : t('clickToCopy')}
            slotProps={{
              transition: { onExited: () => setCopied2(false) },
            }}
          >
            <Markdown
              copyButtonHidden
              onClick={handleClick(2)}
              code={`import ${selectedIcon.module}Icon from '@mui/symbols${theme === 'Outlined' ? '' : `-${theme.toLowerCase()}`}${weight === '400' ? '' : `-${weight}`}/${selectedIcon.module}';`}
              language="js"
            />
          </Tooltip>
          <ImportLink
            color="text.secondary"
            href="/material-ui/icons/"
            variant="caption"
          >
            {t('searchIcons.learnMore')}
          </ImportLink>
          <DialogContent>
            <Grid container>
              <Grid size="grow">
                <Grid container sx={{ justifyContent: 'center' }}>
                  <CanvasComponent as={FontIcon} sx={iconStyles()} baseClassName="">
                    {selectedIcon.name}
                  </CanvasComponent>
                </Grid>
              </Grid>
              <Grid size="grow">
                <Grid
                  container
                  sx={{ alignItems: 'flex-end', justifyContent: 'center' }}
                >
                  <Grid>
                    <Tooltip title="fontSize small">
                      <FontSizeComponent
                        as={FontIcon}
                        fontSize="inherit"
                        sx={iconStyles(20)}
                        baseClassName=""
                      >
                        {selectedIcon.name}
                      </FontSizeComponent>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip title="fontSize medium">
                      <FontSizeComponent
                        as={FontIcon}
                        fontSize="inherit"
                        sx={iconStyles(24)}
                        baseClassName=""
                      >
                        {selectedIcon.name}
                      </FontSizeComponent>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip title="fontSize large">
                      <FontSizeComponent
                        as={FontIcon}
                        fontSize="inherit"
                        sx={iconStyles(40)}
                        baseClassName=""
                      >
                        {selectedIcon.name}
                      </FontSizeComponent>
                    </Tooltip>
                  </Grid>
                  <Grid>
                    <Tooltip title="fontSize x-large">
                      <FontSizeComponent
                        as={FontIcon}
                        fontSize="inherit"
                        sx={iconStyles(48)}
                        baseClassName=""
                      >
                        {selectedIcon.name}
                      </FontSizeComponent>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <ContextComponent
                    as={FontIcon}
                    contextColor="primary"
                    fontSize="inherit"
                    sx={iconStyles(24)}
                    baseClassName=""
                  >
                    {selectedIcon.name}
                  </ContextComponent>
                  <ContextComponent
                    as={FontIcon}
                    contextColor="primaryInverse"
                    fontSize="inherit"
                    sx={iconStyles(24)}
                    baseClassName=""
                  >
                    {selectedIcon.name}
                  </ContextComponent>
                </Grid>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <ContextComponent
                    as={FontIcon}
                    contextColor="textPrimary"
                    fontSize="inherit"
                    sx={iconStyles(24)}
                    baseClassName=""
                  >
                    {selectedIcon.name}
                  </ContextComponent>
                  <ContextComponent
                    as={FontIcon}
                    contextColor="textPrimaryInverse"
                    fontSize="inherit"
                    sx={iconStyles(24)}
                    baseClassName=""
                  >
                    {selectedIcon.name}
                  </ContextComponent>
                </Grid>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <ContextComponent
                    as={FontIcon}
                    contextColor="textSecondary"
                    fontSize="inherit"
                    sx={iconStyles(24)}
                    baseClassName=""
                  >
                    {selectedIcon.name}
                  </ContextComponent>
                  <ContextComponent
                    as={FontIcon}
                    contextColor="textSecondaryInverse"
                    fontSize="inherit"
                    sx={iconStyles(24)}
                    baseClassName=""
                  >
                    {selectedIcon.name}
                  </ContextComponent>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <Button onClick={handleClose}>{t('close')}</Button>
          </DialogActions>
        </React.Fragment>
      ) : (
        <div />
      )}
    </Dialog>
  );
});

DialogDetails.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedIcon: PropTypes.object,
  theme: PropTypes.string.isRequired,
  weight: PropTypes.string.isRequired,
};

const Form = styled('form')({
  position: 'sticky',
  top: 80,
});

const Paper = styled(MuiPaper)(({ theme }) => ({
  position: 'sticky',
  top: 80,
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  width: '100%',
  borderRadius: '12px',
  border: '1px solid',
  borderColor: (theme.vars ?? theme).palette.divider,
  boxShadow: 'none',
}));

function formatNumber(value) {
  return new Intl.NumberFormat('en-US').format(value);
}

const Input = styled(InputBase)({
  flex: 1,
});

const searchIndex = new FlexSearchIndex({
  tokenize: 'full',
});

const allIconsMap = {};
allIcons.forEach((icon) => {
  let searchable = icon.module;
  if (synonyms[searchable]) {
    searchable += ` ${synonyms[searchable]}`;
  }
  searchIndex.add(icon.module, searchable);

  allIconsMap[icon.module] = icon;
});

if (process.env.NODE_ENV !== 'production') {
  Object.keys(synonyms).forEach((icon) => {
    if (!allIconsMap[icon]) {
      console.warn(`The icon ${icon} no longer exists. Remove it from \`synonyms\``);
    }
  });
}

/**
 * Returns the last defined value that has been passed in [value]
 */
function useLatest(value) {
  const latest = React.useRef(value);
  React.useEffect(() => {
    if (value !== undefined && value !== null) {
      latest.current = value;
    }
  }, [value]);
  return value ?? latest.current;
}

export default function SearchIcons() {
  const [theme, setTheme] = useQueryParameterState('theme', 'Outlined');
  const [weight, setWeight] = useQueryParameterState('weight', '400');
  const [selectedIcon, setSelectedIcon] = useQueryParameterState('selected', '');
  const [query, setQuery] = useQueryParameterState('query', '');

  const handleOpenClick = React.useCallback(
    (event) => {
      setSelectedIcon(event.currentTarget.getAttribute('title'));
    },
    [setSelectedIcon],
  );

  const handleClose = React.useCallback(() => {
    setSelectedIcon('');
  }, [setSelectedIcon]);

  const icons = React.useMemo(() => {
    const keys = query === '' ? null : searchIndex.search(query, { limit: 3000 });
    return keys === null ? allIcons : keys.map((key) => allIconsMap[key]);
  }, [query]);

  const deferredIcons = React.useDeferredValue(icons);

  const isPending = deferredIcons !== icons;

  React.useEffect(() => {
    // Keep track of the no results so we can add synonyms in the future.
    if (query.length >= 4 && icons.length === 0) {
      window.gtag('event', 'material-symbols', {
        eventAction: 'no-results',
        eventLabel: query,
      });
    }
  }, [query, icons.length]);

  const dialogSelectedIcon = useLatest(
    selectedIcon ? allIconsMap[selectedIcon] : null,
  );

  const [symbolsLoaded, setSymbolsLoaded] = React.useState({
    [`${theme}-${weight}`]: true, // on first render, font-display: block should work properly
  });
  const symbolsToLoad = React.useMemo(() => {
    const symbols = { Outlined: [], Rounded: [], Sharp: [] };
    symbols[theme] = [weight];

    Object.keys(symbolsLoaded).forEach((key) => {
      if (key !== `${theme}-${weight}`) {
        const options = key.split('-');
        symbols[options[0]].push(options[1]);
      }
    });

    const weightRanges = {};
    Object.keys(symbols).forEach((key) => {
      const weights = symbols[key];
      if (weights.length === 0) {
        return;
      }

      if (weights.length === 1) {
        weightRanges[key] = weights[0];
        return;
      }

      weights.sort();
      weightRanges[key] = `${weights[0]}..${weights[weights.length - 1]}`;
    });

    return weightRanges;
  }, [symbolsLoaded, theme, weight]);
  const updateLoadedSymbols = React.useCallback(async () => {
    await Promise.resolve(); // wait for the next tick in case the font hasn't been inserted into document.fonts yet

    const loaded = {};
    document.fonts.forEach((font) => {
      if (font.family.startsWith('Material Symbols')) {
        const fontTheme = font.family.split(' ')[2];
        const weightValue = font.weight.split(' ');
        if (weightValue.length === 1) {
          loaded[`${fontTheme}-${weightValue[0]}`] = true;
        } else if (weightValue.length === 2) {
          // The weight is a range
          const weightMin = Number(weightValue[0]);
          const weightMax = Number(weightValue[1]);
          [100, 200, 300, 400, 500, 600, 700].forEach((w) => {
            if (w >= weightMin && w <= weightMax) {
              loaded[`${fontTheme}-${w}`] = true;
            }
          });
        }
      }
    });

    setSymbolsLoaded((currentlyLoaded) => ({ ...currentlyLoaded, ...loaded }));
  }, []);
  React.useEffect(() => {
    document.fonts.addEventListener('loadingdone', updateLoadedSymbols);
    if (document.fonts.status === 'loaded') {
      updateLoadedSymbols();
    }

    return () => {
      document.fonts.removeEventListener('loadingdone', updateLoadedSymbols);
    };
  }, [updateLoadedSymbols]);

  const isVisible = symbolsLoaded[`${theme}-${weight}`];

  return (
    <Grid
      container
      sx={(t) => ({
        minHeight: 500,
        width: '100%',
        [`& .${ICON_CLASS}`]: {
          fontFamily: `Material Symbols ${theme}`,
          fontVariationSettings: `'wght' ${weight}, 'GRAD' ${t.colorSchemes.dark ? '-25' : '0'}`,
        },
      })}
    >
      <Head>
        {symbolsToLoad.Outlined && (
          <link
            href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,${symbolsToLoad.Outlined},0..1,-25..200&display=block`}
            rel="stylesheet"
          />
        )}
        {symbolsToLoad.Rounded && (
          <link
            href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,${symbolsToLoad.Rounded},0..1,-25..200&display=block`}
            rel="stylesheet"
          />
        )}
        {symbolsToLoad.Sharp && (
          <link
            href={`https://fonts.googleapis.com/css2?family=Material+Symbols+Sharp:opsz,wght,FILL,GRAD@20..48,${symbolsToLoad.Sharp},0..1,-25..200&display=block`}
            rel="stylesheet"
          />
        )}
      </Head>
      <Grid
        size={{
          xs: 12,
          sm: 3,
        }}
      >
        <Form>
          <Typography fontWeight={500} sx={{ mb: 1 }}>
            Filter the style
          </Typography>
          <RadioGroup
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
          >
            {['Outlined', 'Rounded', 'Sharp'].map((currentTheme) => {
              return (
                <FormControlLabel
                  key={currentTheme}
                  value={currentTheme}
                  control={<Radio size="small" />}
                  label={currentTheme}
                />
              );
            })}
          </RadioGroup>
        </Form>
        <Form>
          <Typography fontWeight={500} sx={{ mb: 1 }}>
            Filter the weight
          </Typography>
          <RadioGroup
            value={weight}
            onChange={(event) => setWeight(event.target.value)}
          >
            {['100', '200', '300', '400', '500', '600', '700'].map(
              (currentTheme) => {
                return (
                  <FormControlLabel
                    key={currentTheme}
                    value={currentTheme}
                    control={<Radio size="small" />}
                    label={currentTheme}
                  />
                );
              },
            )}
          </RadioGroup>
        </Form>
      </Grid>
      <Grid
        size={{
          xs: 12,
          sm: 9,
        }}
        sx={{
          [`& .${ICON_CLASS}.s`]: {
            display: isVisible ? 'block' : 'none',
          },
          [`& .${ICON_CLASS}.ph`]: {
            display: isVisible ? 'none' : 'block',
          },
        }}
      >
        <Paper>
          <IconButton sx={{ padding: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search icons…"
            inputProps={{ 'aria-label': 'search icons' }}
            endAdornment={
              isPending ? (
                <InputAdornment position="end">
                  <CircularProgress size={16} sx={{ mr: 2 }} />
                </InputAdornment>
              ) : null
            }
          />
        </Paper>
        <Typography sx={{ mb: 1 }}>{`${formatNumber(
          icons.length,
        )} matching results`}</Typography>
        <Icons icons={deferredIcons} handleOpenClick={handleOpenClick} />
      </Grid>
      <DialogDetails
        open={!!selectedIcon}
        selectedIcon={dialogSelectedIcon}
        theme={theme}
        weight={weight}
        handleClose={handleClose}
      />
    </Grid>
  );
}
