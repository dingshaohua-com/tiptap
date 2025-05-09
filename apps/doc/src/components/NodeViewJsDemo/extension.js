import { mergeAttributes, Node } from '@tiptap/core'

export default Node.create({
  name: 'nodeView',
  group: 'block',
  atom: true,
  addAttributes() {
    return { count: { default: 0 } }
  },

  parseHTML() {
    return [{ tag: 'node-view' }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['node-view', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ({ editor, node, getPos }) => {
      const { view } = editor

      const label = document.createElement('span')
      label.classList.add('label')
      label.innerHTML = '节点视图'

      const button = document.createElement('button')
      button.innerHTML = `按钮被点击了${node.attrs.count} 次`
      button.addEventListener('click', () => {
        if (typeof getPos === 'function') {
          view.dispatch(view.state.tr.setNodeMarkup(getPos(), undefined, {
            count: node.attrs.count + 1,
          }))
          editor.commands.focus()
        }
      })

      const content = document.createElement('div')
      content.classList.add('content')
      content.append(button)

      const dom = document.createElement('div')
      dom.classList.add('node-view')
      dom.append(label, content)

      return { dom }
    }
  },
})