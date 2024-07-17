import Box from '@mui/material/Box';

function getImage(theme, src) {
  return {
    backgroundImage: `url(/static/screenshots/material-ui/getting-started/templates/${src}.jpg)`,
    ...theme.applyStyles('dark', {
      backgroundImage: `url(/static/screenshots/material-ui/getting-started/templates/${src}-dark.jpg)`,
    }),
  };
}

export default function FreeTemplatesBento() {
  return (
    <Box
      sx={{
        position: 'relative',
        height: '72vh',
      }}
    >
      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '100vw',
          height: '100%',
          background: 'var(--muidocs-palette-gradients-radioSubtle)',
        }}
      >
        <Box
          sx={(theme) => ({
            minWidth: '800px',
            width: '100vw',
            maxWidth: '1200px',
            p: 3,
            mx: 'auto',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: '0.36fr 0.14fr 0.36fr 0.14fr',
            gridTemplateRows: '0.45fr 0.1fr 0.45fr',
            gridAutoFlow: 'dense',
            gap: 3,
            '& > div': {
              border: 1,
              borderColor: '#C2E0FF',
              borderRadius: '4px',
              backgroundSize: 'cover',
              boxShadow: '0px 4px 12px 0px #1D1D1D0F, 0px 0px 8px 0px #0000000A',
              ...theme.applyStyles('dark', {
                borderColor: '#1E4976',
                boxShadow: '0px 4px 30px 0px #1D1D1D66, 0px 0px 8px 0px #00000066',
              }),
            },
          })}
        >
          <Box
            sx={(theme) => ({
              gridColumn: '1/3',
              gridRow: '1/3',
              ...getImage(theme, 'landing-page'),
              backgroundPosition: 'center top',
            })}
          ></Box>
          <Box
            sx={(theme) => ({
              ...getImage(theme, 'checkout'),
            })}
          />
          <Box
            sx={(theme) => ({
              ...getImage(theme, 'sign-up'),
              backgroundPosition: 'center top',
            })}
          />
          <Box
            sx={(theme) => ({
              ...getImage(theme, 'landing-page-pricing'),
              backgroundPosition: 'center top',
            })}
          />
          <Box
            sx={(theme) => ({
              ...getImage(theme, 'sign-in-mobile'),
            })}
          />
          <Box
            sx={(theme) => ({
              gridColumn: '3/-1',
              gridRow: '2/-1',
              ...getImage(theme, 'dashboard'),
            })}
          />
        </Box>
      </Box>
    </Box>
  );
}
