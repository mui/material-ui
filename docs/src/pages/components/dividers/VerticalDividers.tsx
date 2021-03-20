import * as React from 'react';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

type Props = {
  children: React.ReactElement;
};

export function VerticalDividersContainer(props: Props) {
  const { children } = props;
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
          border: (theme) => `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          bgcolor: 'background.paper',
          color: 'text.secondary',
          '& svg': {
            m: 1.5,
          },
          '& hr': {
            mx: 0.5,
          },
        }}
      >
        <FormatAlignLeftIcon />
        <FormatAlignCenterIcon />
        <FormatAlignRightIcon />
        {children}
        <FormatBoldIcon />
        <FormatItalicIcon />
      </Box>
    </div>
  );
}

export default function VerticalDividers() {
  return (
    <VerticalDividersContainer>
      <Divider orientation="vertical" flexItem />
    </VerticalDividersContainer>
  );
}
