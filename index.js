module.exports = function({ types: t }) {
  return {
    visitor: {
      FunctionDeclaration(nodePath, state) {
        if (!state.file.opts.filename.endsWith('compiler/fesm5/compiler.js')) return;
        const { node } = nodePath;
        if (node.id.name === 'isStyleUrlResolvable') {
          const ifSt = node.body.body.find(child => t.isIfStatement(child));
          if(t.isLogicalExpression(ifSt.test) && t.isReturnStatement(ifSt.consequent)) ifSt.test = ifSt.test.left;

          const ret = node.body.body.find(child => t.isReturnStatement(child));
          ret.argument = t.logicalExpression(
            '||',
            ret.argument,
            t.logicalExpression(
              '||',
              t.binaryExpression(
                '==',
                t.memberExpression(
                  t.identifier('schemeMatch'),
                  t.identifier('1'),
                  true
                ),
                t.stringLiteral('http')
              ),
              t.binaryExpression(
                '==',
                t.memberExpression(
                  t.identifier('schemeMatch'),
                  t.identifier('1'),
                  true
                ),
                t.stringLiteral('https')
              )
            )
          );
        }
      },
    },
  };
};
