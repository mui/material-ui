/* eslint-disable no-restricted-globals */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDownAlt';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Snackbar from '@mui/material/Snackbar';
import { getCookie, pageToTitleI18n } from 'docs/src/modules/utils/helpers';
import PageContext from 'docs/src/modules/components/PageContext';
import Link from 'docs/src/modules/components/Link';
import { useUserLanguage, useTranslate } from 'docs/src/modules/utils/i18n';

const Footer = styled('footer')(({ theme }) => {
  return {
    marginTop: theme.spacing(12),
  };
});

const PaginationDiv = styled('div')(({ theme }) => {
  return {
    margin: theme.spacing(3, 0, 4),
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  };
});

const PageLinkButton = styled(Button)(({ theme }) => {
  return {
    textTransform: 'none',
    fontWeight: 500,
    color: theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[500],
  };
});

const FeedbackGrid = styled(Grid)(({ theme }) => {
  return {
    width: 'auto',
    color: theme.palette.text.secondary,
    [theme.breakpoints.down('sm')]: {
      order: 3,
      marginTop: 40,
      width: '100%',
    },
  };
});

const FeedbackMessage = styled(Typography)(({ theme }) => {
  return {
    margin: theme.spacing(0, 2),
  };
});

/**
 * @typedef {import('docs/src/pages').MuiPage} MuiPage
 * @typedef {import('docs/src/pages').OrderedMuiPage} OrderedMuiPage
 */

/**
 * @param {MuiPage[]} pages
 * @param {MuiPage[]} [current]
 * @returns {OrderedMuiPage[]}
 */
function orderedPages(pages, current = []) {
  return pages
    .reduce((items, item) => {
      if (item.children && item.children.length > 1) {
        items = orderedPages(item.children, items);
      } else {
        items.push(item.children && item.children.length === 1 ? item.children[0] : item);
      }
      return items;
    }, current)
    .filter((page) => {
      return (
        page.inSideNav !== false &&
        // ignore external pages
        page.pathname.startsWith('/')
      );
    });
}

async function postFeedback(data) {
  const env = window.location.host.indexOf('mui.com') !== -1 ? 'prod' : 'dev';
  try {
    const response = await fetch(`${process.env.FEEDBACK_URL}/${env}/feedback`, {
      method: 'POST',
      referrerPolicy: 'origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function postFeedbackOnSlack(data) {
  const { rating, comment, version, language } = data;

  if (!comment || comment.length < 10) {
    return;
  }

  const env = window.location.host.indexOf('mui.com') !== -1 ? 'prod' : 'dev';

  if (env === 'dev') {
    // return;
  }

  const slackMessage = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `New comment ${rating > 0 ? '👍' : '👎'}`,
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'plain_text',
          text: comment,
          emoji: true,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `v: ${version}, lang: ${language}`,
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Go to the page',
            emoji: true,
          },
          url: window.location.host,
        },
      },
    ],
  };
  try {
    await fetch(`https://hooks.slack.com/services/${process.env.SLACK_FEEDBACKS_TOKEN}`, {
      method: 'POST',
      referrerPolicy: 'origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackMessage),
    });
  } catch (error) {
    console.error(error);
  }
}

