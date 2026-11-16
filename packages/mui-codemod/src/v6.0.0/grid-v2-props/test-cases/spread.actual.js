import GridA from '@mui/material/Grid2';
import { Grid2 as GridB } from '@mui/material';
import GridC from '@org/ui/material/Grid2';
import { Grid2 as GridD } from '@org/ui/material';

<GridA item {...props} />;
<GridA zeroMinWidth {...props} />;
<GridA item xs={6} {...props} />;
<GridB zeroMinWidth {...props} data-x="1" />;
<GridC item {...props} onClick={fn} {...rest} />;
<GridD {...props} item zeroMinWidth md={4} className="z" />;

<GridA item {...{ id: 'k' }} />;
<GridA item xs={6} {...{ sm: 3, id: 'k' }} />;
<GridB zeroMinWidth {...{ xsOffset: 2, onClick }} />;
<GridC item {...{ xs: 2 }} {...props} />;
