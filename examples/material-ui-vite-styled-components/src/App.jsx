import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)`
  background-color: #1976d2;
  &:hover {
    background-color: #115293;
  }
`;

function App() {
  return (
    <div>
      <h1>Hello Material UI with Styled Components</h1>
      <CustomButton variant="contained">
        Styled Button
      </CustomButton>
    </div>
  );
}

export default App;