import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useGridApiContext } from '@mui/x-data-grid';

const RatingValue = React.memo(function RatingValue(props) {
  const { value } = props;
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        lineHeight: '24px',
        color: 'text.secondary',
      }}
    >
      <Rating value={value} sx={{ mr: 1 }} readOnly />{' '}
      {Math.round(Number(value) * 10) / 10}
    </Box>
  );
});

function EditRating(props) {
  const { id, value, field } = props;

  const apiRef = useGridApiContext();

  const changedThroughKeyboard = React.useRef(false);

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue(
      { id, field, value: Number(event.target.value) },
      event,
    );
    if (!changedThroughKeyboard.current) {
      apiRef.current.stopCellEditMode({ id, field });
    }
    changedThroughKeyboard.current = false;
  };

  const handleRef = (element) => {
    if (element) {
      if (value !== 0) {
        element.querySelector(`input[value="${value}"]`).focus();
      } else {
        element.querySelector('input[value=""]').focus();
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key.startsWith('Arrow')) {
      changedThroughKeyboard.current = true;
    } else {
      changedThroughKeyboard.current = false;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        lineHeight: '24px',
        color: 'text.secondary',
        mr: 1,
      }}
    >
      <Rating
        ref={handleRef}
        name="rating"
        value={Number(value)}
        precision={1}
        onChange={handleChange}
        sx={{ mr: 1 }}
        onKeyDown={handleKeyDown}
      />
      {Number(value)}
    </Box>
  );
}

export function renderRating(params) {
  if (params.value == null) {
    return '';
  }

  return <RatingValue value={params.value} />;
}

export function renderEditRating(params) {
  return <EditRating {...params} />;
}

export default renderRating;
