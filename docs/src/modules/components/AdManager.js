import * as React from 'react';
import PropTypes from 'prop-types';

const useEnhancedEffect =
  typeof window !== 'undefined' && process.env.NODE_ENV !== 'test'
    ? React.useLayoutEffect
    : React.useEffect;

export const AdContext = React.createContext();

// Persisted for the whole session.
// The state is used to use different ad placements.
const randomSession1 = Math.random();
const randomSession2 = Math.random();

// Distribution profile:
// 25% body-image
// 25% body-inline
// 25% tocs-bottom-image
// 25% tocs-top-image
export const adPlacement =
  randomSession1 < 0.5 ? 'body' : `tocs-${randomSession1 < 0.75 ? 'top' : 'bottom'}`;

export const adShape = randomSession1 < 0.5 && randomSession2 < 0.5 ? 'inline' : 'image';

export default function AdManager(props) {
  const [portal, setPortal] = React.useState({});

  useEnhancedEffect(() => {
    if (
      adPlacement !== 'body' ||
      typeof IntersectionObserver === 'undefined' ||
      !Array.prototype.findIndex
    ) {
      return undefined;
    }

    const description = document.querySelector('.description');
    setPortal({ placement: 'body-top', element: description });

    const nodes = [description, ...Array.from(document.querySelectorAll('[data-ad="slot"]'))].map(
      (element) => ({
        element,
        offsetTop: element.offsetTop,
      }),
    );

    let lastPosition;

    const selectedNodes = nodes.filter((node, index) => {
      if (index === 0) {
        lastPosition = node.offsetTop;
        return true;
      }

      if (node.offsetTop - lastPosition > window.innerHeight * 4) {
        lastPosition = node.offsetTop;
        return true;
      }
      return false;
    });

    const footer = nodes[nodes.length - 1];

    if (selectedNodes.length > 1 && selectedNodes.indexOf(footer) === -1) {
      selectedNodes[selectedNodes.length - 1] = footer;
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        const element = entries[0].target;
        const index = selectedNodes.findIndex((node) => node.element === element);

        let placement;
        if (index === 0) {
          placement = 'body-top';
        } else if (index === selectedNodes.length - 1) {
          placement = 'body-bottom';
        } else {
          placement = `body-${index}`;
        }

        setPortal({ placement, element });
      }
    });

    selectedNodes.forEach((node, index) => {
      if (index !== 0 && !node.element.style.height) {
        node.element.style.height = '130px';
      }
      observer.observe(node.element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <AdContext.Provider
      value={{
        portal,
      }}
    >
      {props.children}
    </AdContext.Provider>
  );
}

AdManager.propTypes = {
  children: PropTypes.node,
};
