import * as React from 'react';
import PropTypes from 'prop-types';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { CODE_VARIANTS } from 'docs/src/modules/constants';

const CodeVariantContext = React.createContext({
  codeVariant: CODE_VARIANTS.TS,
  setCodeVariant: () => {},
});
if (process.env.NODE_ENV !== 'production') {
  CodeVariantContext.displayName = 'CodeVariant';
}

function useFirstRender() {
  const firstRenderRef = React.useRef(true);
  React.useEffect(() => {
    firstRenderRef.current = false;
  }, []);

  return firstRenderRef.current;
}

export function CodeVariantProvider(props) {
  const { children } = props;

  const [codeVariant, setCodeVariant] = React.useState(CODE_VARIANTS.TS);

  const navigatedCodeVariant = React.useMemo(() => {
    const navigatedCodeVariantMatch =
      typeof window !== 'undefined' ? window.location.hash.match(/\.(js|tsx)$/) : null;

    if (navigatedCodeVariantMatch === null) {
      return undefined;
    }

    return navigatedCodeVariantMatch[1] === 'tsx' ? CODE_VARIANTS.TS : CODE_VARIANTS.JS;
  }, []);

  const persistedCodeVariant = React.useMemo(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }
    return getCookie('codeVariant');
  }, []);
  const isFirstRender = useFirstRender();

  // We initialize from navigation or cookies. on subsequent renders the store is the truth
  const noSsrCodeVariant =
    isFirstRender === true
      ? navigatedCodeVariant || persistedCodeVariant || codeVariant
      : codeVariant;

  React.useEffect(() => {
    if (codeVariant !== noSsrCodeVariant) {
      setCodeVariant(noSsrCodeVariant);
    }
  }, [codeVariant, noSsrCodeVariant]);

  React.useEffect(() => {
    document.cookie = `codeVariant=${codeVariant};path=/;max-age=31536000`;
  }, [codeVariant]);

  const contextValue = React.useMemo(() => {
    return { codeVariant, noSsrCodeVariant, setCodeVariant };
  }, [codeVariant, noSsrCodeVariant]);

  return <CodeVariantContext.Provider value={contextValue}>{children}</CodeVariantContext.Provider>;
}

CodeVariantProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useCodeVariant() {
  return React.useContext(CodeVariantContext).codeVariant;
}

export function useNoSsrCodeVariant() {
  return React.useContext(CodeVariantContext).noSsrCodeVariant;
}

export function useSetCodeVariant() {
  return React.useContext(CodeVariantContext).setCodeVariant;
}
