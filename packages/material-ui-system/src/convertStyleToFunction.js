const convertStyleToFunction = (key, systemStyle) => {
  return ({ theme, ...props }) => {
    const value = props[key];
    if (value) {
      return systemStyle(value, theme) 
    }
    return {}
  }
}

export default convertStyleToFunction;