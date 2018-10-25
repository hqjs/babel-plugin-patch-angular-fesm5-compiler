module.exports = function({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(nodePath, state) {
        if (!state.file.opts.filename.endsWith('compiler/fesm5/compiler.js')) return;
        const { node } = nodePath;
        if (node.id.name === 'isStyleUrlResolvable') {
          const ret = node.body.body.find(child => t.isReturnStatement(child));
          ret.argument = t.logicalExpression(
            '||',
            ret.argument,
            t.binaryExpression(
              '==',
              t.memberExpression(
                t.identifier('schemeMatch'),
                t.identifier('1'),
                true
              ),
              t.stringLiteral('http')
            )
          );
        }
      },
    },
  };
};
