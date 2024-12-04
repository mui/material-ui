import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card, { CardProps } from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';

import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

export default function FileUpload(
  props: CardProps & {
    icon?: React.ReactElement<any>;
    fileName: string;
    fileSize: string;
    progress: number;
  },
) {
  const { icon, fileName, fileSize, progress, sx, ...other } = props;
  return (
    <Card
      variant="outlined"
      orientation="horizontal"
      {...other}
      sx={[
        {
          gap: 1.5,
          alignItems: 'flex-start',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <AspectRatio
        ratio="1"
        variant="soft"
        color="neutral"
        sx={{ minWidth: 32, borderRadius: '50%', '--Icon-fontSize': '16px' }}
      >
        <div>{icon ?? <InsertDriveFileRoundedIcon />}</div>
      </AspectRatio>
      <CardContent>
        <Typography sx={{ fontSize: 'sm' }}>{fileName}</Typography>
        <Typography level="body-xs">{fileSize}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <LinearProgress
            color="neutral"
            value={progress}
            determinate
            sx={[
              progress >= 100 && {
                color: 'var(--joy-palette-success-solidBg)',
              },
            ]}
          />
          <Typography sx={{ fontSize: 'xs' }}>{progress}%</Typography>
        </Box>
      </CardContent>
      {progress >= 100 ? (
        <AspectRatio
          ratio="1"
          variant="solid"
          color="success"
          sx={{ minWidth: 20, borderRadius: '50%', '--Icon-fontSize': '14px' }}
        >
          <div>
            <CheckRoundedIcon />
          </div>
        </AspectRatio>
      ) : (
        <IconButton variant="plain" color="danger" size="sm" sx={{ mt: -1, mr: -1 }}>
          <RemoveCircleOutlineRoundedIcon />
        </IconButton>
      )}
    </Card>
  );
}
