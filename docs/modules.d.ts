declare module '*?raw' {
  const raw: string;
  export default raw;
}

declare module '*?@mui/markdown' {
  import { Docs, Demos, DemoComponents, SrcComponents } from '@mui/markdown';

  export const docs: Docs;
  export const demos: Demos;
  export const demoComponents: DemoComponents;
  export const srcComponents: SrcComponents;
}
