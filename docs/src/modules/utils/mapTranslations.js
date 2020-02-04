export default function mapTranslations(req, ext) {
  const translations = {};
  req.keys().forEach(filename => {
    const match = filename.match(new RegExp(`-([a-z]{2}).${ext}$`));

    if (match) {
      translations[match[1]] = req(filename);
    } else {
      translations.en = req(filename);
    }
  });
  return translations;
}
