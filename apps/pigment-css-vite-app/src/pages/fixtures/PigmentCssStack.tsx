import Stack from '@mui/material-pigment-css/Stack';
import { styled } from '@mui/material-pigment-css';

const Item = styled.div`
  background-color: #fff;
  border: 1px solid #ced7e0;
  padding: 8px;
  border-radius: 4px;
  text-align: center;
`;

function StackDemo1() {
  return (
    <Stack spacing={2}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  );
}

function StackDemo2() {
  return (
    <Stack direction="row" spacing={2}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  );
}

function StackDemo3() {
  return (
    <Stack direction="row-reverse" spacing={2}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  );
}

function StackDemo4() {
  return (
    <Stack spacing={8}>
      <Item>Item 1</Item>
      <Item>Item 2</Item>
      <Item>Item 3</Item>
    </Stack>
  );
}

const demos = [
  { id: '1', component: StackDemo1 },
  { id: '2', component: StackDemo2 },
  { id: '3', component: StackDemo3 },
  { id: '4', component: StackDemo4 },
];

export default function InteractiveStack() {
  return (
    <div sx={{ padding: 2, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {demos.map((demo) => {
        const Demo = demo.component;
        return (
          <div
            key={demo.id}
            sx={{ flex: '1 1 0', paddingBottom: 4, borderBottom: '1px solid gray' }}
          >
            <h3>Stack Demo {demo.id}</h3>
            <Demo />
          </div>
        );
      })}
    </div>
  );
}
