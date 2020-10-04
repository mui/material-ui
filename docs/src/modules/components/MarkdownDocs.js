import * as React from 'react';
import * as PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { exactProp } from '@material-ui/utils';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import ThumbUpIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownIcon from '@material-ui/icons/ThumbDownAlt';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import { SOURCE_CODE_ROOT_URL } from 'docs/src/modules/constants';
import { getCookie, pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import Head from 'docs/src/modules/components/Head';
import AppFrame from 'docs/src/modules/components/AppFrame';
import EditPage from 'docs/src/modules/components/EditPage';
import AppContainer from 'docs/src/modules/components/AppContainer';
import PageContext from 'docs/src/modules/components/PageContext';
import Link from 'docs/src/modules/components/Link';
import Demo from 'docs/src/modules/components/Demo';
import AppTableOfContents from 'docs/src/modules/components/AppTableOfContents';
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Ad from 'docs/src/modules/components/Ad';
import AdManager from 'docs/src/modules/components/AdManager';
import AdGuest from 'docs/src/modules/components/AdGuest';
import ComponentLinkHeader from 'docs/src/modules/components/ComponentLinkHeader';

const RATINGS_URL = 'https://5fm2imnpv2.execute-api.us-east-1.amazonaws.com/dev/rating';

function Comment(props) {
  const { onClose: handleClose, open } = props;
  const t = useSelector((state) => state.options.t);
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    handleClose(value);
  };

  const handleCancel = () => {
    handleClose(null);
  };

  return (
    <div>
      <Dialog
        open={open}
        onChange={handleChange}
        onClose={handleCancel}
        aria-labelledby="form-dialog-title"
        value={value}
      >
        <DialogTitle id="form-dialog-title">{t('ratingDialogTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('ratingDialogMessage')}</DialogContentText>
          <TextField
            multiline
            autoFocus
            variant="outlined"
            margin="dense"
            id="comment"
            fullWidth
            rows={6}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{t('cancel')}</Button>
          <Button variant="outlined" onClick={handleSubmit}>
            {t('submit')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

Comment.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};

const markdownComponents = {
  'modules/components/ComponentLinkHeader.js': ComponentLinkHeader,
};

function flattenPages(pages, current = []) {
  return pages.reduce((items, item) => {
    if (item.children && item.children.length > 1) {
      items = flattenPages(item.children, items);
    } else {
      items.push(item.children && item.children.length === 1 ? item.children[0] : item);
    }
    return items;
  }, current);
}

// To replace with .findIndex() once we stop IE 11 support.
function findIndex(array, comp) {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }

  return -1;
}

async function postData(data = {}) {

  const response = await fetch(RATINGS_URL, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    headers: { 'Content-Type': 'application/json' },
    referrerPolicy: 'origin',
    body: JSON.stringify(data),
  });
  return response.json();
}

async function getData(id) {
  const URL = `${RATINGS_URL}/${id}`;

  const response = await fetch(URL, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'omit',
    referrerPolicy: 'origin',
  });
  return response.json();
}

async function submitRating(page, rating, comment) {
  const data = {
    id: getCookie('ratingsId'),
    page,
    rating,
    comment,
  };

  const result = await postData(data);
  document.cookie = `ratingsId=${result.id};path=/;max-age=31536000`;
  document.cookie = `ratings=${JSON.stringify(await getData(result.id))};path=/;max-age=31536000`;
}

function getRatings() {
  if (process.browser) {
    const ratings = getCookie('ratings');
    return ratings && JSON.parse(ratings);
  }
  return undefined;
}

function getCurrentRating(pathname) {
  const ratings = getRatings();
  return ratings && ratings[pathname] && ratings[pathname].rating;
}

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  container: {
    position: 'relative',
  },
  actions: {
    position: 'absolute',
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  ad: {
    '& .description': {
      marginBottom: 198,
    },
    '& .description.ad': {
      marginBottom: 40,
    },
  },
  toc: {
    [theme.breakpoints.up('sm')]: {
      width: 'calc(100% - 175px)',
    },
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 175px - 240px)',
    },
  },
  footer: {
    marginTop: theme.spacing(12),
  },
  pagination: {
    margin: theme.spacing(3, 0, 4),
    display: 'flex',
    justifyContent: 'space-between',
  },
  pageLinkButton: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
  },
  feedbackMessage: {
    marginRight: 16,
  }
});

