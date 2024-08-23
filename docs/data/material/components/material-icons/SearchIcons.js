import * as React from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
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
import flexsearch from 'flexsearch';
import SearchIcon from '@mui/icons-material/Search';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import SvgIcon from '@mui/material/SvgIcon';
import * as mui from '@mui/icons-material';
import { Link } from '@mui/docs/Link';
import { useTranslate } from '@mui/docs/i18n';
import useQueryParameterState from 'docs/src/modules/utils/useQueryParameterState';
// For Debugging
// import Menu from '@mui/icons-material/Menu';
// import MenuOutlined from '@mui/icons-material/MenuOutlined';
// import MenuRounded from '@mui/icons-material/MenuRounded';
// import MenuTwoTone from '@mui/icons-material/MenuTwoTone';
// import MenuSharp from '@mui/icons-material/MenuSharp';
// import ExitToApp from '@mui/icons-material/ExitToApp';
// import ExitToAppOutlined from '@mui/icons-material/ExitToAppOutlined';
// import ExitToAppRounded from '@mui/icons-material/ExitToAppRounded';
// import ExitToAppTwoTone from '@mui/icons-material/ExitToAppTwoTone';
// import ExitToAppSharp from '@mui/icons-material/ExitToAppSharp';
// import Delete from '@mui/icons-material/Delete';
// import DeleteOutlined from '@mui/icons-material/DeleteOutlined';
// import DeleteRounded from '@mui/icons-material/DeleteRounded';
// import DeleteTwoTone from '@mui/icons-material/DeleteTwoTone';
// import DeleteSharp from '@mui/icons-material/DeleteSharp';
// import DeleteForever from '@mui/icons-material/DeleteForever';
// import DeleteForeverOutlined from '@mui/icons-material/DeleteForeverOutlined';
// import DeleteForeverRounded from '@mui/icons-material/DeleteForeverRounded';
// import DeleteForeverTwoTone from '@mui/icons-material/DeleteForeverTwoTone';
// import DeleteForeverSharp from '@mui/icons-material/DeleteForeverSharp';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import synonyms from './synonyms';

const FlexSearchIndex = flexsearch.Index;

// const mui = {
//   ExitToApp,
//   ExitToAppOutlined,
//   ExitToAppRounded,
//   ExitToAppTwoTone,
//   ExitToAppSharp,
//   Menu,
//   MenuOutlined,
//   MenuRounded,
//   MenuTwoTone,
//   MenuSharp,
//   Delete,
//   DeleteOutlined,
//   DeleteRounded,
//   DeleteTwoTone,
//   DeleteSharp,
//   DeleteForever,
//   DeleteForeverOutlined,
//   DeleteForeverRounded,
//   DeleteForeverTwoTone,
//   DeleteForeverSharp,
// };

if (process.env.NODE_ENV !== 'production') {
  Object.keys(synonyms).forEach((icon) => {
    if (!mui[icon]) {
      console.warn(`The icon ${icon} no longer exists. Remove it from \`synonyms\``);
    }
  });
}

function selectNode(node) {
  // Clear any current selection
  const selection = window.getSelection();
  selection.removeAllRanges();

  // Select code
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.addRange(range);
}

const StyledIcon = styled('span')(({ theme }) => ({
  display: 'inline-flex',
  flexDirection: 'column',
  color: theme.palette.text.secondary,
  margin: '0 4px',
  '& > div': {
    display: 'flex',
  },
  '& > div > *': {
    flexGrow: 1,
    fontSize: '.6rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    textAlign: 'center',
    width: 0,
  },
}));

const StyledSvgIcon = styled(SvgIcon)(({ theme }) => ({
  boxSizing: 'content-box',
  cursor: 'pointer',
  color: theme.palette.text.primary,
  border: '1px solid transparent',
  borderRadius: '12px',
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.shortest,
  }),
  padding: theme.spacing(2),
  margin: theme.spacing(0.5, 0),
  '&:hover': {
    backgroundColor: theme.palette.background.default,
    borderColor: theme.palette.primary.light,
  },
}));

