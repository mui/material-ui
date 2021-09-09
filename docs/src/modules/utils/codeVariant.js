import PropTypes from 'prop-types';
import * as React from 'react';
import { CODE_VARIANTS } from 'docs/src/modules/constants';

const CodeVariantContext = React.createContext({
  codeVariant: CODE_VARIANTS.JS,
  setCodeVariant: () => {},
});
if (process.env.NODE_ENV !== 'production') {
  CodeVariantContext.displayName = 'CodeVariant';
}

export function CodeVariantProvider(props) {
  const { children } = props;

  const [codeVariant, setCodeVariant] = React.useState('JS');

  const contextValue = React.useMemo(() => {
    return { codeVariant, setCodeVariant };
  }, [codeVariant]);

  return <CodeVariantContext.Provider value={contextValue}>{children}</CodeVariantContext.Provider>;
}

CodeVariantProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCodeVariant() {
  return React.useContext(CodeVariantContext).codeVariant;
}

export function useSetCodeVariant() {
  return React.useContext(CodeVariantContext).setCodeVariant;
}
