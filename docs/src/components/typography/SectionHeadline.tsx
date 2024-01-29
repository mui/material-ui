import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SectionHeadlineProps {
  alwaysCenter?: boolean;
  description?: React.ReactNode;
  id?: string;
  /**
   * For using with dark background.
   */
  inverted?: boolean;
  overline?: React.ReactNode;
  title: string | React.ReactElement;
}

export default function SectionHeadline(props: SectionHeadlineProps) {
  const { alwaysCenter = false, description, id, inverted = false, overline, title } = props;
  return (
    <Box sx={{ maxWidth: 500, m: alwaysCenter ? 'auto' : 'none', mb: 3 }}>
      {overline && (
        <Typography
          id={id}
          component="h2"
          variant="body2"
          fontWeight="bold"
          color="primary.main"
          sx={{
            mb: 1,
            ...(alwaysCenter && {
              textAlign: 'center',
            }),
          }}
        >
          {overline}
        </Typography>
      )}
      {typeof title === 'string' ? (
        <Typography
          variant="h2"
          sx={(theme) => ({
            ...(inverted
              ? {
                  color: '#fff',
                }
              : {
                  color: 'primaryDark.900',
                  ...theme.applyDarkStyles({
                    color: 'grey.100',
                  }),
                }),
            ...(alwaysCenter && {
              textAlign: 'center',
            }),
          })}
        >
          {title}
        </Typography>
      ) : (
        React.cloneElement(title, {
          style: {
            ...(alwaysCenter && {
              textAlign: 'center',
            }),
            ...(inverted && {
              color: '#fff',
            }),
          },
        })
      )}
      {description && (
        <Typography
          sx={(theme) => ({
            mt: 1,
            maxWidth: 500,
            ...(inverted
              ? {
                  color: 'grey.400',
                }
              : {
                  color: 'grey.800',
                  ...theme.applyDarkStyles({
                    color: 'grey.500',
                  }),
                }),
            ...(alwaysCenter && {
              textAlign: 'center',
              mx: 'auto',
            }),
          })}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
}
