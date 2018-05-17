/* eslint-disable */
// Waiting for https://github.com/kentcdodds/babel-plugin-preval/issues/52

'use strict';

function _toConsumableArray(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  } else {
    return Array.from(arr);
  }
}

function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

var p = require('path');
// const printAST = require('ast-pretty-print')
var getReplacement = require('./get-replacement');
var objectToAST = require('babel-plugin-preval/dist/object-to-ast');

module.exports = prevalPlugin;

function prevalPlugin(babel) {
  var t = babel.types,
    template = babel.template,
    transformFromAst = babel.transformFromAst;

  var assignmentBuilder = template('const NAME = VALUE');
  return {
    name: 'preval',
    visitor: {
      Program(path, _ref) {
        var filename = _ref.file.opts.filename;

        var firstNode = path.node.body[0] || {};
        var comments = firstNode.leadingComments || [];
        var isPreval = comments.some(isPrevalComment);

        if (!isPreval) {
          return;
        }

        comments.find(isPrevalComment).value = ' this file was prevaled';

        var _transformFromAst = transformFromAst(path.node),
          string = _transformFromAst.code;

        var replacement = getReplacement({ string, filename, babel });

        var moduleExports = Object.assign(
          {},
          t.expressionStatement(
            t.assignmentExpression(
              '=',
              t.memberExpression(t.identifier('module'), t.identifier('exports')),
              replacement,
            ),
          ),
          { leadingComments: comments },
        );

        path.replaceWith(t.program([moduleExports]));
      },
      TaggedTemplateExpression(path, _ref2) {
        var filename = _ref2.file.opts.filename;

        var isPreval = path.node.tag.name === 'preval';
        if (!isPreval) {
          return;
        }
        var string = path.get('quasi').evaluate().value;
        if (!string) {
          throw new Error('Unable to determine the value of your preval string');
        }
        var replacement = getReplacement({ string, filename, babel });
        path.replaceWith(replacement);
      },
      ImportDeclaration(path, _ref3) {
        var filename = _ref3.file.opts.filename;

        var isPreval = looksLike(path, {
          node: {
            source: {
              leadingComments(comments) {
                return comments && comments.some(isPrevalComment);
              },
            },
          },
        });
        if (!isPreval) {
          return;
        }
        var prevalComment = path.node.source.leadingComments.find(isPrevalComment).value.trim();
        var args = void 0;
        if (prevalComment !== 'preval') {
          args = prevalComment.replace(/preval\((.*)\)/, '$1').trim();
        }

        var replacement = getReplacement({
          string: `
            try {
              // allow for transpilation of required modules
              require('@babel/register')
            } catch (e) {
              // ignore error
            }
            var mod = require('${path.node.source.value}');
            mod = mod && mod.__esModule ? mod.default : mod
            ${args ? `mod = mod(${args})` : ''}
            module.exports = mod
          `,
          filename,
          babel,
        });
        path.replaceWith(
          assignmentBuilder({
            NAME: t.identifier(path.node.specifiers[0].local.name),
            VALUE: replacement,
          }),
        );
      },
      CallExpression(path, _ref4) {
        var filename = _ref4.file.opts.filename;

        var isPreval = looksLike(path, {
          node: {
            callee: {
              type: 'MemberExpression',
              object: { name: 'preval' },
              property: { name: 'require' },
            },
          },
        });
        if (!isPreval) {
          return;
        }

        var _path$get = path.get('arguments'),
          _path$get2 = _toArray(_path$get),
          source = _path$get2[0],
          args = _path$get2.slice(1);

        var argValues = args.map(function(a) {
          var result = a.evaluate();
          if (!result.confident) {
            throw new Error('preval cannot determine the value of an argument in preval.require');
          }
          return result.value;
        });
        var absolutePath = p.resolve(p.dirname(filename), source.node.value);
        try {
          // allow for transpilation of required modules
          require('@babel/register');
        } catch (e) {
          // ignore error
        }
        var mod = require(absolutePath);
        if (argValues.length) {
          if (typeof mod !== 'function') {
            throw new Error(
              `\`preval.require\`-ed module (${
                source.node.value
              }) cannot accept arguments because it does not export a function. You passed the arguments: ${argValues.join(
                ', ',
              )}`,
            );
          }
          mod = mod.apply(undefined, _toConsumableArray(argValues));
        }
        path.replaceWith(objectToAST(mod));
      },
    },
  };
}

function isPrevalComment(comment) {
  var normalisedComment = comment.value
    .trim()
    .split(' ')[0]
    .trim();
  return normalisedComment.startsWith('preval') || normalisedComment.startsWith('@preval');
}

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(function(bKey) {
      var bVal = b[bKey];
      var aVal = a[bKey];
      if (typeof bVal === 'function') {
        return bVal(aVal);
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal);
    })
  );
}

function isPrimitive(val) {
  // eslint-disable-next-line
  return val == null || /^[sbn]/.test(typeof val);
}

/*
eslint
  import/no-unassigned-import:0
  import/no-dynamic-require:0
*/
