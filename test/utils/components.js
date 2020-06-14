import * as React from 'react';
import * as ReactDOM from 'react-dom';

const DocumentContext = React.createContext(null);
export function useDocument() {
  return React.useContext(DocumentContext);
}

// react requires some more work to get <iframe>{children}</iframe> working
// see "DemoFrame" in our docs for a documented implementation
export function IFrame(props) {
  if (/jsdom/.test(window.navigator.userAgent)) {
    // TODO: Crashes with "NotFoundError: The node to be removed is not a child of this node." in cleanup
    // Unknown why.
    // Since a browser test gives us more confidence anyway.
    console.warn('IFrame is not supported in JSDOm');
  }

  const { children } = props;
  const frameRef = React.useRef(null);
  const [iframeLoaded, onLoad] = React.useReducer(() => true, false);

  React.useEffect(() => {
    const document = frameRef.current.contentDocument;

    if (document != null && document.readyState === 'complete' && !iframeLoaded) {
      onLoad();
    }
  }, [iframeLoaded]);

  const document = frameRef.current?.contentDocument;
  return (
    <React.Fragment>
      <iframe onLoad={onLoad} ref={frameRef} />
      {iframeLoaded !== false
        ? ReactDOM.createPortal(
            <DocumentContext.Provider value={document}>{children}</DocumentContext.Provider>,
            document.body,
          )
        : null}
    </React.Fragment>
  );
}
