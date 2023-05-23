import * as React from 'react';
import Typography from '@mui/material/Typography';

interface SectionHeadlineProps {
  description?: React.ReactNode;
  id?: string;
  overline: React.ReactNode;
  title: string | React.ReactElement;
  alwaysCenter?: boolean;
  /**
   * For using with dark background.
   */
  inverted?: boolean;
}

export default function SectionHeadline(props: SectionHeadlineProps) {
  const { description, id, overline, title, alwaysCenter = false, inverted = false } = props;
  return (
    <React.Fragment>
      <Typography
        id={id}
        component="h2"
        fontWeight="bold"
        variant="body2"
        sx={(theme) => ({
          mb: 1,
          color: 'primary.600',
          ...theme.applyDarkStyles({
            color: 'primary.300',
          }),
          ...(alwaysCenter && {
            textAlign: 'center',
          }),
        })}
      >
        {overline}
      </Typography>
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
            mb: 2,
            maxWidth: 450,
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
              maxWidth: 600,
            }),
          })}
        >
          {description}
        </Typography>
      )}
    </React.Fragment>
  );
}
