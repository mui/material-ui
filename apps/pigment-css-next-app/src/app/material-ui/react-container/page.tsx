import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/PigmentContainer';

export default function ContainerPage() {
  return (
    <React.Fragment>
      <section>
        <h2> Fixed Container</h2>
        <div className="demo-container">
          <Container fixed>
            <Box sx={{ bgcolor: '#cfe8fc', height: '30vh' }} />
          </Container>
        </div>
      </section>
      <section>
        <h2> Simple Container</h2>
        <div className="demo-container">
          <Container maxWidth="sm">
            <Box sx={{ bgcolor: '#cfe8fc', height: '30vh' }} />
          </Container>
        </div>
      </section>
    </React.Fragment>
  );
}
