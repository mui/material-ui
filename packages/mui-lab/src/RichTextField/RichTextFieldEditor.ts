export enum RichTextFieldEditorTextStyle {
  bold,
  bulletList,
  italic,
  orderedList,
  underline,
}

export enum RichTextFieldEditorEvent {
  change,
}

export default interface RichTextFieldEditor {
  get hasContent(): boolean;
  clearStyles: () => void;
  focus: () => void;
  getValue: () => string;
  off: (event: RichTextFieldEditorEvent, callback: () => void) => void;
  on: (event: RichTextFieldEditorEvent, callback: () => void) => void;
  render: () => React.ReactNode;
  toggleStyle: (style: RichTextFieldEditorTextStyle) => void;
}
