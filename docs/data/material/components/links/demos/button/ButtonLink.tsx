import Link from '@mui/material/Link';

export default function ButtonLink() {
  // @focus-start @padding 1
  return (
    <Link
      component="button"
      variant="body2"
      onClick={() => {
        console.info("I'm a button.");
      }}
    >
      Button Link
    </Link>
  );
  // @focus-end
}
