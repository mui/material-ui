import React from 'react';
import ActionHome from 'material-ui/lib/svg-icons/action/home';
import ActionFlightTakeoff from 'material-ui/lib/svg-icons/action/flight-takeoff';
import FileCloudDownload from 'material-ui/lib/svg-icons/file/cloud-download';
import HardwareVideogameAsset from 'material-ui/lib/svg-icons/hardware/videogame-asset';
import Colors from 'material-ui/lib/styles/colors';


const iconStyles = {
  marginRight: 24,
};

const SvgIconExampleIcons = () => (
  <div>
    <ActionHome style={iconStyles}/>
    <ActionFlightTakeoff style={iconStyles} color={Colors.red500} />
    <FileCloudDownload style={iconStyles} color={Colors.yellow500} />
    <HardwareVideogameAsset style={iconStyles} color={Colors.blue500} />
  </div>
);

export default SvgIconExampleIcons;
