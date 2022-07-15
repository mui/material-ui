import * as React from 'react';
import Typography from '@mui/material/Typography';

export default function SectionHeadline({
  overline,
  title,
  description,
}: {
  overline: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Typography
        component="h2"
        fontWeight="bold"
        variant="body2"
        sx={(theme) => ({
          mb: 1,
          ...(!theme.vars
            ? {
                color: theme.palette.mode === 'dark' ? 'primary.400' : 'primary.600',
              }
            : {
                color: 'primary.600',
                [theme.getColorSchemeSelector('dark')]: {
                  color: 'primary.400',
                },
              }),
        })}
      >
        {overline}
      </Typography>
      {typeof title === 'string' ? (
        <Typography
          variant="h2"
          sx={(theme) => ({
            ...(!theme.vars
              ? {
                  color: theme.palette.mode === 'dark' ? 'grey.100' : 'primaryDark.900',
                }
              : {
                  color: 'primaryDark.900',
                  [theme.getColorSchemeSelector('dark')]: {
                    color: 'grey.100',
                  },
                }),
          })}
        >
          {title}
        </Typography>
      ) : (
        title
      )}
      {description && (
        <Typography
          sx={(theme) => ({
            mt: 1,
            mb: 2,
            maxWidth: 450,
            ...(!theme.vars
              ? {
                  color: theme.palette.mode === 'dark' ? 'grey.500' : 'grey.800',
                }
              : {
                  color: 'grey.800',
                  [theme.getColorSchemeSelector('dark')]: {
                    color: 'grey.500',
                  },
                }),
          })}
        >
          {description}
        </Typography>
      )}
    </React.Fragment>
  );
}
