import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import { MessageProps } from '../types';

type ChatBubbleProps = MessageProps & {
  variant: 'sent' | 'received';
};

export default function ChatBubble(props: ChatBubbleProps) {
  const { content, variant, timestamp, attachment = undefined, sender } = props;
  const isSent = variant === 'sent';
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [isCelebrated, setIsCelebrated] = React.useState<boolean>(false);
  return (
    <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between', mb: 0.25 }}
      >
        <Typography level="body-xs">
          {sender === 'You' ? sender : sender.name}
        </Typography>
        <Typography level="body-xs">{timestamp}</Typography>
      </Stack>
      {attachment ? (
        <Sheet
          variant="outlined"
          sx={[
            {
              px: 1.75,
              py: 1.25,
              borderRadius: 'lg',
            },
            isSent ? { borderTopRightRadius: 0 } : { borderTopRightRadius: 'lg' },
            isSent ? { borderTopLeftRadius: 'lg' } : { borderTopLeftRadius: 0 },
          ]}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Avatar color="primary" size="lg">
              <InsertDriveFileRoundedIcon />
            </Avatar>
            <div>
              <Typography sx={{ fontSize: 'sm' }}>{attachment.fileName}</Typography>
              <Typography level="body-sm">{attachment.size}</Typography>
            </div>
          </Stack>
        </Sheet>
      ) : (
        <Box
          sx={{ position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Sheet
            color={isSent ? 'primary' : 'neutral'}
            variant={isSent ? 'solid' : 'soft'}
            sx={[
              {
                p: 1.25,
                borderRadius: 'lg',
              },
              isSent
                ? {
                    borderTopRightRadius: 0,
                  }
                : {
                    borderTopRightRadius: 'lg',
                  },
              isSent
                ? {
                    borderTopLeftRadius: 'lg',
                  }
                : {
                    borderTopLeftRadius: 0,
                  },
              isSent
                ? {
                    backgroundColor: 'var(--joy-palette-primary-solidBg)',
                  }
                : {
                    backgroundColor: 'background.body',
                  },
            ]}
          >
            <Typography
              level="body-sm"
              sx={[
                isSent
                  ? {
                      color: 'var(--joy-palette-common-white)',
                    }
                  : {
                      color: 'var(--joy-palette-text-primary)',
                    },
              ]}
            >
              {content}
            </Typography>
          </Sheet>
          {(isHovered || isLiked || isCelebrated) && (
            <Stack
              direction="row"
              spacing={0.5}
              sx={{
                justifyContent: isSent ? 'flex-end' : 'flex-start',
                position: 'absolute',
                top: '50%',
                p: 1.5,
              }}
            >
              <IconButton
                variant={isLiked ? 'soft' : 'plain'}
                color={isLiked ? 'danger' : 'neutral'}
                size="sm"
                onClick={() => setIsLiked((prevState) => !prevState)}
              >
                {isLiked ? '❤️' : <FavoriteBorderIcon />}
              </IconButton>
              <IconButton
                variant={isCelebrated ? 'soft' : 'plain'}
                color={isCelebrated ? 'warning' : 'neutral'}
                size="sm"
                onClick={() => setIsCelebrated((prevState) => !prevState)}
              >
                {isCelebrated ? '🎉' : <CelebrationOutlinedIcon />}
              </IconButton>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}
