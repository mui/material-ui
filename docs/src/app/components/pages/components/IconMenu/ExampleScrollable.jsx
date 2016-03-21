import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton/IconButton';
import MapsPlace from 'material-ui/svg-icons/maps/place';

const IconMenuExampleScrollable = () => (
  <IconMenu
    iconButtonElement={<IconButton><MapsPlace /></IconButton>}
    anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    targetOrigin={{horizontal: 'left', vertical: 'top'}}
    maxHeight={272}
  >
    <MenuItem value="AL" primaryText="Alabama" />
    <MenuItem value="AK" primaryText="Alaska" />
    <MenuItem value="AZ" primaryText="Arizona" />
    <MenuItem value="AR" primaryText="Arkansas" />
    <MenuItem value="CA" primaryText="California" />
    <MenuItem value="CO" primaryText="Colorado" />
    <MenuItem value="CT" primaryText="Connecticut" />
    <MenuItem value="DE" primaryText="Delaware" />
    <MenuItem value="DC" primaryText="District Of Columbia" />
    <MenuItem value="FL" primaryText="Florida" />
    <MenuItem value="GA" primaryText="Georgia" />
    <MenuItem value="HI" primaryText="Hawaii" />
    <MenuItem value="ID" primaryText="Idaho" />
    <MenuItem value="IL" primaryText="Illinois" />
    <MenuItem value="IN" primaryText="Indiana" />
    <MenuItem value="IA" primaryText="Iowa" />
    <MenuItem value="KS" primaryText="Kansas" />
    <MenuItem value="KY" primaryText="Kentucky" />
    <MenuItem value="LA" primaryText="Louisiana" />
    <MenuItem value="ME" primaryText="Maine" />
    <MenuItem value="MD" primaryText="Maryland" />
    <MenuItem value="MA" primaryText="Massachusetts" />
    <MenuItem value="MI" primaryText="Michigan" />
    <MenuItem value="MN" primaryText="Minnesota" />
    <MenuItem value="MS" primaryText="Mississippi" />
    <MenuItem value="MO" primaryText="Missouri" />
    <MenuItem value="MT" primaryText="Montana" />
    <MenuItem value="NE" primaryText="Nebraska" />
    <MenuItem value="NV" primaryText="Nevada" />
    <MenuItem value="NH" primaryText="New Hampshire" />
    <MenuItem value="NJ" primaryText="New Jersey" />
    <MenuItem value="NM" primaryText="New Mexico" />
    <MenuItem value="NY" primaryText="New York" />
    <MenuItem value="NC" primaryText="North Carolina" />
    <MenuItem value="ND" primaryText="North Dakota" />
    <MenuItem value="OH" primaryText="Ohio" />
    <MenuItem value="OK" primaryText="Oklahoma" />
    <MenuItem value="OR" primaryText="Oregon" />
    <MenuItem value="PA" primaryText="Pennsylvania" />
    <MenuItem value="RI" primaryText="Rhode Island" />
    <MenuItem value="SC" primaryText="South Carolina" />
    <MenuItem value="SD" primaryText="South Dakota" />
    <MenuItem value="TN" primaryText="Tennessee" />
    <MenuItem value="TX" primaryText="Texas" />
    <MenuItem value="UT" primaryText="Utah" />
    <MenuItem value="VT" primaryText="Vermont" />
    <MenuItem value="VA" primaryText="Virginia" />
    <MenuItem value="WA" primaryText="Washington" />
    <MenuItem value="WV" primaryText="West Virginia" />
    <MenuItem value="WI" primaryText="Wisconsin" />
    <MenuItem value="WY" primaryText="Wyoming" />
  </IconMenu>
);

export default IconMenuExampleScrollable;
