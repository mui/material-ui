// @TODO - Implement correct style definitions

type HTMLElements = keyof JSX.IntrinsicElements;
interface StyledFn {
  (...args: any[]): any;
}
type StyledIndex = {
  [key in HTMLElements]: (...args: any[]) => any;
};

type Styled = StyledFn & StyledIndex;

declare const styled: Styled;

export default styled;
