import Alert from '@org/ui/material/Alert';

<Alert
  slots={{
    closeButton: ComponentsButton
  }}
  slotProps={{ closeButton: componentsButtonProps }}
/>;
<Alert
  slots={{
    closeIcon: SlotsIcon,
    closeButton: ComponentsButton
  }}
  slotProps={{
    closeIcon: slotsIconProps,
    closeButton: componentsButtonProps
  }} />;
<Alert
  slots={{ closeIcon: SlotsIcon, closeButton: SlotsButton }}
  slotProps={{ closeIcon: slotsIconProps, closeButton: {
    ...componentsButtonProps,
    ...slotsButtonProps
  } }} />;
<Alert
  slots={{ closeIcon: SlotsIcon, closeButton: SlotsButton }}
  slotProps={{ closeButton: {
    ...componentsButtonProps,
    ...slotsButtonProps
  }, closeIcon: {
    ...componentsIconProps,
    ...slotsIconProps
  } }} />;
