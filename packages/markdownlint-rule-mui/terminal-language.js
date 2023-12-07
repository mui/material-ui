module.exports = {
  names: ['terminalLanguage'],
  description: 'Set the right language for terminal code.',
  tags: ['code'],
  function: (params, onError) => {
    params.tokens.forEach((token) => {
      if (token.type === 'fence' && token.info === 'sh') {
        onError({
          lineNumber: token.lineNumber,
          detail: `Use "bash" instead of "sh".`,
        });
      }
    });
  },
};
