import Textarea from '@mui/joy/Textarea';

export default function FocusedRingTextarea() {
  return (
    <Textarea
      placeholder="Bootstrap"
      minRows={2}
      sx={{
        '--Textarea-focusedInset': 'var(--any, )',
        '--Textarea-focusedThickness': '0.25rem',
        '--Textarea-focusedHighlight': 'rgba(13,110,253,.25)',
        '&::before': {
          transition: 'box-shadow .15s ease-in-out',
        },
        '&:focus-within': {
          borderColor: '#86b7fe',
        },
      }}
    />
  );
}
