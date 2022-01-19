import * as React from 'react';
import Slider from '@mui/material/Slider';

function App() {
  return (
    <div className="space-x-2 p-4">
      <Slider
        className="p-4"
        defaultValue={30}
        classes={{ active: 'shadow-none' }}
        componentsProps={{ thumb: { className: 'hover:shadow-none' } }}
      />
    </div>
  );
}

export default App;
