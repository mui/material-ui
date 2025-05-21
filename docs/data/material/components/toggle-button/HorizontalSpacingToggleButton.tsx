import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function HorizontalSpacingToggleButton() {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="web">Web</ToggleButton>
      <ToggleButton value="android">Android</ToggleButton>
      <ToggleButton value="ios">iOS</ToggleButton>
    </ToggleButtonGroup>
  );
}

// import * as React from 'react';
// import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
// import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
// import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
// import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
// import ToggleButton, { toggleButtonClasses } from '@mui/material/ToggleButton';
// import ToggleButtonGroup, {
//   toggleButtonGroupClasses,
// } from '@mui/material/ToggleButtonGroup';
// import { styled } from '@mui/material/styles';

// const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
//   gap: '2rem',
//   [`& .${toggleButtonGroupClasses.firstButton}, & .${toggleButtonGroupClasses.middleButton}`]:
//     {
//       borderTopRightRadius: theme.vars.shape.borderRadius,
//       borderBottomRightRadius: theme.vars.shape.borderRadius,
//     },
//   [`& .${toggleButtonGroupClasses.lastButton}, & .${toggleButtonGroupClasses.middleButton}`]:
//     {
//       borderTopLeftRadius: theme.vars.shape.borderRadius,
//       borderBottomLeftRadius: theme.vars.shape.borderRadius,
//       borderLeft: `1px solid ${theme.vars.palette.divider}`,
//     },
//   [`& .${toggleButtonGroupClasses.lastButton}.${toggleButtonClasses.disabled}, & .${toggleButtonGroupClasses.middleButton}.${toggleButtonClasses.disabled}`]:
//     {
//       borderLeft: `1px solid ${theme.vars.palette.action.disabledBackground}`,
//     },
// }));

// export default function HorizontalSpacingToggleButton() {
//   const [alignment, setAlignment] = React.useState<string | null>('left');

//   const handleAlignment = (
//     event: React.MouseEvent<HTMLElement>,
//     newAlignment: string | null,
//   ) => {
//     setAlignment(newAlignment);
//   };

//   return (
//     <div>
//       <StyledToggleButtonGroup
//         value={alignment}
//         exclusive
//         onChange={handleAlignment}
//         aria-label="text alignment"
//       >
//         <ToggleButton value="left" aria-label="left aligned">
//           <FormatAlignLeftIcon />
//         </ToggleButton>
//         <ToggleButton value="center" aria-label="centered">
//           <FormatAlignCenterIcon />
//         </ToggleButton>
//         <ToggleButton value="right" aria-label="right aligned">
//           <FormatAlignRightIcon />
//         </ToggleButton>
//         <ToggleButton value="justify" aria-label="justified" disabled>
//           <FormatAlignJustifyIcon />
//         </ToggleButton>
//       </StyledToggleButtonGroup>
//     </div>
//   );
// }
