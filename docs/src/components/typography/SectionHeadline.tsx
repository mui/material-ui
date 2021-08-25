import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export default function SectionHeadline({
  overline,
  title,
  description,
}: {
  overline: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
}) {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const overlineColor = mode === 'dark' ? 'primary.400' : 'primary.600';
  const titleColor = mode === 'dark' ? 'grey.300' : 'primaryDark.900';
  const descriptionColor = mode === 'dark' ? 'grey.500' : 'grey.800';
  return (
    <React.Fragment>
      <Typography color={overlineColor} fontWeight="bold" variant="body2" sx={{ mb: 1 }}>
        {overline}
      </Typography>
      {typeof title === 'string' ? (
        <Typography variant="h2" color={titleColor}>
          {title}
        </Typography>
      ) : (
        title
      )}
      <Typography color={descriptionColor} sx={{ mt: 1, mb: 2, maxWidth: 450 }}>
        {description}
      </Typography>
    </React.Fragment>
  );
}
