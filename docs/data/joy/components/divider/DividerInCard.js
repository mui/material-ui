import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import ArrowForward from '@mui/icons-material/ArrowForward';

export default function DividerInCard() {
  const [row, setRow] = React.useState(false);
  return (
    <Box>
      <Checkbox
        label="horizontal"
        checked={row}
        onChange={(event) => setRow(event.target.checked)}
        sx={{ mb: 2 }}
      />
      <Card
        row={row}
        variant="outlined"
        sx={{ width: 400, maxWidth: '100%', gap: 1.5 }}
      >
        <Typography fontSize="lg" fontWeight="md">
          Headline
        </Typography>
        <Divider />
        <Box sx={{ display: row ? 'block' : 'contents' }}>
          <Typography level="body2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text ever
            since the 1500s
          </Typography>
          <Button
            size="sm"
            variant="soft"
            color="neutral"
            endDecorator={<ArrowForward />}
            sx={{ width: '100%', mt: row ? 2 : 0 }}
          >
            See more
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
