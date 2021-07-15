import * as React from 'react';
import PropTypes from 'prop-types';
import prism from '@material-ui/markdown/prism';
import MarkdownElement from './MarkdownElement';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import IconButton from '@material-ui/core/IconButton';
import copy from 'clipboard-copy';
import Snackbar from '@material-ui/core/Snackbar';
import {useTranslate} from "../utils/i18n";

const HighlightedCode = React.forwardRef(function HighlightedCode(props, ref) {
  const {code, language, encodedCode, isCopyButtonEnabled, ...other} = props;
  const renderedCode = React.useMemo(() => {
    if (encodedCode) {
      return prism(decodeURI(encodedCode).trim(), language);
    }
    return prism(code.trim(), language);
  }, [code, language, encodedCode]);

  const t = useTranslate();
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState(undefined);
  const [isHoveringCode, setIsHoveringCode] = React.useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  const handleCopyClick = async () => {
    try {
      let targetCode = code;
      if (encodedCode) {
        targetCode = decodeURI(encodedCode);
      }
      await copy(targetCode);
      setSnackbarMessage(t('copiedSource'));
      setSnackbarOpen(true);
    } finally {

    }
  };

  const handleMouseOverCode = () => {
    setIsHoveringCode(true);
  };

  const handleMouseOutCode = () => {
    setIsHoveringCode(false);
  };

  return (
    <div onMouseEnter={handleMouseOverCode} onMouseLeave={handleMouseOutCode}>
      <MarkdownElement ref={ref} {...other}>
        {isHoveringCode && isCopyButtonEnabled && <IconButton
          size="large"
          style={{position: 'absolute', right: '2em', color: 'white'}}
          data-ga-event-category="demo"
          data-ga-event-action="copy"
          onClick={handleCopyClick}
        >
          <FileCopyIcon fontSize="small"/>
        </IconButton>}
        <pre>
        <code
          className={`language-${language}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{__html: renderedCode}}
        />

      </pre>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </MarkdownElement>
    </div>
  );
});

HighlightedCode.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  isCopyButtonEnabled: PropTypes.bool,
  encodedCode: PropTypes.string
};

export default HighlightedCode;

