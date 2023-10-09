import * as React from 'react';
import Typography from '@mui/material/Typography';
import FileOpenRoundedIcon from '@mui/icons-material/FileOpenRounded';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import Link from 'docs/src/modules/components/Link';

interface MoreInfoProps {
  subject: string;
  link: string;
}

export default function MoreInfo({ subject, link }: MoreInfoProps) {
  return (
    <Typography color="text.secondary" variant="body2">
      <FileOpenRoundedIcon
        sx={{
          verticalAlign: 'middle',
          color: 'primaryDark.400',
          mr: 0.8,
          fontSize: 18,
          mb: 0.6,
        }}
      />
      Head over to the docs to{' '}
      <Link
        href={link}
        sx={{
          '& > svg': { transition: '0.2s' },
          '&:hover > svg': { transform: 'translateX(2px)' },
        }}
      >
        learn more about {subject}
        <KeyboardArrowRightRounded fontSize="small" sx={{ verticalAlign: 'middle', mt: 0.2 }} />
      </Link>
    </Typography>
  );
}
