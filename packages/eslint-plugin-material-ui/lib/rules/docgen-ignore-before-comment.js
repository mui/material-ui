module.exports = function(context) {
  return {
    BlockComment: function(node) {
      const source = context.getSource(node);
      /**
        * The regex has 5 groups (mostly for readability) that match:
        *   1. '/**',
        *   2. One or more comment lines beginning with '*',
        *   3. '* @ignore',
        *   4. Any number of comment lines beginning with '*',
        *   5. '* /' (without the space).
        *
        *   All lines can begin with any number of spaces.
        */
      if (source.match(/( *\/\*\*\n)( *\*.*\n)+( *\* @ignore\n)( *\*.*\n)*( *\*\/)/)) {
        context.report(node, '@ignore should be at the beginning of a block comment.');
      }
    },
  };
};
