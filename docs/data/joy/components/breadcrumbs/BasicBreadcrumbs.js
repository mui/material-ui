import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

export default function BasicBreadcrumbs() {
  return (
    <Breadcrumbs aria-label="breadcrumbs">
      {['Home', 'TV Shows', 'Futurama', 'Characters'].map((item) => (
        <Link key={item} color="neutral" href="#basics">
          {item}
        </Link>
      ))}
      <Typography>Dr. Zoidberg</Typography>
    </Breadcrumbs>
  );
}
