import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface SectionHeadlineTheme {
  overlineColor?: string;
  titleColor?: string;
  descriptionColor?: string;
}

export default function SectionHeadline({
  overline,
  title,
  description,
  localTheme,
}: {
  overline: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  localTheme?: (mode?: string) => SectionHeadlineTheme;
}) {
  const globalTheme = useTheme();
  const mode = globalTheme.palette.mode;
  const defaultOverlineColor = mode === 'dark' ? 'primary.300' : 'primary.600';
  const defaultTitleColor = mode === 'dark' ? 'grey.100' : 'primaryDark.900';
  const defaultDescriptionColor = mode === 'dark' ? 'grey.500' : 'grey.800';

  const overlineColor: string = localTheme?.(mode)?.overlineColor ?? defaultOverlineColor;
  const titleColor: string = localTheme?.(mode)?.titleColor ?? defaultTitleColor;
  const descriptionColor: string = localTheme?.(mode)?.descriptionColor ?? defaultDescriptionColor;

  return (
    <React.Fragment>
      <Typography
        color={overlineColor}
        component="h2"
        fontWeight="bold"
        variant="body2"
        sx={{ mb: 1 }}
      >
        {overline}
      </Typography>
      {typeof title === 'string' ? (
        <Typography variant="h2" color={titleColor}>
          {title}
        </Typography>
      ) : (
        title
      )}
      {description && (
        <Typography color={descriptionColor} sx={{ mt: 1, mb: 2, maxWidth: 450 }}>
          {description}
        </Typography>
      )}
    </React.Fragment>
  );
}
