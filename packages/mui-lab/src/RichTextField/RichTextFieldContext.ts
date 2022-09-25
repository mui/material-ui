import { createContext } from 'react';
import RichTextFieldEditor from './RichTextFieldEditor';

const RichTextFieldContext = createContext({
  editor: null as RichTextFieldEditor | null,
});

export default RichTextFieldContext;
