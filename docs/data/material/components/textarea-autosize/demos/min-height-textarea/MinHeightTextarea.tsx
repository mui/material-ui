import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MinHeightTextarea() {
  // @focus-start @padding 1
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={3}
      placeholder="Minimum 3 rows"
      style={{ width: 200 }}
    />
  );
  // @focus-end
}
