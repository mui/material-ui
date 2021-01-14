type Component = (arg: any) => any & { propTypes?: object };

export default function requirePropFactory(componentNameInError: string, Component?: Component): any;
