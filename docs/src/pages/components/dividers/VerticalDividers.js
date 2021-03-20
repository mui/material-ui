import * as React from 'react';
import PropTypes from 'prop-types';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

function VerticalDividersContainer(props) {
  const { children } = props;
  return (
    <div>
      <Grid
        sx={{
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
        container
        alignItems="center"
      >
        <FormatAlignLeftIcon />
        <FormatAlignCenterIcon />
        <FormatAlignRightIcon />
        {children}
        <FormatBoldIcon />
        <FormatItalicIcon />
        <FormatUnderlinedIcon />
      </Grid>
    </div>
  );
}

VerticalDividersContainer.propTypes = {
  children: PropTypes.element.isRequired,
};

export { VerticalDividersContainer };

export default function VerticalDividers() {
  return (
    <VerticalDividersContainer>
      <Divider orientation="vertical" flexItem />
    </VerticalDividersContainer>
  );
}
