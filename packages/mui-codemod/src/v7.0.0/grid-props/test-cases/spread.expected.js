import GridA from '@mui/material/Grid';
import { Grid as GridB } from '@mui/material';
import GridC from '@org/ui/material/Grid';
import { Grid as GridD } from '@org/ui/material';

<GridA {...props} />;
<GridA {...props} />;
<GridA {...props} size={6} />;
<GridB {...props} data-x="1" />;
<GridC {...props} onClick={fn} {...rest} />;
<GridD
  {...props}
  className="z"
  size={{
    md: 4
  }} />;

<GridA {...{ id: 'k' }} />;
<GridA
  {...{
    id: 'k'
  }}
  size={{
    xs: 6,
    sm: 3
  }} />;
<GridB
  {...{
    onClick
  }}
  offset={2} />;
<GridC {...props} size={2} />;
