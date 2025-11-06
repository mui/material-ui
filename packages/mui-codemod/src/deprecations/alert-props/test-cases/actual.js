import Alert from '@mui/material/Alert';

<Alert
  components={{ CloseButton: ComponentsButton }}
  componentsProps={{ closeButton: componentsButtonProps }}
/>;
<Alert
  slots={{ closeIcon: SlotsIcon }}
  components={{ CloseButton: ComponentsButton }}
  slotProps={{ closeIcon: slotsIconProps }}
  componentsProps={{ closeButton: componentsButtonProps }}
/>;
<Alert
  slots={{ closeIcon: SlotsIcon, closeButton: SlotsButton }}
  components={{ CloseButton: ComponentsButton }}
  slotProps={{ closeIcon: slotsIconProps, closeButton: slotsButtonProps }}
  componentsProps={{ closeButton: componentsButtonProps }}
/>;
<Alert
  slots={{ closeIcon: SlotsIcon, closeButton: SlotsButton }}
  components={{ CloseButton: ComponentsButton }}
  slotProps={{ closeIcon: slotsIconProps, closeButton: slotsButtonProps }}
  componentsProps={{ closeButton: componentsButtonProps, closeIcon: componentsIconProps }}
/>;