async function getUserFeedback(id) {
  const env = location.hostname === 'mui.com' ? 'prod' : 'dev';
  const URL = `${process.env.FEEDBACK_URL}/${env}/feedback/${id}`;

  try {
    const response = await fetch(URL, {
      method: 'GET',
      cache: 'no-store',
      referrerPolicy: 'origin',
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function submitFeedback(page, rating, comment, language) {
  const data = {
    id: getCookie('feedbackId'),
    page,
    rating,
    comment,
    version: process.env.LIB_VERSION,
    language,
  };

  await postFeedbackOnSlack(data);
  const result = await postFeedback(data);
  if (result) {
    document.cookie = `feedbackId=${result.id};path=/;max-age=31536000`;
    setTimeout(async () => {
      const userFeedback = await getUserFeedback(result.id);
      if (userFeedback) {
        document.cookie = `feedback=${JSON.stringify(userFeedback)};path=/;max-age=31536000`;
      }
    });
  }
  return result;
}

function getCurrentRating(pathname) {
  let userFeedback;
  if (typeof window !== 'undefined') {
    userFeedback = getCookie('feedback');
    userFeedback = userFeedback && JSON.parse(userFeedback);
  }
  return userFeedback && userFeedback[pathname] && userFeedback[pathname].rating;
}

/**
 * @returns { { prevPage: OrderedMuiPage | null; nextPage: OrderedMuiPage | null } }
 */
function usePageNeighbours() {
  const { activePage, pages } = React.useContext(PageContext);
  const pageList = orderedPages(pages);
  const currentPageNum = pageList.indexOf(activePage);

  if (currentPageNum === -1) {
    return { prevPage: null, nextPage: null };
  }

  const prevPage = pageList[currentPageNum - 1] ?? null;
  const nextPage = pageList[currentPageNum + 1] ?? null;

  return { prevPage, nextPage };
}

export default function AppLayoutDocsFooter() {
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const { activePage } = React.useContext(PageContext);
  const [rating, setRating] = React.useState();
  const [comment, setComment] = React.useState('');
  const [commentOpen, setCommentOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(false);
  const inputRef = React.useRef();

  const { nextPage, prevPage } = usePageNeighbours();

  const setCurrentRatingFromCookie = React.useCallback(() => {
    if (activePage !== null) {
      setRating(getCurrentRating(activePage.pathname));
    }
  }, [activePage]);

  React.useEffect(() => {
    setCurrentRatingFromCookie();
  }, [setCurrentRatingFromCookie]);

  async function processFeedback() {
    if (activePage === null) {
      setSnackbarMessage(t('feedbackFailed'));
    }

    const result = await submitFeedback(activePage.pathname, rating, comment, userLanguage);
    if (result) {
      setSnackbarMessage(t('feedbackSubmitted'));
    } else {
      setCurrentRatingFromCookie();
      setSnackbarMessage(t('feedbackFailed'));
    }
    setSnackbarOpen(true);
  }

  const handleClickThumb = (vote) => async () => {
    if (vote !== rating) {
      setRating(vote);
      setCommentOpen(true);
    }
  };

  const handleChangeTextfield = (event) => {
    setComment(event.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault();
    setCommentOpen(false);
    processFeedback();
  };

  const handleCancelComment = () => {
    setCommentOpen(false);
    setCurrentRatingFromCookie();
  };

  const handleEntered = () => {
    inputRef.current.focus();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const hidePagePagination = activePage === null || activePage.ordered === false;

  return (
    <React.Fragment>
      <Footer>
        {hidePagePagination ? null : (
          <React.Fragment>
            <Divider />
            <PaginationDiv>
              {prevPage !== null ? (
                <PageLinkButton
                  component={Link}
                  noLinkStyle
                  href={prevPage.pathname}
                  {...prevPage.linkProps}
                  size="medium"
                  startIcon={<ChevronLeftIcon />}
                >
                  {pageToTitleI18n(prevPage, t)}
                </PageLinkButton>
              ) : (
                <div />
              )}
              <FeedbackGrid
                container
                role="group"
                justifyContent="center"
                alignItems="center"
                aria-labelledby="feedback-message"
              >
                <FeedbackMessage
                  align="center"
                  component="div"
                  id="feedback-message"
                  variant="body2"
                >
                  {t('feedbackMessage')}
                </FeedbackMessage>
                <div>
                  <Tooltip title={t('feedbackYes')}>
                    <IconButton onClick={handleClickThumb(1)} aria-pressed={rating === 1}>
                      <ThumbUpIcon fontSize="small" color={rating === 1 ? 'primary' : undefined} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('feedbackNo')}>
                    <IconButton onClick={handleClickThumb(0)} aria-pressed={rating === 0}>
                      <ThumbDownIcon fontSize="small" color={rating === 0 ? 'error' : undefined} />
                    </IconButton>
                  </Tooltip>
                </div>
              </FeedbackGrid>
              {nextPage !== null ? (
                <PageLinkButton
                  component={Link}
                  noLinkStyle
                  href={nextPage.pathname}
                  {...nextPage.linkProps}
                  size="medium"
                  endIcon={<ChevronRightIcon />}
                >
                  {pageToTitleI18n(nextPage, t)}
                </PageLinkButton>
              ) : null}
            </PaginationDiv>
          </React.Fragment>
        )}
        <Collapse in={commentOpen} unmountOnExit onEntered={handleEntered}>
          <form
            aria-labelledby="feedback-message"
            onReset={handleCancelComment}
            onSubmit={handleSubmitComment}
          >
            <Typography component="div" variant="h6" gutterBottom>
              {t('feedbackTitle')}
            </Typography>
            <div>
              <Typography id="feedback-description" color="text.secondary" gutterBottom>
                {rating === 1 ? t('feedbackMessageUp') : t('feedbackMessageDown')}
              </Typography>
              <TextField
                multiline
                margin="dense"
                name="comment"
                fullWidth
                rows={6}
                value={comment}
                onChange={handleChangeTextfield}
                inputProps={{
                  'aria-label': t('feedbackCommentLabel'),
                  'aria-describedby': 'feedback-description',
                  ref: inputRef,
                }}
              />
            </div>
            <DialogActions>
              <Button type="reset">{t('cancel')}</Button>
              <Button type="submit">{t('submit')}</Button>
            </DialogActions>
          </form>
        </Collapse>
      </Footer>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}
