import Box from '@mui/material/Box';
import NumberField from '@mui/material/NumberField';

export default function NumberFieldControlPositions() {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
      {/* @focus-start */}
      {(['outlined', 'filled', 'standard'] as const).map((variant) => (
        <Box
          key={variant}
          role="group"
          aria-label={variant}
          sx={{
            display: 'grid',
            gridAutoRows: '1fr',
            alignItems: 'center',
            gap: 3,
            width: '25ch',
            maxWidth: '100%',
          }}
        >
          <NumberField
            label="End"
            variant={variant}
            controlsPosition="end"
            defaultValue={5}
          />
          <NumberField
            label="Split"
            variant={variant}
            controlsPosition="split"
            defaultValue={5}
          />
          <NumberField
            label="Stacked"
            variant={variant}
            controlsPosition="stacked"
            defaultValue={5}
          />
          <NumberField
            label="None"
            variant={variant}
            controlsPosition={false}
            defaultValue={5}
          />
        </Box>
      ))}
      {/* @focus-end */}
    </Box>
  );
}
