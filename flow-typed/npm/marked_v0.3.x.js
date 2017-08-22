// flow-typed signature: c2bec7cd5128630b7dfee2f1a66a4782
// flow-typed version: f111325994/marked_v0.3.x/flow_>=v0.28.x

type marked$AlignFlag = 'left' | 'right' | 'center'

type marked$NodeCallback<T> = (e: ?Error, d: ?T) => void

class marked$Renderer {
  // constructor: (o?: marked$MarkedOptions) => marked$Renderer // rosskevin: https://github.com/flowtype/flow-typed/issues/1165
  options: marked$MarkedOptions;
  code: (c: string, l: string) => string;
  blockquote: (q: string) => string;
  html: (h: string) => string;
  heading: (t: string, l: number) => string;
  hr: () => string;
  list: (b: string, o: boolean) => string;
  listitem: (t: string) => string;
  paragraph: (t: string) => string;
  table: (h: string, b: string) => string;
  tablerow: (c: string) => string;
  tablecell: (c: string, f: ?marked$AlignFlag) => string;
  heading: (t: string, l: number) => string;
  strong: (t: string) => string;
  em: (t: string) => string;
  codespan: (c: string) => string;
  br: () => string;
  del: (t: string) => string;
  link: (h: string, ti: string, te: string) => string;
  image: (h: string, ti: string, te: string) => string;
  text: (t: string) => string;
}

type marked$HighlightFunction =
  ((c: string, l: string, cb: marked$NodeCallback<string>) => void)
  | ((c: string, cb: marked$NodeCallback<string>) => void)
  | ((c: string, l?: string) => string)

type marked$MarkedOptions = {
  highlight?: marked$HighlightFunction;
  renderer?: marked$Renderer;
  gfm?: boolean;
  tables?: boolean;
  breaks?: boolean;
  pedantic?: boolean;
  sanitize?: boolean;
  smartLists?: boolean;
  smartypants?: boolean;
}

/*
 * marked$Tokens
 */

type marked$Space = { type: 'space'; }
type marked$Code = { type: 'code'; text: string; lang?: string; }
type marked$Heading = { type: 'heading'; depth: number; text: string; }
type marked$Table = { type: 'table'; header: string; align: Array<marked$AlignFlag> ; cells: Array<Array<string>> }
type marked$Hr = { type: 'hr'; }
type marked$BlockquoteStart = { type: 'blockquote_start' }
type marked$BlockquoteEnd = { type: 'blockquote_end' }
type marked$ListStart = { type: 'list_start' }
type marked$ListEnd = { type: 'list_end' }
type marked$Paragraph = { type: 'paragraph'; pre: boolean; text: string; }
type marked$Html = { type: 'paragraph'; pre: boolean; text: string; }
type marked$Text = { type: 'text'; text: string; }

type marked$Token =
  marked$Space
  | marked$Code
  | marked$Heading
  | marked$Table
  | marked$Hr
  | marked$BlockquoteStart
  | marked$BlockquoteEnd
  | marked$ListStart
  | marked$ListEnd
  | marked$Paragraph
  | marked$Html
  | marked$Text

type marked$Link = {
  title: ?string;
  href: string;
}

type marked$Tokens = { links: Array<marked$Link> } & Array<marked$Token>;

type marked$NoopRule = {
  (i: mixed): void;
  exec: (i: mixed) => void;
}

type marked$Rule = RegExp | marked$NoopRule

type marked$lex = (t: string) => marked$Tokens;

class marked$Lexer {
  static lexer: (t: string, o?: marked$MarkedOptions) => marked$Tokens;
  static rules: { [key: string]: marked$Rule };
  rules: { [key: string]: marked$Rule };
  // constructor: (o?: marked$MarkedOptions) => marked$Lexer; // rosskevin: https://github.com/flowtype/flow-typed/issues/1165
  lex: marked$lex;
  tokens: marked$Tokens;
  options: marked$MarkedOptions;
}

class marked$Parser {
  static parse: (t: marked$Tokens, o?: marked$MarkedOptions) => string;
  //  constructor: (o?: marked$MarkedOptions) => marked$Parser; // rosskevin: https://github.com/flowtype/flow-typed/issues/1165
  parse: (t: marked$Tokens) => string;
  next: () => marked$Token;
  peek: () => marked$Token;
  parsemarked$Text: () => string;
  tok: () => string;
  tokens: marked$Tokens;
  token: ?marked$Token;
  options: marked$MarkedOptions;
  renderer: marked$Renderer;
}

class marked$InlineLexer {
  static rules: Array<marked$Rule>;
  static output: (s: string, l: Array<marked$Link>, o?: marked$MarkedOptions) => string;
  //  constructor: (l: Array<marked$Link>, o?: marked$MarkedOptions) => marked$InlineLexer; // rosskevin: https://github.com/flowtype/flow-typed/issues/1165
  output: (s: string) => string;
  outputmarked$Link: (c: Array<string>, l: marked$Link) => string;
  smartypants: (t: string) => string;
  mangle: (t: string) => string;
  options: marked$MarkedOptions;
  links: Array<marked$Link>;
  rules: Array<marked$Rule>;
  renderer: marked$Renderer;
}

type marked$Marked = {
  (md: string, o: marked$MarkedOptions, cb: marked$NodeCallback<string>): void;
  (md: string, cb: marked$NodeCallback<string>): void;
  (md: string, o?: marked$MarkedOptions): string;
  setOptions: (o: marked$MarkedOptions) => void;
  defaults: marked$MarkedOptions;
  Parser: typeof marked$Parser;
  parser: typeof marked$Parser.parse;
  Lexer: typeof marked$Lexer;
  lexer: typeof marked$Lexer.lexer;
  InlineLexer: typeof marked$InlineLexer;
  inlinelexer: marked$InlineLexer.output;
  Renderer: typeof marked$Renderer;
  parse: marked$Marked;
}


declare module marked {
  declare export default marked$Marked;
}

