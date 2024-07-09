/* eslint-disable no-restricted-globals */
/* eslint-disable material-ui/no-hardcoded-labels */
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
// Components
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Collapse from '@mui/material/Collapse';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
// Icons
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PanToolRoundedIcon from '@mui/icons-material/PanToolRounded';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import XIcon from '@mui/icons-material/X';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import DiscordIcon from 'docs/src/icons/DiscordIcon';
// Other imports
import { Link } from '@mui/docs/Link';
import PageContext from 'docs/src/modules/components/PageContext';
import SvgMuiLogotype from 'docs/src/icons/SvgMuiLogotype';
import EditPage from 'docs/src/modules/components/EditPage';
import { useUserLanguage, useTranslate } from '@mui/docs/i18n';
import { getCookie, pageToTitleI18n } from 'docs/src/modules/utils/helpers';

const FooterLink = styled(Link)(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    fontFamily: (theme.vars || theme).typography.fontFamily,
    fontSize: (theme.vars || theme).typography.pxToRem(13),
    fontWeight: (theme.vars || theme).typography.fontWeightMedium,
    color: (theme.vars || theme).palette.primary[600],
    '& > svg': { fontSize: '13px', transition: '0.2s' },
    '&:hover > svg': { transform: 'translateX(2px)' },
    ...theme.applyDarkStyles({
      color: (theme.vars || theme).palette.primary[300],
    }),
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
  const env = window.location.host.includes('mui.com') ? 'prod' : 'dev';
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
  const { rating, comment, commentedSection, productId } = data;

  const sentData = {
    callback_id: 'send_feedback',
    rating,
    comment,
    currentLocationURL: window.location.href,
    commmentSectionURL: `${window.location.origin}${window.location.pathname}#${commentedSection.hash}`,
    commmentSectionTitle: commentedSection.text,
    githubRepo: process.env.SOURCE_CODE_REPO,
    productId,
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

async function submitFeedback(page, rating, comment, language, commentedSection, productId) {
  const data = {
    id: getCookie('feedbackId'),
    page,
    rating,
    comment,
    version: process.env.LIB_VERSION,
    language,
  };

  const resultSlack = await postFeedbackOnSlack({ ...data, productId, commentedSection });
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
    try {
      userFeedback = getCookie('feedback');
      userFeedback = userFeedback && JSON.parse(userFeedback);
    } catch {
      // For unknown reason the `userFeedback` can be uncomplet, leading the JSON.parse to crash the entire docs
      return undefined;
    }
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

// The design feedback alert was removed in https://github.com/mui/material-ui/pull/39691
// This dead code is here to simplify the creation of special feedback channel
const SPEACIAL_FEEDBACK_HASH = [{ hash: 'new-docs-api-feedback', text: 'New API content design' }];

const iconColor = 'grey.500';

export default function AppLayoutDocsFooter(props) {
  const { tableOfContents = [], location } = props;

  const theme = useTheme();
  const t = useTranslate();
  const userLanguage = useUserLanguage();
  const { activePage, productId } = React.useContext(PageContext);
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
      productId,
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
        const section =
          [...sectionOptions, ...SPEACIAL_FEEDBACK_HASH].find(
            (item) => item.hash === feedbackHash,
          ) || EMPTY_SECTION;
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
      <Stack component="footer" direction="column" sx={{ my: 4 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 1 }}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <EditPage sourceLocation={location} />
          <Stack direction="row" spacing={0.5} useFlexGap sx={{ alignItems: 'center' }}>
            <Typography id="feedback-message" variant="body2" sx={{ color: 'text.secondary' }}>
              {t('feedbackMessage')}
            </Typography>
            <Tooltip title={t('feedbackYes')}>
              <IconButton onClick={handleClickThumb(1)} aria-pressed={rating === 1}>
                <ThumbUpAltRoundedIcon
                  sx={{ fontSize: 15, color: rating === 1 ? 'primary' : 'text.secondary' }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('feedbackNo')}>
              <IconButton onClick={handleClickThumb(0)} aria-pressed={rating === 0}>
                <ThumbDownAltRoundedIcon
                  sx={{ fontSize: 15, color: rating === 0 ? 'error' : 'text.secondary' }}
                />
              </IconButton>
            </Tooltip>
          </Stack>
        </Stack>
        {/* Wrapper div to fix Collapse close animation */}
        <div>
          <Collapse
            in={commentOpen}
            unmountOnExit
            onEntered={handleEntered}
            timeout={{ enter: 0, exit: theme.transitions.duration.standard }}
          >
            <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <form
              aria-labelledby="feedback-message"
              onReset={handleCancelComment}
              onSubmit={handleSubmitComment}
              onKeyDown={handleKeyDownForm}
            >
              <div>
                {commentedSection.text ? (
                  <Typography
                    variant="body2"
                    id="feedback-description"
                    dangerouslySetInnerHTML={{
                      __html: t('feedbackSectionSpecific').replace(
                        '{{sectionName}}',
                        `"${commentedSection.text}"`,
                      ),
                    }}
                    sx={{ color: 'text.secondary' }}
                  />
                ) : (
                  <Typography id="feedback-description" sx={{ color: 'text.secondary' }}>
                    {rating === 1 ? t('feedbackMessageUp') : t('feedbackMessageDown')}
                  </Typography>
                )}
                <TextField
                  multiline
                  margin="dense"
                  name="comment"
                  fullWidth
                  rows={2}
                  value={comment}
                  onChange={handleChangeTextfield}
                  inputProps={{
                    'aria-label': t('feedbackCommentLabel'),
                    'aria-describedby': 'feedback-description',
                    ref: inputRef,
                  }}
                />
                {rating !== 1 && typeof window !== 'undefined' && (
                  <Alert
                    severity="warning"
                    color="warning"
                    icon={<PanToolRoundedIcon fontSize="small" />}
                    sx={{ my: 1.5 }}
                  >
                    <Typography id="feedback-description">
                      {t('feedbackMessageToGitHub.usecases')}{' '}
                      <Link
                        href={`${process.env.SOURCE_CODE_REPO}/issues/new?template=${process.env.GITHUB_TEMPLATE_DOCS_FEEDBACK}&page-url=${window.location.href}`}
                        target="_blank"
                        underline="always"
                        sx={{ fontWeight: 'semiBold' }}
                      >
                        {t('feedbackMessageToGitHub.callToAction.link')}
                      </Link>{' '}
                      {t('feedbackMessageToGitHub.reasonWhy')}
                    </Typography>
                  </Alert>
                )}
                <DialogActions>
                  <Button type="reset" size="small">
                    {t('cancel')}
                  </Button>
                  <Button type="submit" variant="contained" size="small">
                    {t('submit')}
                  </Button>
                </DialogActions>
              </div>
            </form>
          </Collapse>
        </div>
        <Divider sx={{ my: 2 }} />
        {hidePagePagination ? null : (
          <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
            {prevPage !== null ? (
              <Button
                size="small"
                variant="text"
                component={Link}
                noLinkStyle
                prefetch={false}
                href={prevPage.pathname}
                {...prevPage.linkProps}
                startIcon={<ChevronLeftIcon />}
              >
                {pageToTitleI18n(prevPage, t)}
              </Button>
            ) : (
              <div />
            )}
            {nextPage !== null ? (
              <Button
                size="small"
                component={Link}
                noLinkStyle
                prefetch={false}
                href={nextPage.pathname}
                {...nextPage.linkProps}
                endIcon={<ChevronRightIcon />}
              >
                {pageToTitleI18n(nextPage, t)}
              </Button>
            ) : null}
          </Stack>
        )}
        <Divider sx={{ my: 2 }} />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 3, sm: 1 }}
          sx={{ alignItems: 'center' }}
        >
          <Stack direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center', flexGrow: 1 }}>
            <Link href="https://mui.com/" aria-label="Go to homepage">
              <SvgMuiLogotype height={28} width={64} />
            </Link>
            <Typography sx={{ color: 'grey.500', fontSize: 13, opacity: '70%' }}>&bull;</Typography>
            <FooterLink href="https://mui.com/blog/" target="_blank" rel="noopener">
              Blog <ArrowOutwardRoundedIcon />
            </FooterLink>
            <Typography sx={{ color: 'grey.500', fontSize: 13, opacity: '70%' }}>&bull;</Typography>
            <FooterLink href="https://mui.com/store/" target="_blank" rel="noopener">
              Store <ArrowOutwardRoundedIcon />
            </FooterLink>
          </Stack>
          <Stack spacing={1} direction="row" useFlexGap>
            <IconButton
              target="_blank"
              rel="noopener"
              href="https://x.com/MUI_hq"
              aria-label="X/twitter"
              title="X"
              size="small"
            >
              <XIcon fontSize="small" sx={{ color: iconColor }} />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener"
              href="https://mui.com/r/discord/"
              aria-label="Discord"
              title="Discord"
              size="small"
            >
              <DiscordIcon fontSize="small" sx={{ color: iconColor }} />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener"
              href="https://www.youtube.com/@MUI_hq"
              aria-label="YouTube"
              title="YouTube"
              size="small"
            >
              <YouTubeIcon fontSize="small" sx={{ color: iconColor }} />
            </IconButton>
            <IconButton
              target="_blank"
              rel="noopener"
              href="https://mui.com/feed/blog/rss.xml"
              aria-label="RSS Feed"
              title="RSS Feed"
              size="small"
            >
              <RssFeedIcon fontSize="small" sx={{ color: iconColor }} />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
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
  location: PropTypes.string.isRequired,
  tableOfContents: PropTypes.array,
};
