import * as React from 'react';
import PropTypes from 'prop-types';
import prism from '@material-ui/markdown/prism';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import copy from 'clipboard-copy';
import Snackbar from '@material-ui/core/Snackbar';
import MarkdownElement from './MarkdownElement';
import { useTranslate } from '../utils/i18n';

const useStyles = makeStyles((theme) => ({
  copyButton: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'inline-flex',
    },
    position: 'absolute',
    right: '1em',
    color: 'white',
  },
}));

const HighlightedCode = React.forwardRef(function HighlightedCode(props, ref) {
  const {
    code,
    language,
    component: Component = MarkdownElement,
    isCopyButtonEnabled,
    ...other
  } = props;
  const renderedCode = React.useMemo(() => {
    return prism(code.trim(), language);
  }, [code, language]);

  const classes = useStyles();
  const t = useTranslate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(undefined);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleCopyClick = async () => {
    try {
      await copy(code);
      setSnackbarMessage(t('copiedSource'));
      setSnackbarOpen(true);
    } catch (e) {
      setSnackbarMessage('');
      setSnackbarOpen(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <Component ref={ref} {...other}>
        {isCopyButtonEnabled && (
          <IconButton
            size="large"
            className={classes.copyButton}
            data-ga-event-category="demo"
            data-ga-event-action="copy"
            onClick={handleCopyClick}
          >
            <FileCopyIcon fontSize="small" />
          </IconButton>
        )}
        <pre>
          <code
            className={`language-${language}`}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: renderedCode }}
          />
        </pre>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Component>
    </div>
  );
});

HighlightedCode.propTypes = {
  code: PropTypes.string.isRequired,
  component: PropTypes.elementType,
  isCopyButtonEnabled: PropTypes.bool,
  language: PropTypes.string.isRequired,
};

export default HighlightedCode;
