import { InputBaseComponentProps } from '@mui/material/InputBase';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';
import * as React from 'react';
import RichTextFieldContext from './RichTextFieldContext';
import RichTextFieldEditor, { RichTextFieldEditorEvent } from './RichTextFieldEditor';

export type RichTextFieldProps = Omit<TextFieldProps, 'onChange'> & {
  editor: RichTextFieldEditor;
  onChange?: (value: string) => void;
};

interface RichTextInputProps extends InputBaseComponentProps {
  editor: RichTextFieldEditor;
  isFocused: boolean;
  toolbar: React.ReactNode;
}

const RichTextInputRoot = styled('div' as const)({
  '& *': {
    outline: 'none',
  },
  '& p': {
    margin: 0,
  },
});

const Toolbar = styled('div' as const)<{ isHidden: boolean }>((info) => ({
  visibility: info.isHidden ? 'hidden' : undefined,
}));

const RichTextInput = React.forwardRef<HTMLDivElement, RichTextInputProps>((props, ref) => {
  const { className, editor, isFocused, style } = props;

  return (
    <RichTextInputRoot className={className} ref={ref} style={style}>
      <Toolbar isHidden={!editor.hasContent && !isFocused}>{props.toolbar}</Toolbar>
      {editor.render()}
    </RichTextInputRoot>
  );
});

function RichTextField(props: RichTextFieldProps) {
  const {
    children,
    editor,
    InputLabelProps,
    inputProps,
    InputProps,
    onChange,
    onClick,
    ...textFieldProps
  } = props;
  const [isFocused, setIsFocused] = React.useState(false);

  const onBlur = debounce(() => {
    setIsFocused(false);
  });

  function onFocus() {
    onBlur.clear();
    setIsFocused(true);
  }

  function onClickTextField(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    props.editor.focus();
    if (onClick) {
      onClick(event);
    }
  }

  React.useEffect(() => {
    function onChangeEditor() {
      if (onChange) {
        onChange(editor.getValue());
      }
    }

    editor.on(RichTextFieldEditorEvent.change, onChangeEditor);

    return () => editor.off(RichTextFieldEditorEvent.change, onChangeEditor);
  }, [editor, onChange]);

  return (
    <RichTextFieldContext.Provider value={{ editor }}>
      <div onBlur={onBlur} onFocus={onFocus}>
        <TextField
          InputLabelProps={{
            ...InputLabelProps,
            shrink: editor.hasContent || isFocused,
          }}
          inputProps={{
            ...inputProps,
            editor,
            isFocused,
            toolbar: children,
          }}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          InputProps={{
            ...InputProps,
            inputComponent: RichTextInput,
          }}
          multiline
          onClick={onClickTextField}
          {...textFieldProps}
        />
      </div>
    </RichTextFieldContext.Provider>
  );
}

RichTextField.propTypes /* remove-proptypes */ = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit TypeScript types and run "yarn proptypes"  |
  // ----------------------------------------------------------------------
  /**
   * @ignore
   */
  children: PropTypes.node,
  /**
   * @ignore
   */
  editor: PropTypes.shape({
    clearStyles: PropTypes.func.isRequired,
    focus: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    hasContent: PropTypes.bool.isRequired,
    off: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    render: PropTypes.func.isRequired,
    toggleStyle: PropTypes.func.isRequired,
  }).isRequired,
  /**
   * Props applied to the [`InputLabel`](/material-ui/api/input-label/) element.
   * Pointer events like `onClick` are enabled if and only if `shrink` is `true`.
   */
  InputLabelProps: PropTypes.object,
  /**
   * [Attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes) applied to the `input` element.
   */
  inputProps: PropTypes.object,
  /**
   * Props applied to the Input element.
   * It will be a [`FilledInput`](/material-ui/api/filled-input/),
   * [`OutlinedInput`](/material-ui/api/outlined-input/) or [`Input`](/material-ui/api/input/)
   * component depending on the `variant` prop value.
   */
  InputProps: PropTypes.object,
  /**
   * @ignore
   */
  onChange: PropTypes.func,
  /**
   * @ignore
   */
  onClick: PropTypes.func,
} as any;

export default RichTextField;
