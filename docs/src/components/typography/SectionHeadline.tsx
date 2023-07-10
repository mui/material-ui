import * as React from 'react';
import Typography from '@mui/material/Typography';

interface SectionHeadlineProps {
  description?: React.ReactNode;
  id?: string;
  overline: React.ReactNode;
  title: React.ReactNode;
}

export default function SectionHeadline(props: SectionHeadlineProps) {
  const { description, id, overline, title } = props;
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
        })}
      >
        {overline}
      </Typography>
      {typeof title === 'string' ? (
        <Typography
          variant="h2"
          sx={(theme) => ({
            color: 'primaryDark.900',
            ...theme.applyDarkStyles({
              color: 'grey.100',
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
            color: 'grey.800',
            ...theme.applyDarkStyles({
              color: 'grey.500',
            }),
          })}
        >
          {description}
        </Typography>
      )}
    </React.Fragment>
  );
}
