import Tooltip from '@mui/material/Tooltip';

<Tooltip
  slots={{
    arrow: ComponentsArrow,
    popper: ComponentsPopper,
    tooltip: ComponentsTooltip,
    transition: ComponentsTransition
  }}
  slotProps={{
    arrow: componentsArrowProps,
    popper: componentsPopperProps,
    tooltip: componentsTooltipProps,
    transition: componentsTransitionProps
  }}
/>;
<Tooltip
  slots={{
    tooltip: SlotsTooltip,
    arrow: ComponentsArrow
  }}
  slotProps={{
    tooltip: slotsTooltipProps,
    arrow: componentsArrowProps
  }} />;
<Tooltip
  slots={{ tooltip: SlotsTooltip, arrow: SlotsArrow }}
  slotProps={{ tooltip: slotsTooltipProps, arrow: {
    ...componentsArrowProps,
    ...slotsArrowProps
  } }} />;
<Tooltip
  slots={{ tooltip: SlotsTooltip, arrow: SlotsArrow }}
  slotProps={{ arrow: {
    ...componentsArrowProps,
    ...slotsArrowProps
  }, tooltip: {
    ...componentsTooltipProps,
    ...slotsTooltipProps
  } }} />;
<Tooltip
  slots={{
    arrow: SlotsArrow,
    popper: SlotsPopper,
    tooltip: SlotsTooltip,
    transition: SlotsTransition
  }}
  slotProps={{
    arrow: {
      ...componentsArrowProps,
      ...slotsArrowProps
    },
    popper: {
      ...componentsPopperProps,
      ...slotsPopperProps
    },
    tooltip: {
      ...componentsTooltipProps,
      ...slotsTooltipProps
    },
    transition: {
      ...componentsTransitionProps,
      ...slotsTransitionProps
    }
  }} />;
