// specific types for better readability and reusability
type ButtonProps = React.JSX.IntrinsicElements['button'] & {
  isRed?: boolean; 
  sx?: React.CSSProperties; // React.CSSProperties for better integration with CSS in JS
};

export const bounceAnim: string;
export const Button: React.ComponentType<ButtonProps>;

