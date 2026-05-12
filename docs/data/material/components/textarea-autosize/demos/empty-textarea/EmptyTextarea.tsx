import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function EmptyTextarea() {
  // @focus-start @padding 1
  return (
    <TextareaAutosize
      aria-label="empty textarea"
      placeholder="Empty"
      style={{ width: 200 }}
    />
  );
  // @focus-end
}
