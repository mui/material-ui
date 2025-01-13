import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '../utils/styledUtils';

const StyledDiv = styled('div', {
  shouldForwardProp,
})`
  background-color: ${props => props.color || 'transparent'};
`; 

// Add proper return type and prop types
export const Example: React.FC = () => (
  <StyledDiv 
    customProp="test"
    variant="primary"
    color="blue"
    sx={{ margin: 2 }}
  />
); 