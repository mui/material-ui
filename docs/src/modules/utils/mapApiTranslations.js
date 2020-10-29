import marked from 'marked/lib/marked';

export default function mapApiTranslations(req, componentName) {
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

export function parsePropsMarkdown(translations) {
  Object.entries(translations).forEach(([language, props]) => {
    Object.entries(props).forEach(([prop, description]) => {
      translations[language][prop] = marked.parseInline(description);
    });
  });
  return translations;
}
