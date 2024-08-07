import Slider from '@mui/material/Slider';

<Slider
  components={{ Track: ComponentsTrack }}
  componentsProps={{ track: componentsTrackProps }}
/>;
<Slider
  slots={{ rail: SlotsRail }}
  components={{ Track: ComponentsTrack }}
  slotProps={{ rail: slotsRailProps }}
  componentsProps={{ track: componentsTrackProps }}
/>;
<Slider
  slots={{ rail: SlotsRail, track: SlotsTrack }}
  components={{ Track: ComponentsTrack }}
  slotProps={{ rail: slotsRailProps, track: slotsTrackProps }}
  componentsProps={{ track: componentsTrackProps }}
/>;
<Slider
  slots={{ rail: SlotsRail, track: SlotsTrack }}
  components={{ Track: ComponentsTrack }}
  slotProps={{ rail: slotsRailProps, track: slotsTrackProps }}
  componentsProps={{ track: componentsTrackProps, rail: componentsRailProps}}
/>;
