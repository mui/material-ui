export default function useThemeProps<Props>(params: {
  theme: Record<string, any>;
  props: Props;
  name: string;
}): Props;