const ListWrapper = React.forwardRef(({ style, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      style={{ display: 'flex', flexWrap: 'wrap', ...style }}
    >
      {children}
    </div>
  );
});

function Icon(handleOpenClick) {
  return function itemContent(_, icon) {
    const handleIconClick = () => {
      if (Math.random() < 0.1) {
        window.gtag('event', 'material-icons', {
          eventAction: 'click',
          eventLabel: icon.name,
        });
        window.gtag('event', 'material-icons-theme', {
          eventAction: 'click',
          eventLabel: icon.theme,
        });
      }
    };

    const handleLabelClick = (event) => {
      selectNode(event.currentTarget);
    };

    return (
      /* eslint-disable jsx-a11y/click-events-have-key-events */
      <StyledIcon key={icon.importName} onClick={handleIconClick}>
        <StyledSvgIcon
          component={icon.Component}
          fontSize="large"
          tabIndex={-1}
          onClick={handleOpenClick}
          title={icon.importName}
        />
        <div>
          {/*  eslint-disable-next-line jsx-a11y/no-static-element-interactions -- TODO: a11y */}
          <div onClick={handleLabelClick}>{icon.importName}</div>
        </div>
        {/* eslint-enable jsx-a11y/click-events-have-key-events */}
      </StyledIcon>
    );
  };
}

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
  color: theme.palette.text.primary,
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
        color: theme.palette.primary.main,
      },
    },
    {
      props: {
        contextColor: 'primaryInverse',
      },
      style: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
      },
    },
    {
      props: {
        contextColor: 'textPrimary',
      },
      style: {
        color: theme.palette.text.primary,
      },
    },
    {
      props: {
        contextColor: 'textPrimaryInverse',
      },
      style: {
        color: theme.palette.background.paper,
        backgroundColor: theme.palette.text.primary,
      },
    },
    {
      props: {
        contextColor: 'textSecondary',
      },
      style: {
        color: theme.palette.text.secondary,
      },
    },
    {
      props: {
        contextColor: 'textSecondaryInverse',
      },
      style: {
        color: theme.palette.background.paper,
        backgroundColor: theme.palette.text.secondary,
      },
    },
  ],
}));

