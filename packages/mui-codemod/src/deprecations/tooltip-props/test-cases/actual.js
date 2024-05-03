import Tooltip from '@mui/material/Tooltip';

<Tooltip
  components={{ Arrow: ComponentsArrow }}
  componentsProps={{ arrow: componentsArrowProps }}
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
