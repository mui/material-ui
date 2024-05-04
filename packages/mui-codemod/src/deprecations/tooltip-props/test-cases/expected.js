import Tooltip from '@mui/material/Tooltip';
import {Tooltip as MyTooltip} from '@mui/material';

<Tooltip
  slots={{
    popper: CustomPopper,
    transition: CustomTransition
  }}
  slotProps={{
    popper: { disablePortal: true },
    transition: { timeout: 200 }
  }} />;

<Tooltip
  slotProps={{
    tooltip: { height: 20 },
    popper: { disablePortal: true },
    transition: { timeout: 200 }
  }}
  slots={{
    tooltip: "div",
    popper: CustomPopper,
    transition: CustomTransition
  }} />;

<MyTooltip
  slots={{
    popper: CustomPopper,
    transition: CustomTransition
  }}
  slotProps={{
    popper: { disablePortal: true },
    transition: { timeout: 200 }
  }} />;

<CustomTooltip
  PopperComponent={CustomPopper}
  TransitionComponent={CustomTransition}
  PopperProps={{ disablePortal: true }}
  TransitionProps={{ timeout: 200 }}
/>
