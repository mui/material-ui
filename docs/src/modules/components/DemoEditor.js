import * as React from 'react';
import PropTypes from 'prop-types';
import Editor from 'react-simple-code-editor';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { visuallyHidden } from '@material-ui/utils';
import prism from 'docs/src/modules/utils/prism';
import { useTranslate } from 'docs/src/modules/utils/i18n';

const useStyles = makeStyles(
  {
    editorContainer: {
      maxHeight: 'min(68vh, 1000px)',
      maxWidth: 'calc(100vw - 32px)',
      overflow: 'auto',
      padding: 16,
      borderRadius: 4,
      backgroundColor: '#272c34',
      color: 'white',
      caretColor: 'white',
      '&:focus': {
        outline: 'none',
      },
    },
    editor: {
      fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
      fontSize: 14,
    },
  },
  { name: 'DemoEditor' },
);

export default function DemoEditor(props) {
  const { onFocus, onValueChange, value } = props;
  const classes = useStyles();
  const t = useTranslate();

  const mouseDown = React.useRef(false);
  const handleEditorMouseDown = () => {
    mouseDown.current = true;
    setTimeout(() => {
      mouseDown.current = false;
    });
  };

  const [ignoreTabKey, setIgnoreTabKey] = React.useState(true);
  const handleEditorKeyDown = (event) => {
    const { key } = event;

    if (ignoreTabKey && key !== 'Tab' && key !== 'Shift') {
      if (key === 'Enter') event.preventDefault();
      setIgnoreTabKey(false);
    }
    if (!ignoreTabKey && key === 'Escape') {
      setIgnoreTabKey(true);
    }
  };

  const [keyboardFocused, setKeyboardFocused] = React.useState(true);
  const handleEditorFocus = (event) => {
    if (event.target !== event.currentTarget) return;
    onFocus();
    setKeyboardFocused(!mouseDown.current);
    setIgnoreTabKey(!mouseDown.current);
  };

  const handleEditorBlur = (event) => {
    if (event.target !== event.currentTarget) return;
    setKeyboardFocused(false);
    setIgnoreTabKey(true);
  };

  // const openDemoSource = codeOpen || showPreview;

  return (
    <div className={classes.editorContainer}>
      <Editor
        value={value}
        onValueChange={onValueChange}
        onFocus={handleEditorFocus}
        onBlur={handleEditorBlur}
        ignoreTabKey={ignoreTabKey}
        onKeyDown={handleEditorKeyDown}
        onMouseDown={handleEditorMouseDown}
        highlight={(code) => prism(code, 'jsx')}
        className={classes.editor}
      />
      {(keyboardFocused || !ignoreTabKey) && (
        <Typography sx={visuallyHidden} aria-live="polite">
          {ignoreTabKey ? t('demo.pressEnter') : t('demo.pressEscape')}
        </Typography>
      )}
    </div>
  );
}

DemoEditor.propTypes = {
  onFocus: PropTypes.func.isRequired,
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
