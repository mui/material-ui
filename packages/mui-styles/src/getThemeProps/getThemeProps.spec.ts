import { getThemeProps, useTheme } from '@mui/styles';

interface ButtonProps {
  color: 'blue' | 'red';
  size: 'small' | 'big';
}

interface TextProps {
  size: number;
}

interface Theme {
  components: {
    Button: { defaultProps: Partial<ButtonProps> & { sigil: string } };
    Text: { defaultProps: Partial<TextProps> };
  };
}

function Text(props: TextProps) {
  const { size } = getThemeProps({ name: 'Text', props });
}

function Button(props: ButtonProps) {
  const { size } = getThemeProps({ name: 'Button', props });
  // @ts-expect-error no theme provided
  const { sigil } = getThemeProps({ name: 'Button', props });
}

function ThemedButton(props: ButtonProps) {
  const theme = useTheme<Theme>();
  // sigil comes from the theme
  const { size, sigil } = getThemeProps({ name: 'Button', props, theme });
}

function Noop(props: {}) {
  const {} = getThemeProps({ name: 'DoesntExist', props });
}
