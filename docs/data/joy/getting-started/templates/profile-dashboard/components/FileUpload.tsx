import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card, { CardProps } from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';

export default function FileUpload({
  icon,
  fileName,
  fileSize,
  progress,
  sx,
  ...props
}: CardProps & {
  icon?: React.ReactElement;
  fileName: string;
  fileSize: string;
  progress: number;
}) {
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      {...props}
      sx={[
        {
          gap: 1.5,
          alignItems: 'flex-start',
          ...(progress >= 100 && {
            borderColor: 'primary.500',
          }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <AspectRatio
        ratio="1"
        variant="soft"
        color="primary"
        sx={{
          minWidth: 32,
          borderRadius: '50%',
          '--Icon-fontSize': '16px',
        }}
      >
        <div>{icon ?? <i data-feather="file" />}</div>
      </AspectRatio>
      <CardContent>
        <Typography fontSize="sm">{fileName}</Typography>
        <Typography level="body3">{fileSize}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LinearProgress
            value={progress}
            determinate
            variant="plain"
            sx={{ bgcolor: 'neutral.softBg' }}
          />
          <Typography fontSize="xs">{progress}%</Typography>
        </Box>
      </CardContent>
      {progress >= 100 ? (
        <AspectRatio
          ratio="1"
          variant="solid"
          color="primary"
          sx={{
            minWidth: 20,
            borderRadius: '50%',
            '--Icon-fontSize': '14px',
          }}
        >
          <div>
            <i data-feather="check" />
          </div>
        </AspectRatio>
      ) : (
        <IconButton
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ mt: -1, mr: -1 }}
        >
          <i data-feather="trash-2" />
        </IconButton>
      )}
    </Card>
  );
}
