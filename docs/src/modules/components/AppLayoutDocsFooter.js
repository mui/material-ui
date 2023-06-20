/* eslint-disable no-restricted-globals */
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
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

const PageLinkButton = styled(Button)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
}));

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
  const { rating, comment, commentedSection } = data;

  const sentData = {
    callback_id: 'send_feedback',
    rating,
    comment,
    currentLocationURL: window.location.href,
    commmentSectionURL: `${window.location.origin}${window.location.pathname}#${commentedSection.hash}`,
    commmentSectionTitle: commentedSection.text,
  };
  if (!comment || comment.length < 10) {
    return 'ignored';
  }

  try {
    const res = await fetch(`${window.location.origin}/.netlify/functions/feedback-management/`, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      // Seems tricky but it's to match how slack send data
      body: `payload=${encodeURIComponent(JSON.stringify(sentData))}`,
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return 'sent';
  } catch (error) {
    console.error(error);
    return null;
  }

  /**
   Not used because I ignore how to encode that with:
      'content-type': 'application/x-www-form-urlencoded'
   
   const complexSlackMessage = {
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
  */
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

async function submitFeedback(page, rating, comment, language, commentedSection) {
  const data = {
    id: getCookie('feedbackId'),
    page,
    rating,
    comment,
    version: process.env.LIB_VERSION,
    language,
  };

  const resultSlack = await postFeedbackOnSlack({ ...data, commentedSection });
  if (rating !== undefined) {
    const resultVote = await postFeedback(data);
    if (resultVote) {
      document.cookie = `feedbackId=${resultVote.id};path=/;max-age=31536000`;
      setTimeout(async () => {
        const userFeedback = await getUserFeedback(resultVote.id);
        if (userFeedback) {
          document.cookie = `feedback=${JSON.stringify(userFeedback)};path=/;max-age=31536000`;
        }
      });
    }
    return resultSlack && resultVote;
  }

  return resultSlack;
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

const EMPTY_SECTION = { hash: '', text: '' };

export default function AppLayoutDocsFooter(props) {
  const { tableOfContents = [] } = props;

  const theme = useTheme();
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const { activePage } = React.useContext(PageContext);
  const [rating, setRating] = React.useState();
  const [comment, setComment] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(false);
  const inputRef = React.useRef();
  const [commentOpen, setCommentOpen] = React.useState(false);
  const [commentedSection, setCommentedSection] = React.useState(EMPTY_SECTION);

  const { nextPage, prevPage } = usePageNeighbours();

  const sectionOptions = React.useMemo(
    () =>
      tableOfContents.flatMap((section) => [
        {
          hash: section.hash,
          text: section.text,
        },
        ...section.children.map(({ hash, text }) => ({ hash, text })),
      ]),
    [tableOfContents],
  );

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

    const result = await submitFeedback(
      activePage.pathname,
      rating,
      comment,
      userLanguage,
      commentedSection,
    );
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

    // Manually move focus if comment is already open.
    // If the comment is closed, onEntered will call focus itself;
    if (inputRef.current) {
      inputRef.current.focus();
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

  // See https://github.com/mui/mui-toolpad/issues/1164 for context.
  const handleKeyDownForm = (event) => {
    const modifierKey = (event.metaKey || event.ctrlKey) && !event.shiftKey;

    if (event.key === 'Enter' && modifierKey) {
      const submitButton = event.currentTarget.querySelector('[type="submit"]');
      submitButton.click();
    }
  };

  const handleCancelComment = () => {
    setCommentOpen(false);
    setCurrentRatingFromCookie();
    setCommentedSection(EMPTY_SECTION);
  };

  const handleEntered = () => {
    inputRef.current.focus();
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  React.useEffect(() => {
    const eventListener = (event) => {
      const feedbackHash = event.target.getAttribute('data-feedback-hash');
      if (feedbackHash) {
        const section = sectionOptions.find((item) => item.hash === feedbackHash) || EMPTY_SECTION;
        setCommentOpen(true);
        setCommentedSection(section);

        // Manually move focus if comment is already open.
        // If the comment is closed, onEntered will call focus itself;
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };
    document.addEventListener('click', eventListener);
    return () => {
      document.removeEventListener('click', eventListener);
    };
  }, [sectionOptions]);

  const hidePagePagination = activePage === null || activePage.ordered === false;

  return (
    <React.Fragment>
      <Box component="footer" sx={{ mt: 12 }}>
        {hidePagePagination ? null : (
          <React.Fragment>
            <Divider />
            <PaginationDiv>
              {prevPage !== null ? (
                <PageLinkButton
                  component={Link}
                  noLinkStyle
                  prefetch={false}
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
                <Typography
                  align="center"
                  component="div"
                  id="feedback-message"
                  variant="body2"
                  sx={{ mx: 2 }}
                >
                  {t('feedbackMessage')}
                </Typography>
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
                  prefetch={false}
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
        <Collapse
          in={commentOpen}
          unmountOnExit
          onEntered={handleEntered}
          timeout={{ enter: 0, exit: theme.transitions.duration.standard }}
        >
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <form
            aria-labelledby="feedback-message"
            onReset={handleCancelComment}
            onSubmit={handleSubmitComment}
            onKeyDown={handleKeyDownForm}
          >
            <Box sx={{ mb: 4 }}>
              {commentedSection.text ? (
                <Typography
                  id="feedback-description"
                  color="text.secondary"
                  dangerouslySetInnerHTML={{
                    __html: t('feedbackSectionSpecific').replace(
                      '{{sectionName}}',
                      `"${commentedSection.text}"`,
                    ),
                  }}
                />
              ) : (
                <Typography id="feedback-description" color="text.secondary">
                  {rating === 1 ? t('feedbackMessageUp') : t('feedbackMessageDown')}
                </Typography>
              )}
              <TextField
                multiline
                margin="dense"
                name="comment"
                fullWidth
                rows={4}
                value={comment}
                onChange={handleChangeTextfield}
                inputProps={{
                  'aria-label': t('feedbackCommentLabel'),
                  'aria-describedby': 'feedback-description',
                  ref: inputRef,
                }}
              />
              <DialogActions>
                <Button type="reset">{t('cancel')}</Button>
                <Button type="submit" variant="contained">
                  {t('submit')}
                </Button>
              </DialogActions>
              {rating !== 1 && (
                <Typography id="feedback-description" color="text.secondary">
                  {t('feedbackMessageToGitHub.usecases')}
                  <br />
                  {t('feedbackMessageToGitHub.callToAction.text')}
                  <Link
                    href={`${process.env.SOURCE_CODE_REPO}/issues/new?template=${process.env.GITHUB_TEMPLATE_DOCS_FEEDBACK}&page-url=${window.location.href}`}
                    target="_blank"
                  >
                    {t('feedbackMessageToGitHub.callToAction.link')}
                  </Link>
                </Typography>
              )}
            </Box>
          </form>
        </Collapse>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </React.Fragment>
  );
}

AppLayoutDocsFooter.propTypes = {
  tableOfContents: PropTypes.array,
};
