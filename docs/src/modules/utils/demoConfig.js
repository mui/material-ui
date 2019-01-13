import { getDependencies } from './helpers';
import { CODE_VARIANTS } from 'docs/src/modules/constants';

function jsDemo(props) {
  return {
    dependencies: getDependencies(props.raw),
    files: {
      'demo.js': props.raw,
      'index.js': `
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './demo';

ReactDOM.render(<Demo />, document.querySelector('#root'));
    `,
    },
  };
}

function hooksDemo(props) {
  return {
    dependencies: {
      ...getDependencies(props.raw),
      'react-dom': 'next',
      '@material-ui/styles': 'latest',
    },
    files: {
      'index.js': `
      import React from 'react';
      import ReactDOM from 'react-dom';
      import Demo from './demo';
      import { createMuiTheme } from "@material-ui/core/styles";
      import { ThemeProvider } from "@material-ui/styles";
      
      const theme = createMuiTheme({ typography: { useNextVariants: true } });
      
      ReactDOM.render(
        <ThemeProvider theme={theme}>
          <Demo />
        </ThemeProvider>,
        document.querySelector("#root")
      );
          `,
    },
  };
}

function tsDemo(props) {
  return {
    dependencies: getDependencies(props.rawTS, 'TS'),
    devDependencies: { 'react-scripts-ts': 'latest' },
    files: {
      'demo.tsx': props.rawTS,
      'index.tsx': `
import React from 'react';
import ReactDOM from 'react-dom';
import Demo from './demo';

ReactDOM.render(<Demo />, document.querySelector('#root'));
    `,
      'tsconfig.json': `{
      "compilerOptions": {
        "module": "esnext",
        "target": "es5",
        "lib": ["es6", "dom"],
        "sourceMap": true,
        "jsx": "react",
        "strict": true,
        "esModuleInterop": true
      }
    }`,
    },
  };
}

function getLanguageConfigFactory(language) {
  switch (language) {
    case CODE_VARIANTS.TS:
      return tsDemo;
    case CODE_VARIANTS.HOOKS:
      return hooksDemo;
    default:
      return jsDemo;
  }
}

export default function getDemo(props, codeLanguage = 'JS') {
  const baseConfig = {
    title: 'Material demo',
    description: props.githubLocation,
    files: {
      'index.html': `
<body>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
  <div id="root"></div>
</body>
      `,
    },
  };
  const languageConfig = getLanguageConfigFactory(codeLanguage)(props);

  return {
    ...baseConfig,
    ...languageConfig,
    files: {
      ...baseConfig.files,
      ...languageConfig.files,
    },
  };
}
