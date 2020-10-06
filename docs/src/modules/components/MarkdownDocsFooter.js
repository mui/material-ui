import * as React from 'react';
import * as PropTypes from 'prop-types';
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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import { getCookie, pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import Link from 'docs/src/modules/components/Link';

const RATINGS_URL = 'https://5fm2imnpv2.execute-api.us-east-1.amazonaws.com';

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
      <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
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
            value={value}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{t('cancel')}</Button>
          <Button variant="outlined" disabled={value.length < 20} onClick={handleSubmit}>
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

async function postRating(data = {}) {
  const env = location.hostname === 'material-ui.com' ? 'prod' : 'dev';
  try {
    const response = await fetch(`${RATINGS_URL}/${env}/rating`, {
      method: 'POST',
      referrerPolicy: 'origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function getRatings(id) {
  const env = location.hostname === 'material-ui.com' ? 'prod' : 'dev';
  const URL = `${RATINGS_URL}/${env}/ratings/${id}`;

  try {
    const response = await fetch(URL, {
      method: 'GET',
      cache: 'no-store',
      referrerPolicy: 'origin',
    });
    return response.json();
  } catch (error) {
    console.log(error);
  }
}

async function submitRating(page, rating, comment) {
  const data = {
    id: getCookie('ratingsId'),
    page,
    version: process.env.LIB_VERSION,
    rating,
    comment,
  };

  const result = await postRating(data);
  if (result) {
    document.cookie = `ratingsId=${result.id};path=/;max-age=31536000`;
    const ratings = await getRatings(result.id);
    if (ratings) {
      document.cookie = `ratings=${JSON.stringify(ratings)};path=/;max-age=31536000`;
      return result;
    }
  }
  return result;
}

function getCurrentRating(pathname) {
  let ratings;
  if (process.browser) {
    ratings = getCookie('ratings');
    ratings = ratings && JSON.parse(ratings);
  }
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
  },
});

function MarkdownDocsFooter(props) {
  const { classes, docs } = props;
  const t = useSelector((state) => state.options.t);
  const userLanguage = useSelector((state) => state.options.userLanguage);
  const { description } = docs[userLanguage] || docs.en;
  const { activePage, pages } = React.useContext(PageContext);
  const pageList = flattenPages(pages);
  const currentPageNum = findIndex(pageList, (page) => page.pathname === activePage?.pathname);
  const currentPage = pageList[currentPageNum];
  const prevPage = pageList[currentPageNum - 1];
  const nextPage = pageList[currentPageNum + 1];
  const [commentOpen, setCommentOpen] = React.useState(false);
  const [currentRating, setCurrentRating] = React.useState();
  const [snackbarMessage, setSnackbarMessage] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  if (description === undefined) {
    throw new Error('Missing description in the page');
  }

  React.useEffect(() => {
    setCurrentRating(getCurrentRating(currentPage.pathname));
  }, [currentPage.pathname]);

  const handleClickUp = async () => {
    const result = await submitRating(currentPage.pathname, 1);
    if (result) {
      setCurrentRating(1);
      setSnackbarMessage(t('ratingSubmitted'));
    } else {
      setSnackbarMessage(t('ratingFailed'));
    }
    setSnackbarOpen(true);
  };

  const handleClickDown = () => {
    setCommentOpen(true);
  };

  const handleCloseComment = async (comment) => {
    setCommentOpen(false);
    if (comment !== null) {
      const result = await submitRating(currentPage.pathname, 0, comment);
      if (result) {
        setCurrentRating(0);
        setSnackbarMessage(t('ratingSubmitted'));
      } else {
        setSnackbarMessage(t('ratingFailed'));
      }
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <React.Fragment>
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
              <div>
                <Typography
                  variant="subtitle1"
                  component="span"
                  className={classes.feedbackMessage}
                >
                  {t('ratingMessage')}
                </Typography>
                <Tooltip title={t('ratingYes')}>
                  <IconButton onClick={handleClickUp} disabled={currentRating === 1}>
                    <ThumbUpIcon color={currentRating === 1 ? 'primary' : undefined} />
                  </IconButton>
                </Tooltip>
                <Tooltip title={t('ratingNo')}>
                  <IconButton onClick={handleClickDown} disabled={currentRating === 0}>
                    <ThumbDownIcon color={currentRating === 0 ? 'error' : undefined} />
                  </IconButton>
                </Tooltip>
              </div>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}

MarkdownDocsFooter.propTypes = {
  classes: PropTypes.object.isRequired,
  docs: PropTypes.object.isRequired,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocsFooter.propTypes = exactProp(MarkdownDocsFooter.propTypes);
}

export default withStyles(styles)(MarkdownDocsFooter);
