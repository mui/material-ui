/**
 * Preserves leading comments within a file modified by jscodeshift.  See
 * https://github.com/facebook/jscodeshift/blob/main/recipes/retain-first-comment.md.
 *
 * Note that this may cause an extra blank line to be inserted.  See
 * https://github.com/facebook/jscodeshift/issues/185.
 *
 * @param {import('jscodeshift').JSCodeshift} file
 * @param {import('jscodeshift').Collection} api
 */
export default function preserveLeadingComments(j, root) {
  const getFirstNode = () => root.find(j.Program).get('body', 0).node;

  // Save the comments attached to the first node
  const firstNode = getFirstNode();
  const { comments } = firstNode;

  return {
    reapply: () => {
      // If the first node has been modified or deleted, reattach the comments
      const firstNode2 = getFirstNode();
      if (firstNode2 !== firstNode) {
        firstNode2.comments = comments;
      }
    },
  };
}
