import * as React from 'react';
import PropTypes from 'prop-types';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from '@mui/material/ToggleButtonGroup';
import Stack from '@mui/material/Stack';

function ButtonGroup({ gap, orientation }) {
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      orientation={orientation}
      sx={(theme) => ({
        gap,
        ...(orientation === 'horizontal' && {
          [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
            {
              borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
              borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
            },
          [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
            {
              borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
              borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
              borderLeft: `1px solid ${(theme.vars || theme).palette.divider}`,
            },
          [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
            {
              borderLeft: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
            },
        }),
        ...(orientation === 'vertical' && {
          width: 'fit-content',
          [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
            {
              borderBottomRightRadius: (theme.vars || theme).shape.borderRadius,
              borderBottomLeftRadius: (theme.vars || theme).shape.borderRadius,
            },
          [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
            {
              borderTopRightRadius: (theme.vars || theme).shape.borderRadius,
              borderTopLeftRadius: (theme.vars || theme).shape.borderRadius,
              borderTop: `1px solid ${(theme.vars || theme).palette.divider}`,
            },
          [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
            {
              borderTop: `1px solid ${(theme.vars || theme).palette.action.disabledBackground}`,
            },
        }),
      })}
    >
      <ToggleButton value="left" aria-label="left aligned">
        <FormatAlignLeftIcon />
      </ToggleButton>
      <ToggleButton value="center" aria-label="centered">
        <FormatAlignCenterIcon />
      </ToggleButton>
      <ToggleButton value="right" aria-label="right aligned">
        <FormatAlignRightIcon />
      </ToggleButton>
      <ToggleButton value="justify" aria-label="justified" disabled>
        <FormatAlignJustifyIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

ButtonGroup.propTypes = {
  gap: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
};

export default function SpacingToggleButton() {
  return (
    <Stack direction="column" spacing={2} alignItems="center">
      <ButtonGroup gap="2rem" orientation="horizontal" />
      <ButtonGroup gap="2rem" orientation="vertical" />
    </Stack>
  );
}
