import Slider from '@mui/material/Slider';

<Slider
  slots={{
    track: ComponentsTrack
  }}
  slotProps={{ track: componentsTrackProps }}
/>;
<Slider
  slots={{
    rail: SlotsRail,
    track: ComponentsTrack
  }}
  slotProps={{
    rail: slotsRailProps,
    track: componentsTrackProps
  }} />;
<Slider
  slots={{ rail: SlotsRail, track: SlotsTrack }}
  slotProps={{ rail: slotsRailProps, track: slotsTrackProps }} />;
