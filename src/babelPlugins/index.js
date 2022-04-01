function babelPlugins ({ types: t }) {
  function createVoid0() {
    return t.unaryExpression("void", t.numericLiteral(0))
  }

  function isExcluded(property, excludeArray) {
    return (
      excludeArray &&
      excludeArray.some((name) =>
        property.isIdentifier({
          name,
        })
      )
    )
  }

  function isIncludedConsoleBind(memberExpr, excludeArray) {
    const object = memberExpr.get("object")
    if (!object.isMemberExpression()) return false
    if (isExcluded(object.get("property"), excludeArray)) return false
    return (
      isGlobalConsoleId(object.get("object")) &&
      memberExpr.get("property").isIdentifier({
        name: "bind",
      })
    )
  }

  function isGlobalConsoleId(id) {
    const name = "console"
    return (
      id.isIdentifier({
        name,
      }) &&
      !id.scope.getBinding(name) &&
      id.scope.hasGlobal(name)
    )
  }

  function isIncludedConsole(memberExpr, excludeArray) {
    const object = memberExpr.get("object")
    const property = memberExpr.get("property")
    if (isExcluded(property, excludeArray)) return false
    if (isGlobalConsoleId(object)) return true
    return (
      isGlobalConsoleId(object.get("object")) &&
      (property.isIdentifier({
        name: "call",
      }) ||
        property.isIdentifier({
          name: "apply",
        }))
    )
  }

  function createNoop() {
    return t.functionExpression(null, [], t.blockStatement([]))
  }

  return {
    name: "babelPlugins",
    visitor: {
      CallExpression(path, state) {
        const callee = path.get("callee")
        if (!callee.isMemberExpression()) return

        if (isIncludedConsole(callee, state.opts.exclude)) {
          // console.log()
          if (path.parentPath.isExpressionStatement()) {
            path.remove()
          } else {
            path.replaceWith(createVoid0())
          }
        } else if (isIncludedConsoleBind(callee, state.opts.exclude)) {
          // console.log.bind()
          path.replaceWith(createNoop())
        }
      },
    },
  }
}

module.exports = babelPlugins