function MarkdownDocs(props) {
  const { classes, disableAd = false, disableToc = false, demos = {}, docs, requireDemo } = props;
  const t = useSelector((state) => state.options.t);
  const userLanguage = useSelector((state) => state.options.userLanguage);
  const { description, location, rendered, title, toc, headers } = docs[userLanguage] || docs.en;
  const { activePage, pages } = React.useContext(PageContext);
  const pageList = flattenPages(pages);
  const currentPageNum = findIndex(pageList, (page) => page.pathname === activePage?.pathname);
  const currentPage = pageList[currentPageNum];
  const prevPage = pageList[currentPageNum - 1];
  const nextPage = pageList[currentPageNum + 1];
  const [commentOpen, setCommentOpen] = React.useState(false);
  const [currentRating, setCurrentRating] = React.useState(getCurrentRating(currentPage.pathname));
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  const handleClickUp = () => {
    setCurrentRating(1);
    submitRating(currentPage.pathname, 1);
    setSnackbarOpen(true);
  };

  const handleClickDown = () => {
    setCommentOpen(true);
  };

  const handleCloseComment = (comment) => {
    setCommentOpen(false);
    if (comment !== null) {
      setCurrentRating(0);
      submitRating(currentPage.pathname, 0, comment);
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <AppFrame>
      <AdManager>
        <Head title={`${title} - Material-UI`} description={description} />
        {disableAd ? null : (
          <AdGuest>
            <Ad placement="body" />
          </AdGuest>
        )}
        <div
          className={clsx(classes.root, {
            [classes.ad]: !disableAd,
            [classes.toc]: !disableToc,
          })}
        >
          <AppContainer className={classes.container}>
            <div className={classes.actions}>
              <EditPage markdownLocation={location} />
            </div>
            {rendered.map((renderedMarkdownOrDemo, index) => {
              if (typeof renderedMarkdownOrDemo === 'string') {
                return <MarkdownElement key={index} renderedMarkdown={renderedMarkdownOrDemo} />;
              }

              if (renderedMarkdownOrDemo.component) {
                const Component = markdownComponents[renderedMarkdownOrDemo.component];
                return <Component key={index} headers={headers} options={renderedMarkdownOrDemo} />;
              }

              const name = renderedMarkdownOrDemo.demo;
              const demo = demos?.[name];
              if (demo === undefined) {
                const errorMessage = [
                  `Missing demo: ${name}. You can use one of the following:`,
                  Object.keys(demos),
                ].join('\n');

                if (userLanguage === 'en') {
                  throw new Error(errorMessage);
                }

                if (process.env.NODE_ENV !== 'production') {
                  console.error(errorMessage);
                }

                const warnIcon = (
                  <span role="img" aria-label={t('emojiWarning')}>
                    ⚠️
                  </span>
                );
                return (
                  <div key={index}>
                    {/* eslint-disable-next-line material-ui/no-hardcoded-labels */}
                    {warnIcon} Missing demo `{name}` {warnIcon}
                  </div>
                );
              }

              return (
                <Demo
                  key={index}
                  demo={{
                    raw: demo.raw,
                    js: requireDemo(demo.module).default,
                    rawTS: demo.rawTS,
                    tsx: demo.moduleTS ? requireDemo(demo.moduleTS).default : null,
                  }}
                  disableAd={disableAd}
                  demoOptions={renderedMarkdownOrDemo}
                  githubLocation={`${SOURCE_CODE_ROOT_URL}/docs/src/${name}`}
                />
              );
            })}
            <Comment open={commentOpen} onClose={handleCloseComment} />
            <footer className={classes.footer}>
              {!currentPage ||
              currentPage.displayNav === false ||
              (nextPage.displayNav === false && !prevPage) ? null : (
                <React.Fragment>
                  <Divider />
                  <div className={classes.pagination}>
                    {prevPage ? (
                      <Button
                        component={Link}
                        naked
                        href={prevPage.pathname}
                        size="large"
                        className={classes.pageLinkButton}
                        startIcon={<ChevronLeftIcon />}
                      >
                        {pageToTitleI18n(prevPage, t)}
                      </Button>
                    ) : (
                      <div />
                    )}
                    <NoSsr>
                      <div>
                        <Typography variant="subtitle1" component="span" className={classes.feedbackMessage}>{t('ratingMesssage')}</Typography>
                        <Tooltip title={t('ratingYes')}>
                          <IconButton
                            onClick={handleClickUp}
                            disabled={currentRating === 1}
                            aria-label={t('voteUp')}
                          >
                            <ThumbUpIcon color={currentRating === 1 ? 'primary' : undefined} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={t('ratingNo')}>
                          <IconButton
                            onClick={handleClickDown}
                            disabled={currentRating === 0}
                            aria-label={t('voteDown')}
                          >
                            <ThumbDownIcon color={currentRating === 0 ? 'error' : undefined} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </NoSsr>
                    {nextPage.displayNav === false ? null : (
                      <Button
                        component={Link}
                        naked
                        href={nextPage.pathname}
                        size="large"
                        className={classes.pageLinkButton}
                        endIcon={<ChevronRightIcon />}
                      >
                        {pageToTitleI18n(nextPage, t)}
                      </Button>
                    )}
                  </div>
                </React.Fragment>
              )}
            </footer>
          </AppContainer>
        </div>
        {disableToc ? null : <AppTableOfContents items={toc} />}
      </AdManager>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={t('ratingSubmitted')}
      />
    </AppFrame>
  );
}

MarkdownDocs.propTypes = {
  classes: PropTypes.object.isRequired,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  requireDemo: PropTypes.func,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}

export default withStyles(styles)(MarkdownDocs);
