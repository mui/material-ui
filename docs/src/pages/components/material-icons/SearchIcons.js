import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import MuiPaper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import copy from 'clipboard-copy';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import { Index as FlexSearchIndex } from 'flexsearch';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Link from 'docs/src/modules/components/Link';
import { useTranslate } from 'docs/src/modules/utils/i18n';
import * as mui from '@material-ui/icons';
import synonyms from './synonyms';

if (process.env.NODE_ENV !== 'production') {
  Object.keys(synonyms).forEach((icon) => {
    if (!mui[icon]) {
      console.warn(`The icon ${icon} no longer exists. Remove it from \`synonyms\``);
    }
  });
}

// If you're working on the logic, uncomment these imports
// and comment `import * as mui`, and the `if` block above.
// It will be much faster than working with all of the icons.

// import Menu from '@material-ui/icons/Menu';
// import MenuOutlined from '@material-ui/icons/MenuOutlined';
// import MenuRounded from '@material-ui/icons/MenuRounded';
// import MenuTwoTone from '@material-ui/icons/MenuTwoTone';
// import MenuSharp from '@material-ui/icons/MenuSharp';
// import ExitToApp from '@material-ui/icons/ExitToApp';
// import ExitToAppOutlined from '@material-ui/icons/ExitToAppOutlined';
// import ExitToAppRounded from '@material-ui/icons/ExitToAppRounded';
// import ExitToAppTwoTone from '@material-ui/icons/ExitToAppTwoTone';
// import ExitToAppSharp from '@material-ui/icons/ExitToAppSharp';
// import Delete from '@material-ui/icons/Delete';
// import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
// import DeleteRounded from '@material-ui/icons/DeleteRounded';
// import DeleteTwoTone from '@material-ui/icons/DeleteTwoTone';
// import DeleteSharp from '@material-ui/icons/DeleteSharp';
// import DeleteForever from '@material-ui/icons/DeleteForever';
// import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';
// import DeleteForeverRounded from '@material-ui/icons/DeleteForeverRounded';
// import DeleteForeverTwoTone from '@material-ui/icons/DeleteForeverTwoTone';
// import DeleteForeverSharp from '@material-ui/icons/DeleteForeverSharp';

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
  display: 'inline-block',
  width: 86,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: '0 4px',
  fontSize: 12,
  '& p': {
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}));

const StyledSvgIcon = styled(Box)(({ theme }) => ({
  boxSizing: 'content-box',
  cursor: 'pointer',
  color: theme.palette.text.primary,
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create(['background-color', 'box-shadow'], {
    duration: theme.transitions.duration.shortest,
  }),
  fontSize: 40,
  padding: theme.spacing(2),
  margin: theme.spacing(0.5, 0),
  '&:hover': {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[1],
  },
}));

