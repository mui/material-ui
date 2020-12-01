export default function mapApiPageTranslations(req) {
  const translations = {};
  req.keys().forEach((filename) => {
    const match = filename.match(new RegExp(`-([a-z]{2}).json$`));

    if (match) {
      translations[match[1]] = req(filename) || null;
    } else {
      translations.en = req(filename) || null;
    }
  });
  return translations;
}
