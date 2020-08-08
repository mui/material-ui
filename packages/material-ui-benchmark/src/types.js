import Benchmark from 'benchmark';
import React from 'react';
import * as ts from 'typescript';

// not sure typescript should be defined again in the benchmark's package.json (if this is published)
// or if its alright to just implicitly use the workspace version
const suite = new Benchmark.Suite('system', {
  onError: (event) => {
    console.log(event.target.error);
  }
});
Benchmark.options.minSamples = 10;

// https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API
function compile(fileNames, options) {
  const host = ts.createCompilerHost(options);
  host.writeFile = () => { }; // writeFile is a noop for us, since we just care about execution time
  let program = ts.createProgram(fileNames, options, host);
  let emitResult = program.emit();

  let allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  allDiagnostics.forEach(diagnostic => {
    if (diagnostic.file) {
      let { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      let message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
      console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
    } else {
      console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
    }
  });
  if (emitResult.emitSkipped) {
    process.exit(1);
  }
}
const compilerOptions = {
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS,
  esModuleInterop: true,
  jsx: 'react',
  module: "commonjs",
  lib: ["lib", "lib.dom.d.ts"],
  skipLibCheck: true,
  baseUrl: ".",
  paths: {
    "@material-ui/core/*": ["node_modules/@material-ui/core/build/*"],
    "@material-ui/styles/*": ["node_modules/@material-ui/styles/build/*"],
    "@material-ui/core": ["node_modules/@material-ui/core/build"]
  }
}


suite
  .add('div.classname', () => {
    compile([__dirname + '/types/divClassname.tsx'], compilerOptions);
  })
  .add('typography.classname', () => {
    compile([__dirname + '/types/typographyClassname.tsx'], compilerOptions);
  })
  // .add('typography.classname.component', () => {
  //   compile([__dirname + '/types/typographyClassnameComponent.tsx'], compilerOptions);
  // })
  .add('box.classname', () => {
    compile([__dirname + '/types/boxClassname.tsx'], compilerOptions);
  })
  .add('grid.classname', () => {
    compile([__dirname + '/types/gridClassname.tsx'], compilerOptions);
  })
  .add('card.classname', () => {
    compile([__dirname + '/types/cardClassname.tsx'], compilerOptions);
  })
  .add('div.style', () => {
    compile([__dirname + '/types/typographyStyle.tsx'], compilerOptions);
  })
  .add('typography.style', () => {
    compile([__dirname + '/types/typographyStyle.tsx'], compilerOptions);
  })
  .add('div.themed', () => {
    compile([__dirname + '/types/divThemed.tsx'], compilerOptions);
  })
  .add('typography.themed', () => {
    compile([__dirname + '/types/typographyThemed.tsx'], compilerOptions);
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .run();
