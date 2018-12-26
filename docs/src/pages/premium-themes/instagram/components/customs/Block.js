import styled from 'react-emotion';

const properties = {
  m: ['margin'],
  mx: ['marginLeft', 'marginRight'],
  my: ['marginTop', 'marginBottom'],
  mt: ['marginTop'],
  mr: ['marginRight'],
  mb: ['marginBottom'],
  ml: ['marginLeft'],
  p: ['padding'],
  px: ['paddingLeft', 'paddingRight'],
  py: ['paddingTop', 'paddingBottom'],
  pt: ['paddingTop'],
  pr: ['paddingRight'],
  pb: ['paddingBottom'],
  pl: ['paddingLeft'],
  maxWidth: ['maxWidth'],
  minWidth: ['minWidth'],
  minHeight: ['minHeight'],
  maxHeight: ['maxHeight'],
  width: ['width'],
  height: ['height'],
  display: ['display'],
  alignItems: ['alignItems'],
  justify: ['justifyContent'],
  justifyContent: ['justifyContent'],
  flexDirection: ['flexDirection'],
  flex: ['flex'],
  background: ['background'],
  backgroundColor: ['backgroundColor'],
};

const isValidProperty = key => !!properties[key];

const mapProperties = (property, value) =>
  // property is one of properties's key
  // value can be anything that valid in css unit
  properties[property].reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: value,
    }),
    {}
  );

const mapPropsToStyles = props => {
  // filter props only m(t, b, l, r) p(t, b, l, r)
  const keys = Object.keys(props);
  const validKeys = keys.filter(isValidProperty);
  // map properties to style
  return validKeys.reduce(
    (prev, curr) => ({ ...prev, ...mapProperties(curr, props[curr]) }),
    {}
  );
};

const Block = styled('div')(mapPropsToStyles);

export default Block;
