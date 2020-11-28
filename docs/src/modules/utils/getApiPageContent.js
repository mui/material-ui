import marked from 'marked/lib/marked';

function mapApiTranslations(req, componentName) {
  const translations = {};
  req.keys().forEach((filename) => {
    const match = filename.match(new RegExp(`-([a-z]{2}).json$`));

    if (match) {
      translations[match[1]] = req(filename)[componentName] || null;
    } else {
      translations.en = req(filename)[componentName] || null;
    }
  });
  return translations;
}

function parsePropsMarkdown(translations) {
  Object.entries(translations).forEach(([language, props]) => {
    Object.entries(props).forEach(([prop, description]) => {
      translations[language][prop] = marked.parseInline(description);
    });
  });
  return translations;
}

export default function getApiPageContent({ req1, req2, req3, jsonPageContent, componentName }) {
  const componentDescription = mapApiTranslations(req1, componentName);
  const propDescriptions = parsePropsMarkdown(mapApiTranslations(req2, componentName));
  const classDescriptions = mapApiTranslations(req3, componentName);

  return {
    ...jsonPageContent,
    componentDescription,
    propDescriptions,
    classDescriptions,
  };
}
