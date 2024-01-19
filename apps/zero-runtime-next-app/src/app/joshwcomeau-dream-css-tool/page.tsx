/* eslint-disable jsx-a11y/anchor-is-valid */
// @mui/zero-runtime is a WIP name, will have its own namespace.
import { styled } from '@mui/zero-runtime';

const Wrapper = styled.section({
  display: 'flex',
  justifyContent: 'center',
  color: 'var(--color)',
});

function Demo1({ width }: { width: number }) {
  return (
    <Wrapper style={{ '--color': width > 500 ? 'red' : undefined }}>
      Hello world
    </Wrapper>
  );
}

const Quote = styled.blockquote({
  fontStyle: 'italic',
});

const Link = styled.a({
  /* Default styles */
  color: 'var(--color-primary)',

  /* Styles when Link is inside Quote: */
  [`.${Quote} &`]: {
    color: 'inherit',
  }
});

export default function Home() {
  return (
    <div>
      <Demo1 width={600} />
      <Link style={{ '--color-primary': 'red' }}>
        Link
      </Link>
      <Quote>
        quote
        <Link style={{ '--color-primary': 'red' }}>
          Link
        </Link>
      </Quote>
    </div>
  )
}
