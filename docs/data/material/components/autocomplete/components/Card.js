import * as React from 'react';
import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

function Card(props) {
  const { children, ...other } = props;
  return (
    <Stack
      direction="row"
      gap={2}
      sx={{
        alignItems: 'center',
        width: '100%',
        height: '100%',
        ...(other.sx || {}),
      }}
      {...other}
    >
      {children}
    </Stack>
  );
}

Card.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export { Card };

function CardMedia(props) {
  const { children, ...other } = props;
  return (
    <Stack
      sx={{ flexShrink: 0, alignItems: 'center', ...(other.sx || {}) }}
      {...other}
    >
      {children}
    </Stack>
  );
}

CardMedia.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export { CardMedia };

function CardContent(props) {
  const { children, ...other } = props;
  return (
    <Stack gap={0.25} sx={{ flexGrow: 1, ...(other.sx || {}) }} {...other}>
      {children}
    </Stack>
  );
}

CardContent.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export { CardContent };

function CardTitle(props) {
  const { children, ...other } = props;
  return (
    <Typography variant="body2" {...other}>
      {children}
    </Typography>
  );
}

CardTitle.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
};

export { CardTitle };

function CardDetailList(props) {
  const { children, ...other } = props;
  return (
    <Stack direction="row" flexWrap="wrap" gap={1} {...other}>
      {children}
    </Stack>
  );
}

CardDetailList.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
};

export { CardDetailList };

function CardDetail(props) {
  const { children, ...other } = props;
  return (
    <Typography variant="caption" color="text.secondary" {...other}>
      {children}
    </Typography>
  );
}

CardDetail.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
};

export { CardDetail };
