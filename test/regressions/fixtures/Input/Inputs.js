import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

function Inputs() {
  const inputRef = React.useRef();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: 200 }}>
        <Input value="Hello world" sx={{ m: '10px' }} />
        <Input placeholder="Placeholder" sx={{ m: '10px' }} />
        <Input value="Disabled" sx={{ m: '10px' }} disabled />
        <Input error value="Error" sx={{ m: '10px' }} />
        <Input value="Focused" inputRef={inputRef} sx={{ m: '10px' }} />
        <Input type="search" defaultValue="Hello world" />
      </Box>
      <Input value="Large input" sx={{ m: '10px', width: 300 }} />
    </div>
  );
}

export default Inputs;
