import { selectClasses } from '@mui/material/Select';

("& .MuiSelect-filled ~ .MuiSelect-icon");
("& .MuiSelect-outlined ~ .MuiSelect-icon");
("& .MuiSelect-standard ~ .MuiSelect-icon");
`& .${selectClasses.filled} ~ .${selectClasses.icon}`;
`& .${selectClasses.outlined} ~ .${selectClasses.icon}`;
`& .${selectClasses.standard} ~ .${selectClasses.icon}`;
