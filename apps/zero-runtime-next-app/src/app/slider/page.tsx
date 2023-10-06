import { styled } from '@mui/zero-runtime';
import { Main as BaseMain } from '../page';
import SliderWrapper from '../../components/SliderWrapper';

const Main = styled(BaseMain)({
  padding: '1rem',
});

export default function Slider() {
  return (
    <Main sx={{ padding: '2rem' }}>
      <div style={{ width: '100%' }}>
        <SliderWrapper />
      </div>
    </Main>
  );
}
