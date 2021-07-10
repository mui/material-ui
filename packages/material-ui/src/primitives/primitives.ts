import { createPrimitiveStyled, StyledPrimitive } from '@material-ui/system';
import { Theme } from '../styles/createTheme';
import defaultTheme from '../styles/defaultTheme';

type Mui = {
  [Key in keyof JSX.IntrinsicElements]: StyledPrimitive<Key, Theme>;
};

const generatePrimitives = () => {
  const styled = createPrimitiveStyled(defaultTheme);
  const mui = {};

  styled.htmlTags.forEach((tag) => {
    // @ts-ignore
    mui[tag] = styled(tag)();
  });

  return mui as Mui;
};

const mui = generatePrimitives();

export default mui;
