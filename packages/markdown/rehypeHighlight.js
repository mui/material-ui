(async () => {
    const { unified } = await import('unified');
    const remarkParse = (await import('remark-parse')).default;
    const remarkRehype = (await import('remark-rehype')).default;
    const rehypeStringify = (await import('rehype-stringify')).default;
    const rehypePrettyCode = (await import('rehype-pretty-code')).default;
  
    async function processMarkdown(markdownText) {
        const file = await unified()
            .use(remarkParse)
            .use(remarkRehype)
            .use(rehypePrettyCode, {
                keepBackground: true,
                theme: 'one-light',
                onVisitHighlightedLine(node) {
                    const nodeClass = node.properties.className;
                    if (nodeClass && nodeClass.length > 0) {
                        if (node.properties.className) {
                            node.properties.className.push('highlighted-line');
                        }
                    } else {
                        node.properties.className = ['highlighted-line'];
                    }
                },
                onVisitHighlightedChars(node) {
                    const nodeClass = node.properties.className;
                    if (nodeClass && nodeClass.length > 0) {
                        if (node.properties.className) {
                            node.properties.className.push('data-highlighted-chars');
                        }
                    } else {
                        node.properties.className = ['data-highlighted-chars'];
                    }
                },
            })
            .use(rehypeStringify)
            .process(markdownText);
  
        const highlightedString = String(file);
  
        return highlightedString;
    }
  
    module.exports = processMarkdown;
  })();