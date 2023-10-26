function attr(attrs) {
  return (attrs || []).reduce((acc, item) => ({ ...acc, [item[0]]: item[1] }), {});
}

module.exports = {
  names: ['tableAlignment'],
  description: 'Set table alignment.',
  tags: ['table'],
  function: (params, onError) => {
    params.tokens.forEach((token) => {
      // This is wrong:
      // | Version | Supported          |
      // | ------- | ------------------ |
      //
      // The second column should be left aligned because it contains text:
      // | Version | Supported          |
      // | ------- | :----------------- |
      //
      // However, columns that includes numbers should be right aligned:
      // | Version | Supported          |
      // | ------: | :----------------- |
      //
      // More details: https://ux.stackexchange.com/questions/24066/what-is-the-best-practice-for-data-table-cell-content-alignment
      //
      // In this check we expect the style to be 'text-align:right' or equivalent.
      if (token.type === 'th_open' && attr(token.attrs).style == null) {
        onError({
          lineNumber: token.lineNumber,
          detail: `${params.lines[token.lineNumber - 1]}`,
        });
      }
    });
  },
};
