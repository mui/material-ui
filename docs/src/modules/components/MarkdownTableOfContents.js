import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import textToHash from 'docs/src/modules/utils/textToHash';
import ScrollableTableOfContents from 'docs/src/modules/components/ScrollableTableOfContents';

const renderer = new marked.Renderer();

function setRenderer(itemsCollector, unique) {
  renderer.heading = (text2, level) => {
    const text = text2
      .replace(
        /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        '',
      ) // remove emojis
      .replace(/<\/?[^>]+(>|$)/g, ''); // remove HTML

    if (level === 2) {
      itemsCollector.current.push({
        text,
        level,
        hash: textToHash(text, unique),
        children: [],
      });
    } else if (level === 3) {
      if (!itemsCollector.current[itemsCollector.current.length - 1]) {
        throw new Error(`Missing parent level for: ${text}`);
      }

      itemsCollector.current[itemsCollector.current.length - 1].children.push({
        text,
        level,
        hash: textToHash(text, unique),
      });
    }
  };
}

function getItemsServer(contents, itemsCollector) {
  marked(contents.join(''), { renderer });
  return itemsCollector.current;
}

function getItemsClient(items) {
  const itemsClient = [];

  items.forEach(item2 => {
    itemsClient.push({
      ...item2,
      node: document.getElementById(item2.hash),
    });

    if (item2.children.length > 0) {
      item2.children.forEach(item3 => {
        itemsClient.push({
          ...item3,
          node: document.getElementById(item3.hash),
        });
      });
    }
  });
  return itemsClient;
}

export default function MarkdownTableOfContents(props) {
  const { contents } = props;

  const itemsServer = React.useMemo(() => {
    const itemsCollectorRef = { current: [] };
    setRenderer(itemsCollectorRef, {});
    return getItemsServer(contents, itemsCollectorRef);
  }, [contents]);

  const [items, setItems] = React.useState(itemsServer);
  if (items !== itemsServer) {
    setItems(itemsServer);
  }
  React.useEffect(() => {
    setItems(getItemsClient(items));
  }, [items]);

  return <ScrollableTableOfContents items={items} />;
}

MarkdownTableOfContents.propTypes = {
  contents: PropTypes.array.isRequired,
};
