import { inputBaseClasses } from '@mui/material/InputBase';

("&.MuiInputBase-hiddenLabel > .MuiInputBase-input");
("&.MuiInputBase-multiline > .MuiInputBase-input");
("&.MuiInputBase-adornedStart > .MuiInputBase-input");
("&.MuiInputBase-adornedEnd > .MuiInputBase-input");
("&.MuiInputBase-sizeSmall > .MuiInputBase-input");

`&.${inputBaseClasses.hiddenLabel} > .${inputBaseClasses.input}`;
`&.${inputBaseClasses.multiline} > .${inputBaseClasses.input}`;
`&.${inputBaseClasses.adornedStart} > .${inputBaseClasses.input}`;
`&.${inputBaseClasses.adornedEnd} > .${inputBaseClasses.input}`;
`&.${inputBaseClasses.sizeSmall} > .${inputBaseClasses.input}`;
