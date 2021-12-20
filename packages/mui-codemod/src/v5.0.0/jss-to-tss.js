const nodePath = require('path');

/**
 * @param {import('jscodeshift').FileInfo} file
 * @param {import('jscodeshift').API} api
 */
export default function transformer(file, api, options) {


  const j = api.jscodeshift;
  const root = j(file.source);

  const out = root
    .find(j.ImportDeclaration)
    .filter(path =>  path.node.source.value  === "@material-ui/styles/makeStyles")
    .replaceWith(
      


          j.importDeclaration(
            [j.importSpecifier(j.identifier('makeStyles'))],
            j.literal('tss-react/mui'),
          ),
      
      
      )
    .toSource();

  

  console.log(out);

  return "";



}
