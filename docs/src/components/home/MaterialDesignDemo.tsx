import * as React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ContentCopyRounded from '@material-ui/icons/ContentCopyRounded';
import CodeRounded from '@material-ui/icons/CodeRounded';

export const demoCode = {
  imports: `import * as React from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import ContentCopyRounded from '@material-ui/icons/ContentCopyRounded';
import CodeRounded from '@material-ui/icons/CodeRounded';`,
  component: `export default function MaterialDesignDemo() {
  return (
    <Card elevation={4} sx={{ display: 'flex', p: 2 }}>
      <Avatar src="/static/images/avatar/1.jpg" variant="rounded" sx={{ mr: 2 }} />
      <div>
        <Typography component="div" variant="caption" color="text.secondary">
          Today at 09:40 AM
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <Typography component="div" mr={0.5} mb={0.5} fontWeight="bold">
            Merge pull request{' '}
            <Link href="/" underline="none">
              #2021
            </Link>{' '}
            from{' '}
          </Typography>
          <Chip
            size="small"
            label="mui-org/master"
            color="success"
            onClick={() => {}}
            sx={{ mb: 0.5 }}
          />
        </Box>
        <Typography component="div" variant="caption" mb={1.5} color="grey.800">
          Committed by{' '}
          <Link href="/" underline="none" fontWeight="bold">
            Olivier Tassinari
          </Link>
        </Typography>
        <Button variant="outlined" size="small" startIcon={<ContentCopyRounded />} sx={{ mr: 1 }}>
          i88jjd43
        </Button>
        <IconButton size="small">
          <CodeRounded fontSize="small" />
        </IconButton>
      </div>
    </Card>
  );
}`,
};

export default function MaterialDesignDemo() {
  return (
    <Card elevation={4} sx={{ display: 'flex', p: 2 }}>
      <Avatar src="/static/images/avatar/1.jpg" variant="rounded" sx={{ mr: 2 }} />
      <div>
        <Typography component="div" variant="caption" color="text.secondary">
          Today at 09:40 AM
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap' }}>
          <Typography component="div" mr={0.5} mb={0.5} fontWeight="bold">
            Merge pull request{' '}
            <Link href="/" underline="none">
              #2021
            </Link>{' '}
            from{' '}
          </Typography>
          <Chip
            size="small"
            label="mui-org/master"
            color="success"
            onClick={() => {}}
            sx={{ mb: 0.5 }}
          />
        </Box>
        <Typography component="div" variant="caption" mb={1.5} color="grey.800">
          Committed by{' '}
          <Link href="/" underline="none" fontWeight="bold">
            Olivier Tassinari
          </Link>
        </Typography>
        <Button variant="outlined" size="small" startIcon={<ContentCopyRounded />} sx={{ mr: 1 }}>
          i88jjd43
        </Button>
        <IconButton size="small">
          <CodeRounded fontSize="small" />
        </IconButton>
      </div>
    </Card>
  );
}
