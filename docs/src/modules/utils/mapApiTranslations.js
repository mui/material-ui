export default function mapApiTranslations(req, componentName) {
  const translations = {};
  req.keys().forEach((filename) => {
    const match = filename.match(new RegExp(`-([a-z]{2}).json$`));

    if (match) {
      translations[match[1]] = req(filename)[componentName];
    } else {
      translations.en = req(filename)[componentName];
    }
  });
  return translations;
}
