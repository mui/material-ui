import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';
import { alpha, Theme } from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';

interface ImageProps extends BoxProps {
  src?: string;
  alt?: string;
}

const Image: React.FC<ImageProps> = (props) => {
  return <Box component="img" {...props} />
}

const Span: React.FC<BoxProps> = props => {
  return <Box component="span" {...props} />
}

export default function Demo() {
  return (
    <div>
      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        width: { sm: 300, md: 400 },
        borderRadius: '15px',
        boxShadow: 3,
        minHeight: { sm: 300, md: 400 },
        ':hover': {
          boxShadow: 6,
        },
      }}
    >
      <Image sx={{ width: '100%', height: {sm: 200, md: 300}}} src="/static/images/system/demo.jpg" />
      <Span component="span" sx={{ marginTop: 2, fontSize: 18, fontWeight: 'fontWeightMedium' }}>
        123 Main St, Pheonix AZ
      </Span>
      <Span component="span" sx={{ color: 'primary.main', fontSize: 20, fontWeight: 'fontWeightMedium'}}>
        $280.000 - $310.000
      </Span>
      <Box sx={{ my: 1.5, p: 0.5, backgroundColor: (theme: Theme) => alpha(theme.palette.primary.light, 0.2), borderRadius: '5px', color: 'primary.main', display: 'flex', alignItems: 'center'}}>
        <ErrorIcon />
        <Span sx={{ marginLeft: 0.5 }}>CONFIDENCE SCORE 85%</Span>
      </Box>
    </Box>
    </div>
  );
}
