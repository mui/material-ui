import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/system/Stack';
import * as React from 'react';
import RichTextFieldContext from './RichTextFieldContext';
import { RichTextFieldEditorTextStyle } from './RichTextFieldEditor';

export default function RichTextFieldStandardToolBar() {
  const context = React.useContext(RichTextFieldContext);

  return (
    <Stack direction="row" spacing={2}>
      <ButtonGroup color="inherit" size="small" variant="text">
        <Button
          onClick={(): void => context.editor?.toggleStyle(RichTextFieldEditorTextStyle.bold)}
        >
          <FormatBoldIcon />
        </Button>
        <Button
          onClick={(): void => context.editor?.toggleStyle(RichTextFieldEditorTextStyle.italic)}
        >
          <FormatItalicIcon />
        </Button>
        <Button
          onClick={(): void => context.editor?.toggleStyle(RichTextFieldEditorTextStyle.underline)}
        >
          <FormatUnderlinedIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup color="inherit" size="small" variant="text">
        <Button
          onClick={(): void => context.editor?.toggleStyle(RichTextFieldEditorTextStyle.bulletList)}
        >
          <FormatListBulletedIcon />
        </Button>
        <Button
          onClick={(): void =>
            context.editor?.toggleStyle(RichTextFieldEditorTextStyle.orderedList)
          }
        >
          <FormatListNumberedIcon />
        </Button>
      </ButtonGroup>
      <ButtonGroup color="inherit" size="small" variant="text">
        <Button onClick={(): void => context.editor?.clearStyles()}>
          <FormatClearIcon />
        </Button>
      </ButtonGroup>
    </Stack>
  );
}
