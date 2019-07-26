const algoliasearch = require('algoliasearch');

const client = algoliasearch('BH4D9OD16A', '1d8534f83b9b0cfea8f16498d19fbcab');
const index = client.initIndex('material-ui');

module.exports = app => {
  app.get('/search-docs', async (req, res) => {
    const { q } = req.query;
    try {
      const result = await index.search({
        facetFilters: ['version:master', `language:en`],
        query: q,
        hitsPerPage: 1,
      });
      if (result.hits) {
        res.redirect(303, result.hits[0].url);
        return;
      }
    } catch {} /* eslint-disable-line no-empty */
    res.redirect(303, 'https://material-ui.com/');
  });
  app.get('/osdd.xml', (req, res) => {
    res.type('application/opensearchdescription+xml');
    res.send(
      `<?xml version="1.0"?>
      <OpenSearchDescription xmlns="http://a9.com/-/spec/opensearch/1.1/">
       <ShortName>Material-ui</ShortName>
       <Description>Documentation search</Description>
       <Url type="text/html" method="get" template="/search-docs?q={searchTerms}"/>
      </OpenSearchDescription>`,
    );
  });
};
