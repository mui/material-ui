import Tooltip from '@mui/material/Tooltip';

<Tooltip
  components={{
    Arrow: ComponentsArrow,
    Popper: ComponentsPopper,
    Tooltip: ComponentsTooltip,
    Transition: ComponentsTransition
  }}
  componentsProps={{
    arrow: componentsArrowProps,
    popper: componentsPopperProps,
    tooltip: componentsTooltipProps,
    transition: componentsTransitionProps
  }}
/>;
<Tooltip
  slots={{ tooltip: SlotsTooltip }}
  components={{ Arrow: ComponentsArrow }}
  slotProps={{ tooltip: slotsTooltipProps }}
  componentsProps={{ arrow: componentsArrowProps }}
/>;
<Tooltip
  slots={{ tooltip: SlotsTooltip, arrow: SlotsArrow }}
  components={{ Arrow: ComponentsArrow }}
  slotProps={{ tooltip: slotsTooltipProps, arrow: slotsArrowProps }}
  componentsProps={{ arrow: componentsArrowProps }}
/>;
<Tooltip
  slots={{ tooltip: SlotsTooltip, arrow: SlotsArrow }}
  components={{ Arrow: ComponentsArrow }}
  slotProps={{ tooltip: slotsTooltipProps, arrow: slotsArrowProps }}
  componentsProps={{ arrow: componentsArrowProps, tooltip: componentsTooltipProps}}
/>;
<Tooltip
  slots={{
    arrow: SlotsArrow,
    popper: SlotsPopper,
    tooltip: SlotsTooltip,
    transition: SlotsTransition
  }}
  components={{
    Arrow: ComponentsArrow,
    Popper: ComponentsPopper,
    Tooltip: ComponentsTooltip,
    Transition: ComponentsTransition
  }}
  slotProps={{
    arrow: slotsArrowProps,
    popper: slotsPopperProps,
    tooltip: slotsTooltipProps,
    transition: slotsTransitionProps
  }}
  componentsProps={{
    arrow: componentsArrowProps,
    popper: componentsPopperProps,
    tooltip: componentsTooltipProps,
    transition: componentsTransitionProps
  }}
/>;
