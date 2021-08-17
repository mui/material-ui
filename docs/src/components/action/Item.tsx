import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

export function Group({ desktopColumns = 1, ...props }: { desktopColumns?: number } & BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        maxWidth: { md: 500 },
        overflow: 'auto',
        display: 'grid',
        gap: 1,
        gridTemplateColumns: `repeat(${desktopColumns}, 1fr)`,
        '& > *': {
          minWidth: {
            xs: desktopColumns === 1 ? 300 : 225,
            sm: desktopColumns === 1 ? 400 : 225,
            md: 'auto',
          },
          gridRow: { xs: 1, md: 'auto' },
        },
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        ...props.sx,
      }}
    />
  );
}

export default function Item({
  icon,
  title,
  description,
  ...props
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
} & BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'center',
        ...props.sx,
      }}
    >
      <Box sx={{ mr: 2, lineHeight: 0 }}>{icon}</Box>
      <div>
        <Typography color="text.primary" variant="body2" fontWeight="bold">
          {title}
        </Typography>
        {description && (
          <Typography color="text.secondary" variant="body2" fontWeight="regular" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        )}
      </div>
    </Box>
  );
}
