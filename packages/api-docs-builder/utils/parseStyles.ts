import * as ttp from 'typescript-to-proptypes';

export interface Styles {
  classes: string[];
  globalClasses: Record<string, string>;
  name: string | null;
  descriptions: Record<string, string>;
}

export default async function parseStyles(
  api: { props?: any; filename: string; name: string },
  program: ttp.ts.Program,
): Promise<Styles> {
  // component has no classes or no props
  // or they're inherited from an external component and we don't want them documented on this component.
  if (api.props?.classes === undefined) {
    return {
      classes: [],
      descriptions: {},
      globalClasses: {},
      name: null,
    };
  }

  const typesFilename = api.filename.replace(/\.js$/, '.d.ts');
  const proptypes = ttp.parseFromProgram(typesFilename, program, {
    shouldResolveObject: ({ name }) => {
      return name === 'classes';
    },
    checkDeclarations: true,
  });

  const component = proptypes.body.find((internalComponent) => {
    return internalComponent.name === api.name;
  });
  if (component === undefined) {
    return {
      classes: [],
      descriptions: {},
      globalClasses: {},
      name: null,
    };
    // TODO: should we throw?
    // throw new TypeError(
    //   `Unable to find declaration of ${api.name} in one of the ${
    //     proptypes.body.length
    //   } components: ${proptypes.body.map(({ name }) => name)}`,
    // );
  }

  const classes = component.types.find((propType) => {
    const isClassesProp = propType.name === 'classes';

    return isClassesProp;
  });

  let classesPropType: ttp.InterfaceType | undefined;
  if (classes?.propType.type === 'InterfaceNode') {
    // classes: {}
    classesPropType = classes.propType;
  } else if (classes?.propType.type === 'UnionNode') {
    // classes?: {}
    classesPropType = classes.propType.types.find((propType): propType is ttp.InterfaceType => {
      return propType.type === 'InterfaceNode';
    });
  }
  if (classesPropType === undefined) {
    return {
      classes: [],
      descriptions: {},
      globalClasses: {},
      name: null,
    };
  }

  return {
    classes: classesPropType.types.map((unionMember) => {
      const [className] = unionMember;
      return className;
    }),
    descriptions: Object.fromEntries(
      classesPropType.types
        .map((unionMember) => {
          const [className, { jsDoc }] = unionMember;

          return [className, jsDoc];
        })
        .filter((descriptionEntry) => {
          return descriptionEntry[1] !== undefined;
        }),
    ),
    globalClasses: {},
    name: null,
  };
}