const DialogDetails = React.memo(function DialogDetails(props) {
  const { open, selectedIcon, handleClose } = props;

  const t = useTranslate();
  const [copied1, setCopied1] = React.useState(false);
  const [copied2, setCopied2] = React.useState(false);

  const handleClick = (tooltip) => async (event) => {
    await copy(event.currentTarget.textContent);
    const setCopied = tooltip === 1 ? setCopied1 : setCopied2;

    setCopied(true);
  };

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
              TransitionProps={{
                onExited: () => setCopied1(false),
              }}
            >
              <Title component="span" variant="inherit" onClick={handleClick(1)}>
                {selectedIcon.importName}
              </Title>
            </Tooltip>
          </DialogTitle>
          <Tooltip
            placement="top"
            title={copied2 ? t('copied') : t('clickToCopy')}
            TransitionProps={{ onExited: () => setCopied2(false) }}
          >
            <Markdown
              copyButtonHidden
              onClick={handleClick(2)}
              code={`import ${selectedIcon.importName}Icon from '@mui/icons-material/${selectedIcon.importName}';`}
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
              <Grid item xs>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <CanvasComponent as={selectedIcon.Component} />
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid
                  container
                  sx={{ alignItems: 'flex-end', justifyContent: 'center' }}
                >
                  <Grid item>
                    <Tooltip title="fontSize small">
                      <FontSizeComponent
                        as={selectedIcon.Component}
                        fontSize="small"
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="fontSize medium">
                      <FontSizeComponent as={selectedIcon.Component} />
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="fontSize large">
                      <FontSizeComponent
                        as={selectedIcon.Component}
                        fontSize="large"
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <ContextComponent
                    as={selectedIcon.Component}
                    contextColor="primary"
                  />
                  <ContextComponent
                    as={selectedIcon.Component}
                    contextColor="primaryInverse"
                  />
                </Grid>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <ContextComponent
                    as={selectedIcon.Component}
                    contextColor="textPrimary"
                  />
                  <ContextComponent
                    as={selectedIcon.Component}
                    contextColor="textPrimaryInverse"
                  />
                </Grid>
                <Grid container sx={{ justifyContent: 'center' }}>
                  <ContextComponent
                    as={selectedIcon.Component}
                    contextColor="textSecondary"
                  />
                  <ContextComponent
                    as={selectedIcon.Component}
                    contextColor="textSecondaryInverse"
                  />
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
};

const Paper = styled(MuiPaper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  width: '100%',
  borderRadius: '12px',
  border: '1px solid',
  borderColor: theme.palette.divider,
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
const allIcons = Object.keys(mui)
  .sort()
  .map((importName) => {
    let theme;
    if (importName.indexOf('Outlined') !== -1) {
      theme = 'Outlined';
    } else if (importName.indexOf('TwoTone') !== -1) {
      theme = 'Two tone';
    } else if (importName.indexOf('Rounded') !== -1) {
      theme = 'Rounded';
    } else if (importName.indexOf('Sharp') !== -1) {
      theme = 'Sharp';
    } else {
      theme = 'Filled';
    }

    const name = importName.replace(/(Outlined|TwoTone|Rounded|Sharp)$/, '');
    let searchable = name;
    if (synonyms[searchable]) {
      searchable += ` ${synonyms[searchable]}`;
    }
    searchIndex.addAsync(importName, searchable);

    const icon = {
      importName,
      name,
      theme,
      Component: mui[importName],
    };
    allIconsMap[importName] = icon;
    return icon;
  });

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
  const [theme, setTheme] = useQueryParameterState('theme', 'Filled');
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

  const deferredQuery = React.useDeferredValue(query);
  const deferredTheme = React.useDeferredValue(theme);

  const isPending = query !== deferredQuery || theme !== deferredTheme;

  const icons = React.useMemo(() => {
    const keys =
      deferredQuery === ''
        ? null
        : searchIndex.search(deferredQuery, { limit: 3000 });
    return (keys === null ? allIcons : keys.map((key) => allIconsMap[key])).filter(
      (icon) => deferredTheme === icon.theme,
    );
  }, [deferredQuery, deferredTheme]);

  React.useEffect(() => {
    // Keep track of the no results so we can add synonyms in the future.
    if (deferredQuery.length >= 4 && icons.length === 0) {
      window.gtag('event', 'material-icons', {
        eventAction: 'no-results',
        eventLabel: deferredQuery,
      });
    }
  }, [deferredQuery, icons.length]);

  const dialogSelectedIcon = useLatest(
    selectedIcon ? allIconsMap[selectedIcon] : null,
  );

  return (
    <Grid container sx={{ minHeight: 500 }}>
      <Grid item xs={12} sm={3}>
        <form>
          <Typography fontWeight={500} sx={{ mb: 1 }}>
            Filter the style
          </Typography>
          <RadioGroup
            value={theme}
            onChange={(event) => setTheme(event.target.value)}
          >
            {['Filled', 'Outlined', 'Rounded', 'Two tone', 'Sharp'].map(
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
        </form>
      </Grid>
      <Grid item xs={12} sm={9}>
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
        <VirtuosoGrid
          style={{ height: 500 }}
          data={icons}
          components={{ List: ListWrapper }}
          itemContent={Icon(handleOpenClick)}
        />
      </Grid>
      {/* Temporary fix for Dialog not closing sometimes and Backdrop stuck at opacity 0 (see issue https://github.com/mui/material-ui/issues/32286). One disadvantage is that the closing animation is not applied. */}
      {selectedIcon ? (
        <DialogDetails
          open={!!selectedIcon}
          selectedIcon={dialogSelectedIcon}
          handleClose={handleClose}
        />
      ) : null}
    </Grid>
  );
}