const Icons = React.memo(function Icons(props) {
  const { icons, handleOpenClick } = props;

  const handleIconClick = (icon) => () => {
    if (Math.random() < 0.1) {
      window.ga('send', {
        hitType: 'event',
        eventCategory: 'material-icons',
        eventAction: 'click',
        eventLabel: icon.name,
      });
      window.ga('send', {
        hitType: 'event',
        eventCategory: 'material-icons-theme',
        eventAction: 'click',
        eventLabel: icon.theme,
      });
    }
  };

  const handleLabelClick = (event) => {
    selectNode(event.currentTarget);
  };

  return (
    <div>
      {icons.map((icon) => {
        /* eslint-disable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */
        return (
          <StyledIcon
            key={icon.importName}
            onClick={handleIconClick(icon)}
            className="markdown-body"
          >
            <StyledSvgIcon
              component={icon.Component}
              tabIndex={-1}
              onClick={handleOpenClick}
              title={icon.importName}
            />
            <p onClick={handleLabelClick}>{icon.importName}</p>
            {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
          </StyledIcon>
        );
      })}
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

const CanvasComponent = styled(Box)(({ theme }) => ({
  fontSize: 210,
  marginTop: theme.spacing(2),
  color: theme.palette.text.primary,
  backgroundSize: '30px 30px',
  backgroundColor: 'transparent',
  backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0',
  backgroundImage:
    theme.palette.mode === 'light'
      ? 'linear-gradient(45deg, #e6e6e6 25%, transparent 25%), linear-gradient(-45deg, #e6e6e6 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e6e6e6 75%), linear-gradient(-45deg, transparent 75%, #e6e6e6 75%)'
      : 'linear-gradient(45deg, #595959 25%, transparent 25%), linear-gradient(-45deg, #595959 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #595959 75%), linear-gradient(-45deg, transparent 75%, #595959 75%)',
}));

const FontSizeComponent = styled('span')(({ theme }) => ({
  margin: theme.spacing(2),
}));

const ContextComponent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'contextColor',
})(({ theme, contextColor }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  boxSizing: 'content-box',
  ...(contextColor === 'primary' && {
    color: theme.palette.primary.main,
  }),
  ...(contextColor === 'primaryInverse' && {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  }),
  ...(contextColor === 'textPrimary' && {
    color: theme.palette.text.primary,
  }),
  ...(contextColor === 'textPrimaryInverse' && {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.text.primary,
  }),
  ...(contextColor === 'textSecondary' && {
    color: theme.palette.text.secondary,
  }),
  ...(contextColor === 'textSecondaryInverse' && {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.text.secondary,
  }),
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
    <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose}>
      {selectedIcon ? (
        <React.Fragment>
          <DialogTitle disableTypography>
            <Tooltip
              placement="right"
              title={copied1 ? t('copied') : t('clickToCopy')}
              TransitionProps={{
                onExited: () => setCopied1(false),
              }}
            >
              <Title component="h2" variant="h6" onClick={handleClick(1)}>
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
              onClick={handleClick(2)}
              code={`import ${selectedIcon.importName}Icon from '@material-ui/icons/${selectedIcon.importName}';`}
              language="js"
            />
          </Tooltip>
          <ImportLink
            color="text.secondary"
            href="/components/icons/"
            variant="caption"
          >
            {t('searchIcons.learnMore')}
          </ImportLink>
          <DialogContent>
            <Grid container>
              <Grid item xs>
                <Grid container justifyContent="center">
                  <CanvasComponent component={selectedIcon.Component} />
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container alignItems="flex-end" justifyContent="center">
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
                <Grid container justifyContent="center">
                  <ContextComponent
                    component={selectedIcon.Component}
                    contextColor="primary"
                  />
                  <ContextComponent
                    component={selectedIcon.Component}
                    contextColor="primaryInverse"
                  />
                </Grid>
                <Grid container justifyContent="center">
                  <ContextComponent
                    component={selectedIcon.Component}
                    contextColor="textPrimary"
                  />
                  <ContextComponent
                    component={selectedIcon.Component}
                    contextColor="textPrimaryInverse"
                  />
                </Grid>
                <Grid container justifyContent="center">
                  <ContextComponent
                    component={selectedIcon.Component}
                    contextColor="textSecondary"
                  />
                  <ContextComponent
                    component={selectedIcon.Component}
                    contextColor="textSecondaryInverse"
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
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

const Form = styled('form')(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const Paper = styled(MuiPaper)(({ theme }) => ({
  position: 'sticky',
  top: 80,
  padding: '2px 4px',
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  width: '100%',
}));

const Input = styled(InputBase)({
  marginLeft: 8,
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

export default function SearchIcons() {
  const [theme, setTheme] = React.useState('Filled');
  const [keys, setKeys] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [selectedIcon, setSelectedIcon] = React.useState(null);

  const handleOpenClick = React.useCallback((event) => {
    setSelectedIcon(allIconsMap[event.currentTarget.getAttribute('title')]);
    setOpen(true);
  }, []);

  const handleClose = React.useCallback(() => {
    setOpen(false);
  }, []);

  const handleChange = React.useMemo(
    () =>
      debounce((value) => {
        if (value === '') {
          setKeys(null);
        } else {
          searchIndex.searchAsync(value).then((results) => {
            setKeys(results);

            // Keep track of the no results so we can add synonyms in the future.
            if (value.length >= 4 && results.length === 0) {
              window.ga('send', {
                hitType: 'event',
                eventCategory: 'material-icons',
                eventAction: 'no-results',
                eventLabel: value,
              });
            }
          });
        }
      }, 220),
    [],
  );

  React.useEffect(() => {
    return () => {
      handleChange.cancel();
    };
  }, [handleChange]);

  const icons = React.useMemo(
    () =>
      (keys === null ? allIcons : keys.map((key) => allIconsMap[key])).filter(
        (icon) => theme === icon.theme,
      ),
    [theme, keys],
  );

  return (
    <Grid container sx={{ minHeight: 500 }}>
      <Grid item xs={12} sm={3}>
        <Form>
          <RadioGroup>
            {['Filled', 'Outlined', 'Rounded', 'Two tone', 'Sharp'].map(
              (currentTheme) => {
                return (
                  <FormControlLabel
                    key={currentTheme}
                    control={
                      <Radio
                        checked={theme === currentTheme}
                        onChange={() => setTheme(currentTheme)}
                        value={currentTheme}
                      />
                    }
                    label={currentTheme}
                  />
                );
              },
            )}
          </RadioGroup>
        </Form>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Paper>
          <IconButton sx={{ padding: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <Input
            autoFocus
            onChange={(event) => {
              handleChange(event.target.value);
            }}
            placeholder="Search icons…"
            inputProps={{ 'aria-label': 'search icons' }}
          />
        </Paper>
        <Typography sx={{ mb: 1 }}>{`${icons.length} matching results`}</Typography>
        <Icons icons={icons} handleOpenClick={handleOpenClick} />
      </Grid>
      <DialogDetails
        open={open}
        selectedIcon={selectedIcon}
        handleClose={handleClose}
      />
    </Grid>
  );
}
