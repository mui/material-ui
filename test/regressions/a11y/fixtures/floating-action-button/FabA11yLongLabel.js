import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

const textSpacing = { lineHeight: 1.5, letterSpacing: '0.12em', wordSpacing: '0.16em' };

// The extended Fab has a fixed height, so a label that wraps spills out of it.
// The screenshot records this known gap (1.4.4, 1.4.10, 1.4.12). The second
// group also applies the WCAG text-spacing values.
export default function FabA11yLongLabel() {
  return (
    <Stack direction="row" spacing={4}>
      {[{}, textSpacing].map((sx, index) => (
        <Stack key={index} spacing={2} sx={{ width: 200, alignItems: 'flex-start' }}>
          <Fab variant="extended" color="primary" sx={sx}>
            <EditIcon sx={{ mr: 1 }} />
            Compose a new message to the whole team
          </Fab>
          <Fab variant="extended" size="medium" color="secondary" sx={sx}>
            Review the accessibility settings of this page
          </Fab>
          <Fab variant="extended" size="small" color="success" sx={sx}>
            Review the accessibility settings
          </Fab>
        </Stack>
      ))}
    </Stack>
  );
}
