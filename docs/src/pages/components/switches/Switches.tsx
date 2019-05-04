import React from 'react';
import Switch from '@material-ui/core/Switch';

function Switches() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div>
      <Switch checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
      <Switch
        checked={state.checkedB}
        onChange={handleChange('checkedB')}
        value="checkedB"
        color="primary"
      />
      <Switch value="checkedC" />
      <Switch disabled value="checkedD" />
      <Switch disabled checked value="checkedE" />
      <Switch defaultChecked value="checkedF" color="default" />
    </div>
  );
}

export default Switches;
