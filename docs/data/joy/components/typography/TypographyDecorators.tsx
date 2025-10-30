import Typography from '@mui/joy/Typography';
import Chip from '@mui/joy/Chip';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

export default function TypographyDecorators() {
  return (
    <div>
      <Typography startDecorator={<InfoOutlined />} sx={{ mb: 2 }}>
        The icon automatically adjusts to the scale
      </Typography>
      <Typography
        level="body-lg"
        endDecorator={
          <Chip component="span" size="sm">
            123
          </Chip>
        }
        sx={{ justifyContent: 'center' }}
      >
        The display also changes to flexbox
      </Typography>
    </div>
  );
}
