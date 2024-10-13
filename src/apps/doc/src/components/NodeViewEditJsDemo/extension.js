import { mergeAttributes, Node } from '@tiptap/core'

export default Node.create({
  name: 'nodeView',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      {
        tag: 'node-view',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['node-view', mergeAttributes(HTMLAttributes), 0]
  },

  addNodeView() {
    return () => {
      const label = document.createElement('span')
      label.classList.add('label')
      label.innerHTML = '节点视图'
      label.contentEditable = false

      const content = document.createElement('div')
      content.classList.add('content')

      const dom = document.createElement('div')
      dom.classList.add('node-view')
      dom.append(label, content)

      return {
        dom,
        contentDOM: content,
      }
    }
  },
})