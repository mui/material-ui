import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
// import IconButton from '@mui/joy/IconButton';
// import Typography from '@mui/joy/Typography';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Moon from '@mui/icons-material/DarkMode';
import Sun from '@mui/icons-material/LightMode';
// import Add from '@mui/icons-material/Add';
// import DeleteForever from '@mui/icons-material/DeleteForeverOutlined';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
// import ThumbUp from '@mui/icons-material/ThumbUp';
// import ArrowDropDown from '@mui/icons-material/ArrowDropDown';

const ColorSchemePicker = () => {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button
      variant="soft"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
      sx={{ minWidth: 'var(--Button-minHeight)' }}
    >
      {mode === 'light' ? <Moon /> : <Sun />}
    </Button>
  );
};

export default function JoyButton() {
  // const buttonProps = {
  //   variant: ['plain', 'outlined', 'soft', 'solid'],
  //   color: ['primary', 'neutral', 'danger', 'info', 'success', 'warning'],
  //   size: ['sm', 'md', 'lg'],
  // } as const;
  return (
    <CssVarsProvider>
      <Box sx={{ py: 5, maxWidth: { md: 1152, xl: 1536 }, mx: 'auto' }}>
        <Box sx={{ p: 1 }}>
          <ColorSchemePicker />
        </Box>
        {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
          {Object.entries(buttonProps).map(([propName, propValue]) => (
            <Box
              key={propName}
              sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
            >
              <Typography level="body2" sx={{ fontWeight: 'bold' }}>
                {propName}
              </Typography>
              {propValue.map((value) => (
                <Box key={value}>
                  <Button {...{ [propName]: value }}>Button</Button>
                  <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                    {value || 'default'}
                  </Typography>
                </Box>
              ))}
            </Box>
          ))}
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
          >
            <Typography level="body2" sx={{ fontWeight: 'bold' }}>
              icon
            </Typography>
            <Box>
              <IconButton>
                <Add />
              </IconButton>
              <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                40x40
              </Typography>
            </Box>
            <Box>
              <IconButton variant="outlined" size="sm" color="danger">
                <DeleteForever />
              </IconButton>
              <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                32x32
              </Typography>
            </Box>
            <Box>
              <IconButton variant="solid" size="lg" color="success">
                <ThumbUp />
              </IconButton>
              <Typography level="body3" sx={{ textAlign: 'center', mt: '4px' }}>
                48x48
              </Typography>
            </Box>
            <IconButton variant="solid" size="lg" color="success">
              <ThumbUp fontSize="xl4" />
            </IconButton>
            <IconButton variant="outlined" sx={{ borderRadius: 'var(--IconButton-size)' }}>
              <Add />
            </IconButton>
          </Box>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', gap: 5, p: 2, alignItems: 'center' }}
          >
            <Typography level="body2" sx={{ fontWeight: 'bold' }}>
              start & end icon
            </Typography>
            <Button
              variant="solid"
              color="success"
              endIcon={<KeyboardArrowDown fontSize="lg" />}
              sx={{ '--Button-paddingInline': '0.5rem' }}
              // sx={{ px: '0.5rem' }} // should not use `px` because endIcon will have mismatch position
            >
              <ThumbUp />
            </Button>
            <Button variant="solid" startIcon={<ThumbUp />} size="sm">
              Add to cart
            </Button>
            <Button variant="outlined" startIcon={<Add />} size="sm">
              Add to cart
            </Button>
            <Button variant="solid" startIcon={<Add />}>
              Add to cart
            </Button>
            <Button variant="solid" startIcon={<Add />} size="lg">
              Add to cart
            </Button>
            <Button variant="outlined" endIcon={<KeyboardArrowRight />} color="success">
              Checkout
            </Button>
            <Button
              size="sm"
              variant="outlined"
              color="neutral"
              endIcon={<ArrowDropDown />}
              sx={{ '--Icon-color': (theme) => theme.vars.palette.primary[500] }}
            >
              10
            </Button>
          </Box>
        </Box> */}
        {/* Danilo's not smart iteration below 😅 - wanted to see each color with every variant. */}
        <Box sx={{ display: 'flex', py: 5 }}>
          <Box sx={{ width: '100px', display: 'grid', gap: 2, mr: 4 }}>
            <Button variant="solid" color="primary">
              Button
            </Button>
            <Button variant="solid" color="neutral">
              Button
            </Button>
            <Button variant="solid" color="danger">
              Button
            </Button>
            <Button variant="solid" color="info">
              Button
            </Button>
            <Button variant="solid" color="success">
              Button
            </Button>
            <Button variant="solid" color="warning">
              Button
            </Button>
          </Box>
          <Box sx={{ width: '100px', display: 'grid', gap: 2, mr: 4 }}>
            <Button variant="outlined" color="primary">
              Button
            </Button>
            <Button variant="outlined" color="neutral">
              Button
            </Button>
            <Button variant="outlined" color="danger">
              Button
            </Button>
            <Button variant="outlined" color="info">
              Button
            </Button>
            <Button variant="outlined" color="success">
              Button
            </Button>
            <Button variant="outlined" color="warning">
              Button
            </Button>
          </Box>
          <Box sx={{ width: '100px', display: 'grid', gap: 2, mr: 4 }}>
            <Button variant="soft" color="primary">
              Button
            </Button>
            <Button variant="soft" color="neutral">
              Button
            </Button>
            <Button variant="soft" color="danger">
              Button
            </Button>
            <Button variant="soft" color="info">
              Button
            </Button>
            <Button variant="soft" color="success">
              Button
            </Button>
            <Button variant="soft" color="warning">
              Button
            </Button>
          </Box>
          <Box sx={{ width: '100px', display: 'grid', gap: 2, mr: 4 }}>
            <Button variant="plain" color="primary">
              Button
            </Button>
            <Button variant="plain" color="neutral">
              Button
            </Button>
            <Button variant="plain" color="danger">
              Button
            </Button>
            <Button variant="plain" color="info">
              Button
            </Button>
            <Button variant="plain" color="success">
              Button
            </Button>
            <Button variant="plain" color="warning">
              Button
            </Button>
          </Box>
          <Box
            sx={{
              width: '100px',
              display: 'grid',
              gap: 2,
              mr: 4,
              pl: 4,
              borderLeft: '1px solid',
            }}
          >
            <Button variant="solid" color="primary" disabled>
              Button
            </Button>
            <Button variant="solid" color="neutral" disabled>
              Button
            </Button>
            <Button variant="solid" color="danger" disabled>
              Button
            </Button>
            <Button variant="solid" color="info" disabled>
              Button
            </Button>
            <Button variant="solid" color="success" disabled>
              Button
            </Button>
            <Button variant="solid" color="warning" disabled>
              Button
            </Button>
          </Box>
          <Box sx={{ width: '100px', display: 'grid', gap: 2, mr: 4 }}>
            <Button variant="outlined" color="primary" disabled>
              Button
            </Button>
            <Button variant="outlined" color="neutral" disabled>
              Button
            </Button>
            <Button variant="outlined" color="danger" disabled>
              Button
            </Button>
            <Button variant="outlined" color="info" disabled>
              Button
            </Button>
            <Button variant="outlined" color="success" disabled>
              Button
            </Button>
            <Button variant="outlined" color="warning" disabled>
              Button
            </Button>
          </Box>
          <Box sx={{ width: '100px', display: 'grid', gap: 2, mr: 4 }}>
            <Button variant="soft" color="primary" disabled>
              Button
            </Button>
            <Button variant="soft" color="neutral" disabled>
              Button
            </Button>
            <Button variant="soft" color="danger" disabled>
              Button
            </Button>
            <Button variant="soft" color="info" disabled>
              Button
            </Button>
            <Button variant="soft" color="success" disabled>
              Button
            </Button>
            <Button variant="soft" color="warning" disabled>
              Button
            </Button>
          </Box>
          <Box sx={{ width: '100px', display: 'grid', gap: 2, mr: 4 }}>
            <Button variant="plain" color="primary" disabled>
              Button
            </Button>
            <Button variant="plain" color="neutral" disabled>
              Button
            </Button>
            <Button variant="plain" color="danger" disabled>
              Button
            </Button>
            <Button variant="plain" color="info" disabled>
              Button
            </Button>
            <Button variant="plain" color="success" disabled>
              Button
            </Button>
            <Button variant="plain" color="warning" disabled>
              Button
            </Button>
          </Box>

          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-primary-900)',
              }}
            />
          </Box>
          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-info-900)',
              }}
            />
          </Box>
          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-neutral-900)',
              }}
            />
          </Box>
          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-danger-900)',
              }}
            />
          </Box>
          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-success-900)',
              }}
            />
          </Box>
          <Box sx={{ width: '100px', display: 'grid' }}>
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-50)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-100)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-200)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-300)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-400)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-500)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-600)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-700)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-800)',
              }}
            />
            <Box
              sx={{
                width: '50px',
                backgroundColor: 'var(--joy-palette-warning-900)',
              }}
            />
          </Box>
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
