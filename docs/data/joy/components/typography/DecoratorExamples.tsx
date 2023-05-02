import * as React from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

export default function DecoratorExamples() {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}
    >
      <Typography
        startDecorator={
          <Box
            component="span"
            sx={{
              bgcolor: 'neutral.400',
              width: '0.5em',
              height: '0.5em',
              borderRadius: '50%',
            }}
          />
        }
      >
        Inactive
      </Typography>

      <Typography
        fontSize="xl4"
        lineHeight={1}
        startDecorator={
          <Typography fontSize="lg" textColor="text.secondary">
            $
          </Typography>
        }
        sx={{ alignItems: 'flex-start' }}
      >
        25
      </Typography>

      <Typography
        level="body2"
        startDecorator={<InfoOutlined />}
        sx={{ alignItems: 'flex-start', maxWidth: 240, wordBreak: 'break-all' }}
      >
        This example demonstrates multiple lines of the text.
      </Typography>

      <Typography
        variant="soft"
        color="danger"
        startDecorator="🚨"
        fontSize="sm"
        sx={{ '--Typography-gap': '0.5rem', p: 1 }}
      >
        Simple alert using only Typography.
      </Typography>
    </Box>
  );
}
