import Tooltip from '@mui/material/Tooltip';

<Tooltip
  slots={{
    arrow: ComponentsArrow
  }}
  slotProps={{ arrow: componentsArrowProps }}
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
