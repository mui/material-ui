// @flow weak

// flow sanity check (DO NOT DELETE) https://flow.org/try/#0JYWwDg9gTgLgBAJQKYEMDG8BmUIjgcilQ3wG4AoUSWOGATzCTgG84BhXSAOyS5gBUGTAL5xsuAkXQwy5OQHp5cALSq16jZuVwdccorgB3YDAAW-U0hBMAEgHk25JAA9qWAK5cMwCFyMnzS2sAHgAFHDAAZwAuFmEAPgAKcl12Tl9eGFiOcAy+QUZg1jMrJFi7ACMAKyQMABo4ADpmgBIAUWdpMIjI+LgEuvIASmz0nnyhbogovuY5HTQAGxRIyLgAdQCLUrgXGF4AEzXkaUac7kypqIbioLK4SpqMftmU3SIuA6QoRKGWN9SRBg7igfmC5zy8GYzUaZmAkUaYB6ohK1gAvMw4QjIjAUPtYXdRPJ4hRUsJSf03kCQX5NmZttZyMIFEotGz2Wp9EpjPS7nAAKqRFAAcyQ5CWKzWAEFds59p9jsQYGcxpdbqVytVavBRAAyFgoWJcdwgCrfBoVI0ms1QBJxcW+HFwBlIA4Q8bwNH+XmlRJSoYUAzrJgHXz4eA8V20CBwMCSuDAPwAA1RSCTuwAbrxaKYIO5haY4EmALJ0d2ZdNEACO7mARDWJka5GCLrdqr4cBQGIAjKIKhiAExE+IslQc8epLne0ybA5mOD2RwuNy0IRwABCUgA1pBE56CM5Ivg4AAfAiREDHs-4EAHK8ERbC+-4ZyLWTkeiMDbAOemcLTNYvTmHRExMYAUEWWczAAfliTdUB3CA90GHRjF-WCN23Xc+EGZknFcaAPC8GAfD8HkZx-Mxfn+HRME8bxfF2LhTBQLwkCuGJv1-f8ZmSVIdHLPhRlyD0CnY5g0LMOCsKQnCmmaHjIgGN4RjSETMjEjjXgBOAJVWb8zCgws9kORVTkEmAtJo-iPi+H4-mA-iFkdKFQJIiCjIaSTTFEL0sURHodMBJBgVBOBwXbKEYX8pEANEbyMXwC98GHCkyTSykdOpMK6Qo38KXJeY4GyvxeBYtiKDwgxxxq9Qp3cIVRXFZZ9PXWV5SORAlRVdS+CKbzpIQ7CYAaQ04GNU1zUtcbrW+O1HNs75qMc5yuCdCTKJ8uA-NMeEAoArKQppcKDmADM4GJN5mWZNAXK4ko216-dyKM35EnXAMp2DOBQy4cNxqQKMYBjON9MTItvPTJAsz8Mw8wLItSwsyskBrOskAbZVmyM10LM7Hs+0HVKgA
import React from 'react';
import type { ComponentType } from 'react';
import createEagerFactory from 'recompose/createEagerFactory';
import wrapDisplayName from 'recompose/wrapDisplayName';
import createMuiTheme from './createMuiTheme';
import themeListener from './themeListener';

let defaultTheme;

function getDefaultTheme() {
  if (defaultTheme) {
    return defaultTheme;
  }

  defaultTheme = createMuiTheme();
  return defaultTheme;
}

type InjectedProps = { theme: Object };

// Provide the theme object as a property to the input component.
export default function withTheme<Props: {}>(
  Component: ComponentType<InjectedProps & Props>,
): ComponentType<Props> {
  const factory = createEagerFactory(Component);

  class WithTheme extends React.Component<Props, { theme: Object }> {
    static contextTypes = themeListener.contextTypes;
    static displayName = wrapDisplayName(Component, 'withTheme');

    // Exposed for test purposes.
    static Naked = Component;

    constructor(props, context) {
      super(props, context);
      this.state = {
        // We use || as it's lazy evaluated.
        theme: themeListener.initial(context) || getDefaultTheme(),
      };
    }

    state = {};

    componentDidMount() {
      this.unsubscribeId = themeListener.subscribe(this.context, theme => {
        this.setState({ theme });
      });
    }

    componentWillUnmount() {
      if (this.unsubscribeId !== null) {
        themeListener.unsubscribe(this.context, this.unsubscribeId);
      }
    }

    unsubscribeId = null;

    render() {
      return factory({ theme: this.state.theme, ...this.props });
    }
  }

  return WithTheme;
}
