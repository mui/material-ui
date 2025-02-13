import usePrivateTheme from '@mui/private-theming/useTheme';

export default function useTheme() {
  const privateTheme = usePrivateTheme();
  return privateTheme?.$$material ?? privateTheme;
}
