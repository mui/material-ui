import RichTextField, {
  RichTextFieldStandardToolBar,
  RichTextFieldTiptapEditor,
} from '@mui/lab/RichTextField';
import Stack from '@mui/material/Stack';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import * as React from 'react';

export default function TiptapRichTextField() {
  const [value, setValue] = React.useState('');
  const [editor, setEditor] = React.useState(new RichTextFieldTiptapEditor(null));

  const tiptapEditor = useEditor({
    extensions: [
      StarterKit.configure({
        blockquote: false,
        code: false,
        codeBlock: false,
        dropcursor: false,
        gapcursor: false,
        heading: false,
        horizontalRule: false,
        strike: false,
      }),
      Underline,
    ],
  });

  React.useEffect(() => {
    setEditor(new RichTextFieldTiptapEditor(tiptapEditor));
  }, [tiptapEditor]);

  return (
    <Stack alignItems="center" direction="column" spacing={2}>
      <RichTextField
        label="Type here"
        editor={editor}
        onChange={setValue}
        variant="filled"
        value={value}
      >
        <RichTextFieldStandardToolBar />
      </RichTextField>
      <div>{value}</div>
    </Stack>
  );
}
