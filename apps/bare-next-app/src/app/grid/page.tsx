'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material';

const Item = styled('div')`
  background-color: #fff;
  border: 1px solid #ced7e0;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
`;

function GridDemo1() {
  return (
    <Grid container spacing={2} sx={{ color: '#070707' }}>
      <Grid size={8}>
        <Item>size=8</Item>
      </Grid>
      <Grid size={4}>
        <Item>size=4</Item>
      </Grid>
      <Grid size={4}>
        <Item>size=4</Item>
      </Grid>
      <Grid size={8}>
        <Item>size=8</Item>
      </Grid>
    </Grid>
  );
}

function GridDemo2() {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6, md: 8 }}>
        <Item>xs=6 md=8</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 4 }}>
        <Item>xs=6 md=4</Item>
      </Grid>
      <Grid size={{ xs: 6, md: 8 }}>
        <Item>xs=6 md=8</Item>
      </Grid>
    </Grid>
  );
}

function GridDemo4() {
  return (
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid size={6}>
        <Item>1</Item>
      </Grid>
      <Grid size={6}>
        <Item>2</Item>
      </Grid>
      <Grid size={6}>
        <Item>3</Item>
      </Grid>
      <Grid size={6}>
        <Item>4</Item>
      </Grid>
    </Grid>
  );
}

function GridDemo5() {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {Array.from(Array(6)).map((_, index) => (
        <Grid size={{ xs: 2, sm: 4 }} key={index}>
          <Item>{index + 1}</Item>
        </Grid>
      ))}
    </Grid>
  );
}

function GridDemo6() {
  return (
    <Grid container spacing={3}>
      <Grid size="grow">
        <Item>grow</Item>
      </Grid>
      <Grid size={6}>
        <Item>size=6</Item>
      </Grid>
      <Grid size="grow">
        <Item>grow</Item>
      </Grid>
    </Grid>
  );
}

function GridDemo7() {
  return (
    <Grid container spacing={3}>
      <Grid size="auto">
        <Item>Variable width item</Item>
      </Grid>
      <Grid size={6}>
        <Item>size=6</Item>
      </Grid>
      <Grid size="grow">
        <Item>grow</Item>
      </Grid>
    </Grid>
  );
}

function GridDemo8() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5, lg: 4 }}>
          <Item>Email subscribe section</Item>
        </Grid>
        <Grid container size={{ xs: 12, md: 7, lg: 8 }} spacing={4}>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box id="category-a" sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
                Category A
              </Box>
              <Box component="ul" aria-labelledby="category-a" sx={{ paddingLeft: 2 }}>
                <li>Link 1.1</li>
                <li>Link 1.2</li>
                <li>Link 1.3</li>
              </Box>
            </Item>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box id="category-b" sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
                Category B
              </Box>
              <Box component="ul" aria-labelledby="category-b" sx={{ paddingLeft: 2 }}>
                <li>Link 2.1</li>
                <li>Link 2.2</li>
                <li>Link 2.3</li>
              </Box>
            </Item>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box id="category-c" sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
                Category C
              </Box>
              <Box component="ul" aria-labelledby="category-c" sx={{ paddingLeft: 2 }}>
                <li>Link 3.1</li>
                <li>Link 3.2</li>
                <li>Link 3.3</li>
              </Box>
            </Item>
          </Grid>
          <Grid size={{ xs: 6, lg: 3 }}>
            <Item>
              <Box id="category-d" sx={{ fontSize: '12px', textTransform: 'uppercase' }}>
                Category D
              </Box>
              <Box component="ul" aria-labelledby="category-d" sx={{ paddingLeft: 2 }}>
                <li>Link 4.1</li>
                <li>Link 4.2</li>
                <li>Link 4.3</li>
              </Box>
            </Item>
          </Grid>
        </Grid>
        <Grid
          size={12}
          container
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ fontSize: '12px', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Grid>
            <Item>© Copyright</Item>
          </Grid>
          <Grid container columnSpacing={1}>
            <Grid>
              <Item>Link A</Item>
            </Grid>
            <Grid>
              <Item>Link B</Item>
            </Grid>
            <Grid>
              <Item>Link C</Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

function GridDemo9() {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid size={{ xs: 8 }}>
        <Item>size=8</Item>
      </Grid>
      <Grid size={{ xs: 8 }}>
        <Item>size=8</Item>
      </Grid>
    </Grid>
  );
}

function GridDemo10() {
  return (
    <Grid container spacing={3} sx={{ flexGrow: 1 }}>
      <Grid size={{ xs: 6, md: 2 }} offset={{ xs: 3, md: 0 }}>
        <Item>1</Item>
      </Grid>
      <Grid size={{ xs: 4, md: 2 }} offset={{ md: 'auto' }}>
        <Item>2</Item>
      </Grid>
      <Grid size={{ xs: 4, md: 2 }} offset={{ xs: 4, md: 0 }}>
        <Item>3</Item>
      </Grid>
      <Grid size={{ xs: 'grow', md: 6 }} offset={{ md: 2 }}>
        <Item>4</Item>
      </Grid>
    </Grid>
  );
}

const demos = [
  { id: '1', component: GridDemo1 },
  { id: '2', component: GridDemo2 },
  { id: '4', component: GridDemo4 },
  { id: '5', component: GridDemo5 },
  { id: '6', component: GridDemo6 },
  { id: '7', component: GridDemo7 },
  { id: '8', component: GridDemo8 },
  { id: '9', component: GridDemo9 },
  { id: '10', component: GridDemo10 },
];

export default function InteractiveGrid() {
  return (
    <div sx={{ padding: 2, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {demos.map((demo) => {
        const Demo = demo.component;
        return (
          <div
            key={demo.id}
            sx={{ flex: '1 1 0', paddingBottom: 4, borderBottom: '1px solid gray' }}
          >
            <h3>Grid Demo {demo.id}</h3>
            <Demo />
          </div>
        );
      })}
    </div>
  );
}
