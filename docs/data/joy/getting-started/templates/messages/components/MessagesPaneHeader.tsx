import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { Badge, Chip, IconButton } from '@mui/joy';
import Avatar from '@mui/joy/Avatar';
import CheckIcon from '@mui/icons-material/Check';

export default function MessagesPaneHeader() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
      px={3}
      py={2.5}
    >
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Badge
          color="success"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={<CheckIcon fontSize="small" />}
        >
          <Avatar size="lg" src="/static/images/avatar/1.jpg" />
        </Badge>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.9 3.18783C14.071 3.60128 14.3991 3.92992 14.8123 4.1015L16.2612 4.70165C16.6747 4.87292 17.0032 5.20143 17.1745 5.61491C17.3457 6.0284 17.3457 6.49299 17.1745 6.90647L16.5747 8.3543C16.4034 8.76797 16.4032 9.23303 16.5753 9.6465L17.174 11.0939C17.2589 11.2987 17.3026 11.5182 17.3026 11.7399C17.3027 11.9616 17.259 12.1811 17.1742 12.386C17.0893 12.5908 16.965 12.7769 16.8082 12.9336C16.6514 13.0904 16.4652 13.2147 16.2604 13.2994L14.8126 13.8991C14.3991 14.0701 14.0705 14.3983 13.8989 14.8114L13.2987 16.2603C13.1275 16.6738 12.799 17.0023 12.3855 17.1736C11.972 17.3449 11.5074 17.3449 11.0939 17.1736L9.64609 16.5739C9.23259 16.403 8.76817 16.4034 8.35493 16.5748L6.90606 17.1741C6.4928 17.345 6.02862 17.3449 5.61547 17.1737C5.20232 17.0026 4.874 16.6745 4.70261 16.2614L4.10228 14.8121C3.93133 14.3987 3.60318 14.07 3.18999 13.8985L1.74111 13.2983C1.32781 13.1271 0.999393 12.7988 0.828059 12.3856C0.656725 11.9723 0.656492 11.5079 0.827413 11.0945L1.42713 9.64669C1.59798 9.23319 1.59763 8.76877 1.42616 8.35553L0.827304 6.90562C0.742399 6.70083 0.69868 6.48131 0.698644 6.25961C0.698609 6.03792 0.742258 5.81839 0.827097 5.61357C0.911937 5.40874 1.0363 5.22265 1.19309 5.06591C1.34988 4.90917 1.53602 4.78486 1.74087 4.70009L3.1887 4.10038C3.60179 3.92957 3.93024 3.60184 4.10194 3.18912L4.70208 1.74024C4.87335 1.32676 5.20187 0.998247 5.61535 0.826976C6.02884 0.655705 6.49342 0.655705 6.90691 0.826976L8.35474 1.42669C8.76824 1.59754 9.23266 1.59719 9.6459 1.42572L11.0954 0.827905C11.5088 0.65673 11.9733 0.656765 12.3867 0.828003C12.8001 0.99924 13.1286 1.32766 13.2999 1.74104L13.9002 3.19034L13.9 3.18783Z"
            fill="#0788F5"
          />
        </svg>

        <div>
          <Typography
            fontWeight="lg"
            fontSize="lg"
            endDecorator={
              <Chip
                variant="outlined"
                size="sm"
                startDecorator={<Badge size="sm" />}
              >
                Online
              </Chip>
            }
          >
            Katherine Moss
          </Typography>

          <Typography level="body2">@kathy</Typography>
        </div>
      </Stack>
      <Stack spacing={1} direction="row" alignItems="center">
        <Button
          startDecorator={<i data-feather="phone-call" />}
          color="neutral"
          variant="outlined"
        >
          Call
        </Button>
        <Button>View profile</Button>
        <IconButton variant="plain" color="neutral">
          <i data-feather="more-vertical" />
        </IconButton>
      </Stack>
    </Stack>
  );
}
