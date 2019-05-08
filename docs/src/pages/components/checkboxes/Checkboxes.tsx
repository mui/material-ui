import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

function Checkboxes() {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
  });

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <div>
      <Checkbox checked={state.checkedA} onChange={handleChange('checkedA')} value="checkedA" />
      <Checkbox
        checked={state.checkedB}
        onChange={handleChange('checkedB')}
        value="checkedB"
        color="primary"
      />
      <Checkbox value="checkedC" />
      <Checkbox disabled value="checkedD" />
      <Checkbox disabled checked value="checkedE" />
      <Checkbox
        checked={state.checkedF}
        onChange={handleChange('checkedF')}
        value="checkedF"
        indeterminate
      />
      <Checkbox defaultChecked color="default" value="checkedG" />
    </div>
  );
}

export default Checkboxes;
