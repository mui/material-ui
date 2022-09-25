import '@tiptap/extension-underline';
import { Editor, EditorContent } from '@tiptap/react';
import '@tiptap/starter-kit';
import * as React from 'react';
import RichTextFieldEditor, {
  RichTextFieldEditorEvent,
  RichTextFieldEditorTextStyle,
} from '../RichTextFieldEditor';

export default class RichTextFieldTiptapEditor implements RichTextFieldEditor {
  private editor: Editor | null;

  get hasContent(): boolean {
    return this.editor !== null && !this.editor.isEmpty;
  }

  constructor(editor: Editor | null) {
    this.editor = editor;
  }

  public clearStyles() {
    this.editor?.chain().focus().unsetAllMarks().clearNodes().run();
  }

  public focus() {
    this.editor?.chain().focus();
  }

  public getValue() {
    return this.editor?.getHTML() ?? '';
  }

  public off(event: RichTextFieldEditorEvent, callback: () => void) {
    switch (event) {
      case RichTextFieldEditorEvent.change:
        this.editor?.off('update', callback);
        break;
      default:
        throw new Error(`Unsupported event ${event}`);
    }
  }

  public on(event: RichTextFieldEditorEvent, callback: () => void) {
    switch (event) {
      case RichTextFieldEditorEvent.change:
        this.editor?.on('update', callback);
        break;
      default:
        throw new Error(`Unsupported event ${event}`);
    }
  }

  public render() {
    return <EditorContent editor={this.editor} />;
  }

  public toggleStyle(style: RichTextFieldEditorTextStyle) {
    switch (style) {
      case RichTextFieldEditorTextStyle.bold:
        this.editor?.chain().focus().toggleBold().run();
        break;
      case RichTextFieldEditorTextStyle.bulletList:
        this.editor?.chain().focus().toggleBulletList().run();
        break;
      case RichTextFieldEditorTextStyle.italic:
        this.editor?.chain().focus().toggleItalic().run();
        break;
      case RichTextFieldEditorTextStyle.orderedList:
        this.editor?.chain().focus().toggleOrderedList().run();
        break;
      case RichTextFieldEditorTextStyle.underline:
        this.editor?.chain().focus().toggleUnderline().run();
        break;
      default:
        throw new Error(`Unsupported style ${style}`);
    }
  }
}
