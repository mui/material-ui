import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import { Frame } from '@mui/internal-core-docs/AppLayout';

const code = `
<ChatBox
  messages={messages}
  adapter={adapter}
  streaming
/>`;

export default function XChatDemo() {
  return (
    <Frame sx={{ height: '100%' }}>
      <Frame.Demo sx={{ p: 2 }}>
        <Paper
          variant="outlined"
          sx={(theme) => ({
            maxWidth: 420,
            mx: 'auto',
            borderRadius: '8px',
            overflow: 'hidden',
            bgcolor: '#FFF',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.900',
            }),
          })}
        >
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: 'flex',
              gap: 1.5,
              alignItems: 'center',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
              <AutoAwesomeRoundedIcon fontSize="small" />
            </Avatar>
            <Box sx={{ minWidth: 0, flexGrow: 1 }}>
              <Typography variant="body2" sx={{ fontWeight: 'semiBold', color: 'text.primary' }}>
                Product assistant
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Streaming with tool output
              </Typography>
            </Box>
            <Chip label="Online" color="success" size="small" variant="outlined" />
          </Box>
          <Box sx={{ p: 2, display: 'grid', gap: 1.5 }}>
            <Box sx={{ justifySelf: 'end', maxWidth: '82%' }}>
              <Typography
                variant="body2"
                sx={{
                  p: 1.25,
                  borderRadius: '8px 8px 2px 8px',
                  bgcolor: 'primary.main',
                  color: '#FFF',
                }}
              >
                Compare renewal risk by segment.
              </Typography>
            </Box>
            <Box sx={{ maxWidth: '88%' }}>
              <Typography
                variant="body2"
                sx={(theme) => ({
                  p: 1.25,
                  borderRadius: '8px 8px 8px 2px',
                  bgcolor: 'grey.50',
                  color: 'text.primary',
                  ...theme.applyDarkStyles({
                    bgcolor: 'primaryDark.800',
                  }),
                })}
              >
                I found three segments with elevated churn risk. I can create a chart and attach the
                rows used for the summary.
              </Typography>
            </Box>
            <Paper
              variant="outlined"
              sx={{
                p: 1.25,
                display: 'grid',
                gap: 0.5,
                bgcolor: 'background.default',
              }}
            >
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Tool result
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.primary', fontWeight: 'semiBold' }}>
                Generated grouped churn chart
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
                <Chip label="Sources" size="small" />
                <Chip label="Grid rows" size="small" />
                <Chip label="Chart" size="small" />
              </Box>
            </Paper>
          </Box>
          <Box
            sx={{
              m: 2,
              mt: 0,
              p: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              color: 'text.secondary',
            }}
          >
            <Typography variant="body2">Ask about this dashboard...</Typography>
            <SendRoundedIcon color="primary" fontSize="small" />
          </Box>
        </Paper>
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark" sx={{ maxHeight: 300, overflow: 'auto' }}>
        <HighlightedCode copyButtonHidden plainStyle code={code} language="jsx" />
      </Frame.Info>
    </Frame>
  );
}
