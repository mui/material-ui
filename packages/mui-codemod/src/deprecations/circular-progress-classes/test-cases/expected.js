import { circularProgressClasses } from '@mui/material/CircularProgress';

('& .CircularProgress-circleDeterminate');
('& .CircularProgress-circleIndeterminate');
`&.${circularProgressClasses.determinate} > .${circularProgressClasses.circle}`;
`&.${circularProgressClasses.indeterminate} > .${circularProgressClasses.circle}`;
