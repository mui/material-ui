import Image from 'next/image';
import { styled } from '@mui/zero-runtime';
import Link from 'next/link';
import styles from './page.module.css';
import Grid from '../components/Grid';

export const Main = styled('main')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6rem',
  minHeight: '100vh',
});

const Description = styled.div(({ theme }: any) => ({
  display: 'inherit',
  justifyContent: 'inherit',
  alignItems: 'inherit',
  fontSize: '0.85rem',
  maxWidth: 'var(--max-width)',
  width: '100%',
  zIndex: 2,
  fontFamily: theme.typography.fontFamilyCode,
  '& a': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
  },
  '& p': {
    position: 'relative',
    margin: '0',
    padding: '1rem',
    backgroundColor: 'rgba(var(--callout-rgb), 0.5)',
    border: '1px solid rgba(var(--callout-border-rgb), 0.3)',
    borderRadius: 'var(--border-radius)',
  },

  [theme.breakpoints.down(700.05)]: {
    fontSize: '0.8rem',
    '& a': {
      padding: '1rem',
    },
    '& p': {
      alignItems: 'center',
      inset: '0 0 auto',
      padding: '2rem 1rem 1.4rem',
      borderRadius: '0',
      border: 'none',
      borderBottom: '1px solid rgba(var(--callout-border-rgb), 0.25)',
      background:
        'linear-gradient(to bottom,rgba(var(--background-start-rgb), 1),rgba(var(--callout-rgb), 0.5))',
      backgroundClip: 'padding-box',
      backdropFilter: 'blur(24px)',
    },
    '& div': {
      alignItems: 'flex-end',
      pointerEvents: 'none',
      inset: 'auto 0 0',
      padding: '2rem',
      height: '200px',
      background: 'linear-gradient(to bottom,transparent 0%,rgb(var(--background-end-rgb)) 40%)',
      zIndex: 1,
    },
    '& p, & div': {
      display: 'flex',
      justifyContent: 'center',
      position: 'fixed',
      width: '100%',
    },
  },
}));

const Code = styled('code')(({ theme }: any) => ({
  fontWeight: 700,
  fontFamily: theme.typography.fontFamilyCode,
}));

const Card = styled('a')(({ theme }: any) => ({
  padding: '1rem 1.2rem',
  borderRadius: 'var(--border-radius)',
  background: 'rgba(var(--card-rgb), 0)',
  border: '1px solid rgba(var(--card-border-rgb), 0)',
  transition: 'background 200ms, border 200ms',

  '& span': {
    display: 'inline-block',
    transition: 'transform 200ms',
  },

  '& h2': {
    fontWeight: 600,
    marginBottom: '0.7rem',
  },

  '& p': {
    margin: '0',
    opacity: 0.6,
    fontSize: '0.9rem',
    lineHeight: 1.5,
    maxWidth: '30ch',
  },
  '@media (hover: hover) and (pointer: fine)': {
    '&:hover': {
      background: 'rgba(var(--card-rgb), 0.1)',
      border: '1px solid rgba(var(--card-border-rgb), 0.15)',
    },
    '&:hover span': {
      transform: 'translateX(4px)',
    },
  },

  '@media (prefers-reduced-motion)': {
    '&:hover span': {
      transform: 'none',
    },
  },

  [theme.breakpoints.down(700.05)]: {
    padding: '1rem 2.5rem',

    '& h2': {
      marginBottom: '0.5rem',
    },
  },
}));

const Center = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  padding: '4rem 0',
  '&::before': {
    background: 'var(--secondary-glow)',
    borderRadius: '50%',
    width: '480px',
    height: '360px',
    marginLeft: '-400px',
  },
  '&::after': {
    background: 'var(--primary-glow)',
    width: '240px',
    height: '180px',
    zIndex: -1,
  },
  '&::before,&::after': {
    content: "''",
    left: '50%',
    position: 'absolute',
    filter: 'blur(45px)',
    transform: 'translateZ(0)',
  },
  '@media (max-width: 700px)': {
    padding: '8rem 0 6rem',
    '&::before': { transform: 'none', height: '300px' },
  },
}));

export default function Home() {
  return (
    <Main>
      <Description>
        <p>
          Get started by editing&nbsp;
          <Code>src/app/page.tsx</Code>
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </Description>

      <Center>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </Center>

      <Grid>
        <Card
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </Card>

        <Card
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </Card>

        <Card
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </Card>

        <Card as={Link} href="/slider" rel="noopener noreferrer">
          <h2>
            Checkout Slider <span>-&gt;</span>
          </h2>
        </Card>
      </Grid>
    </Main>
  );
}
