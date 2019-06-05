import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function LightbulbFull(props) {
  return (
    <SvgIcon {...props}>
      <path d="m9,21c0,0.55 0.45,1 1,1l4,0c0.55,0 1,-0.45 1,-1l0,-1l-6,0l0,1zm3,-19c-3.86,0 -7,3.14 -7,7c0,2.38 1.19,4.47 3,5.74l0,2.26c0,0.55 0.45,1 1,1l6,0c0.55,0 1,-0.45 1,-1l0,-2.26c1.81,-1.27 3,-3.36 3,-5.74c0,-3.86 -3.14,-7 -7,-7z" />
    </SvgIcon>
  );
}

LightbulbFull.muiName = 'SvgIcon';

export default LightbulbFull;
