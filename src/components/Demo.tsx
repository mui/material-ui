import { Box } from '@mui/material';
import { StyledDiv } from './StyledComponent';

export const Demo = () => (
  <Box>
    <h3>With shouldForwardProp (correct)</h3>
    <StyledDiv
      customProp="test"
      variant="primary"
      color="blue"
      sx={{ margin: 2 }}
    />
    
    {/* Show the difference in DOM inspection */}
  </Box>
); 