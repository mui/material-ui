interface UseThemeProps {
  <Props>(params: { theme: Record<string, any>; props: Props; name: string }): Props;
}

export default function createUseThemeProps(theme: any): UseThemeProps;
