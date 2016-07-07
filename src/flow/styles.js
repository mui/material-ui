type Breakpoints = {  // eslint-disable-line no-unused-vars
  keys: Array<string>,
  values: Array<number>,
  up: (name:string) => string,
  down: (name:string) => ?string,
  only: (name:string) => string,
  getWidth: (name:string) => number,
}

type Mixins = { // eslint-disable-line no-unused-vars
  gutters: (styles:Object) => Object
}

type TypeScheme = {
  fontSize: number,
  fontWeight: number,
  fontFamily: string,
  textTransform?: string,
  color?: string,
}

type Typography = { // eslint-disable-line no-unused-vars
  display4: TypeScheme,
  display3: TypeScheme,
  display2: TypeScheme,
  display1: TypeScheme,
  headline: TypeScheme,
  title: TypeScheme,
  subheading: TypeScheme,
  body2: TypeScheme,
  body1: TypeScheme,
  caption: TypeScheme,
  button: TypeScheme,
}
