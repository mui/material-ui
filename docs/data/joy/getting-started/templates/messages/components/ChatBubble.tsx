import * as React from 'react';
import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FileIcon from './FileIcon';
import { MessageProps } from '../types';

type ChatBubbleProps = MessageProps & {
  variant: 'sent' | 'received';
};

function ReactionButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <IconButton
      onClick={onClick}
      color={selected ? 'primary' : 'neutral'}
      variant="soft"
      size="sm"
    >
      {children}
    </IconButton>
  );
}

export default function ChatBubble({
  content,
  variant,
  timestamp,
  attachment = undefined,
  sender,
}: ChatBubbleProps) {
  const isSent = variant === 'sent';
  const [isHovered, setIsHovered] = React.useState<boolean>(false);
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [isCelebrated, setIsCelebrated] = React.useState<boolean>(false);
  return (
    <Box maxWidth="80%" minWidth={attachment ? '80%' : 'auto'}>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontSize="sm">{sender.name}</Typography>
        <Typography fontSize="xs">{timestamp}</Typography>
      </Stack>
      {attachment ? (
        <Sheet
          variant="outlined"
          sx={{
            px: 1.75,
            py: 1.25,
            borderRadius: 'sm',
            borderTopRightRadius: isSent ? 0 : 'sm',
            borderTopLeftRadius: isSent ? 'sm' : 0,
          }}
        >
          <Stack direction="row" spacing={1.5} alignItems="center">
            <FileIcon fileType={attachment.type} />
            <div>
              <Typography fontSize="sm">{attachment.fileName}</Typography>
              <Typography level="body2">{attachment.size}</Typography>
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
            sx={{
              px: 1.75,
              py: 1.25,
              borderRadius: 'sm',
              borderTopRightRadius: isSent ? 0 : 'sm',
              borderTopLeftRadius: isSent ? 'sm' : 0,
            }}
          >
            {content}
          </Sheet>
          {(isHovered || isLiked || isCelebrated) && (
            <Stack
              direction="row"
              justifyContent={isSent ? 'flex-end' : 'flex-start'}
              spacing={0.5}
              sx={{
                position: isLiked || isCelebrated ? 'initial' : 'absolute',
                bottom: -36,
                right: 0,
                left: 0,
                pt: 0.5,
              }}
            >
              <ReactionButton
                selected={isLiked}
                onClick={() => setIsLiked((prevState) => !prevState)}
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </ReactionButton>

              <ReactionButton
                selected={isCelebrated}
                onClick={() => setIsCelebrated((prevState) => !prevState)}
              >
                {isCelebrated ? <CelebrationIcon /> : <CelebrationOutlinedIcon />}
              </ReactionButton>
            </Stack>
          )}
        </Box>
      )}
    </Box>
  );
}
