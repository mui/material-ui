import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import clsx from 'clsx';
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
import FlexSearch from 'flexsearch';
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Link from 'docs/src/modules/components/Link';
import * as mui from '@material-ui/icons';
import synonyms from './synonyms';

if (process.env.NODE_ENV !== 'production') {
  Object.keys(synonyms).forEach((icon) => {
    if (!mui[icon]) {
      throw new Error(`The icon ${icon} does no longer exist.`);
    }
  });
}

// Working on the logic? Uncomment these imports.
// It will be x10 faster than working with all of the icons.

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

let Icons = (props) => {
  const { icons, classes, handleOpenClick } = props;

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
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          <span
            key={icon.importName}
            onClick={handleIconClick(icon)}
            className={clsx('markdown-body', classes.icon)}
          >
            <icon.Component
              tabIndex={-1}
              onClick={handleOpenClick}
              title={icon.importName}
              className={classes.iconSvg}
            />
            <p onClick={handleLabelClick}>{icon.importName}</p>
            {/* eslint-enable jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events */}
          </span>
        );
      })}
    </div>
  );
};

Icons.propTypes = {
  classes: PropTypes.object.isRequired,
  handleOpenClick: PropTypes.func.isRequired,
  icons: PropTypes.array.isRequired,
};
Icons = React.memo(Icons);

const useDialogStyles = makeStyles((theme) => ({
  markdown: {
    '& pre': {
      borderRadius: 0,
      margin: 0,
    },
  },
  import: {
    textAlign: 'right',
    padding: theme.spacing(0.5, 1),
  },
  container: {
    marginBottom: theme.spacing(5),
  },
  canvas: {
    fontSize: 210,
    marginTop: theme.spacing(2),
    color: theme.palette.primary.dark,
    backgroundSize: '30px 30px',
    backgroundColor: '#fff',
    backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0',
    backgroundImage:
      'linear-gradient(45deg, #f4f4f4 25%, transparent 25%), linear-gradient(-45deg, #f4f4f4 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f4f4f4 75%), linear-gradient(-45deg, transparent 75%, #f4f4f4 75%)',
  },
  fontSize: {
    margin: theme.spacing(2),
  },
  context: {
    margin: theme.spacing(0.5),
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    boxSizing: 'content-box',
  },
  contextPrimary: {
    color: theme.palette.primary.main,
  },
  contextPrimaryInverse: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  contextTextPrimary: {
    color: theme.palette.text.primary,
  },
  contextTextPrimaryInverse: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.text.primary,
  },
  contextTextSecondary: {
    color: theme.palette.text.secondary,
  },
  contextTextSecondaryInverse: {
    color: theme.palette.background.paper,
    backgroundColor: theme.palette.text.secondary,
  },
}));

let DialogDetails = (props) => {
  const classes = useDialogStyles();
  const { open, selectedIcon, handleClose } = props;

  const handleClick = (event) => {
    selectNode(event.currentTarget);
  };

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="icon-dialog-title"
    >
      {selectedIcon ? (
        <React.Fragment>
          <DialogTitle id="icon-dialog-title" onClick={handleClick}>
            {selectedIcon.importName}
          </DialogTitle>
          <HighlightedCode
            className={classes.markdown}
            onClick={handleClick}
            code={`import ${selectedIcon.importName}Icon from '@material-ui/icons/${selectedIcon.importName}';`}
            language="js"
          />
          <Link
            className={classes.import}
            color="textSecondary"
            href="/components/icons/"
            variant="caption"
          >
            Learn more about the import
          </Link>
          <DialogContent>
            <Grid container className={classes.container}>
              <Grid item xs={12} sm="auto">
                <Grid container justifyContent="center">
                  <selectedIcon.Component className={classes.canvas} />
                </Grid>
              </Grid>
              <Grid item xs>
                <Grid container alignItems="flex-end" justifyContent="center">
                  <Grid item>
                    <Tooltip title="fontSize small">
                      <selectedIcon.Component
                        className={classes.fontSize}
                        fontSize="small"
                      />
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="fontSize medium">
                      <selectedIcon.Component className={classes.fontSize} />
                    </Tooltip>
                  </Grid>
                  <Grid item>
                    <Tooltip title="fontSize large">
                      <selectedIcon.Component
                        className={classes.fontSize}
                        fontSize="large"
                      />
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container justifyContent="center">
                  <selectedIcon.Component
                    className={clsx(classes.context, classes.contextPrimary)}
                  />
                  <selectedIcon.Component
                    className={clsx(
                      classes.context,
                      classes.contextPrimaryInverse,
                    )}
                  />
                </Grid>
                <Grid container justifyContent="center">
                  <selectedIcon.Component
                    className={clsx(
                      classes.context,
                      classes.contextTextPrimary,
                    )}
                  />
                  <selectedIcon.Component
                    className={clsx(
                      classes.context,
                      classes.contextTextPrimaryInverse,
                    )}
                  />
                </Grid>
                <Grid container justifyContent="center">
                  <selectedIcon.Component
                    className={clsx(
                      classes.context,
                      classes.contextTextSecondary,
                    )}
                  />
                  <selectedIcon.Component
                    className={clsx(
                      classes.context,
                      classes.contextTextSecondaryInverse,
                    )}
                  />
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </React.Fragment>
      ) : (
        <div />
      )}
    </Dialog>
  );
};

DialogDetails.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedIcon: PropTypes.object,
};
DialogDetails = React.memo(DialogDetails);

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 500,
  },
  form: {
    margin: theme.spacing(2, 0),
  },
  paper: {
    position: 'sticky',
    top: 80,
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
    width: '100%',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  icon: {
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
  },
  iconSvg: {
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
  },
  results: {
    marginBottom: theme.spacing(1),
  },
}));

const searchIndex = FlexSearch.create({
  async: true,
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
    searchIndex.add(importName, searchable);

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
  const classes = useStyles();
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

  const isMounted = React.useRef(false);
  React.useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleChange = React.useMemo(
    () =>
      debounce((value) => {
        if (!isMounted.current) {
          return;
        }

        if (value === '') {
          setKeys(null);
        } else {
          searchIndex.search(value).then((results) => {
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

  const icons = React.useMemo(
    () =>
      (keys === null ? allIcons : keys.map((key) => allIconsMap[key])).filter(
        (icon) => theme === icon.theme,
      ),
    [theme, keys],
  );

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={3}>
        <form className={classes.form}>
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
        </form>
      </Grid>
      <Grid item xs={12} sm={9}>
        <Paper className={classes.paper}>
          <IconButton className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            autoFocus
            onChange={(event) => {
              handleChange(event.target.value);
            }}
            className={classes.input}
            placeholder="Search icons…"
            inputProps={{ 'aria-label': 'search icons' }}
          />
        </Paper>
        <Typography
          className={classes.results}
        >{`${icons.length} matching results`}</Typography>
        <Icons
          icons={icons}
          classes={classes}
          handleOpenClick={handleOpenClick}
        />
      </Grid>
      <DialogDetails
        open={open}
        selectedIcon={selectedIcon}
        handleClose={handleClose}
      />
    </Grid>
  );
}
