import { defaultTraveler } from './defaultTraveler'

function getBlockComment(node) {
  if (node == null) {
    return null
  }
  const { comments } = node
  if (comments == null || !comments.length) {
    return null
  }
  const { length } = comments
  for (let i = 0; i < length; i++) {
    const comment = comments[i]
    if (comment.type[0] === 'B') {
      return comment
    }
  }
}

function enterScope(node, name) {
  const scope = {
    name,
    node,
    comment: getBlockComment(node) || getBlockComment(node.body),
  }
  return scope
}

function exitScope(parent, scope) {
  // Only retain scopes with children or with comments
  if (scope.children != null || scope.comment != null) {
    if (parent.children == null) {
      parent.children = []
    }
    parent.children.push(scope)
  }
  return parent
}

const traveler = defaultTraveler.makeChild({
  VariableDeclaration(node, state) {
    if (node.declarations.length === 1) {
      const declaration = node.declarations[0]
      const { scope } = state
      state.scope = enterScope(node, declaration.id.name)
      this.super.VariableDeclarator.call(this, declaration, state)
      state.scope = exitScope(scope, state.scope)
    }
  },
  FunctionDeclaration(node, state) {
    const { scope } = state
    state.scope = enterScope(node, node.id.name)
    this.super.FunctionDeclaration.call(this, node, state)
    state.scope = exitScope(scope, state.scope)
  },
  ArrowFunctionExpression(node, state) {
    const { scope } = state
    state.scope = enterScope(node, node.id.name)
    this.super.ArrowFunctionExpression.call(this, node, state)
    state.scope = exitScope(scope, state.scope)
  },
  ClassDeclaration(node, state) {
    const { scope } = state
    state.scope = enterScope(node, node.id.name)
    this.super.ClassDeclaration.call(this, node, state)
    state.scope = exitScope(scope, state.scope)
  },
  Property(node, state) {
    const { type } = node.value
    switch (type) {
      case 'FunctionExpression':
      case 'ArrowFunctionExpression': {
        const { scope } = state
        state.scope = enterScope(node.value, node.key.name)
        this.super[type].call(this, node.value, state)
        state.scope = exitScope(scope, state.scope)
        break
      }
      default:
      // Ignore
    }
  },
  MethodDefinition(node, state) {
    const { type } = node.value
    switch (type) {
      case 'FunctionExpression': {
        const { scope } = state
        state.scope = enterScope(node.value, node.key.name)
        this.super[type].call(this, node.value, state)
        state.scope = exitScope(scope, state.scope)
        break
      }
      default:
      // Ignore
    }
  },
  CallExpression(node, state) {
    // Bypass scope for IIFEs
    const { type } = node.callee
    switch (type) {
      case 'FunctionExpression':
      case 'ArrowFunctionExpression':
        this.super[type].call(this, node.callee, state)
        break
      default:
      // Ignore
    }
  },
})

export function document(node) {
  /*
  Returns a documentation structure from the provided `node`.
  */
  const state = {
    scope: enterScope(node, null),
  }
  traveler[node.type](node, state)
  return state.scope
}
