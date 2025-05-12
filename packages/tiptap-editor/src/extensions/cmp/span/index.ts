import { Node } from '@tiptap/core'

// 创建一个自定义的 Span 节点
export const Span = Node.create({
  name: 'span',
  group: 'inline', // span 是一个行内元素
  inline: true, // 是一个行内节点
  content: 'text*',  // 可以包含文本
  atom: false, // 不是原子节点，意味着它可以包含其他元素

  // 解析 HTML：允许解析 span 标签及其属性（class 和 style）
  parseHTML() {
    return [
      {
        tag: 'span',
      },
    ]
  },

  // 渲染 HTML：允许渲染带有自定义属性（例如 class 和 style）的 span 标签
  renderHTML({ node }) {
    const { class: className, style, ...otherAttributes } = node.attrs

    // 返回 span 标签并传递所有的属性
    return [
      'span',
      {
        class: className,
        style: style,
        ...otherAttributes, // 允许传递其他自定义属性
      },
      0, // 默认是文本内容
    ]
  },

  // 定义自定义属性
  addAttributes() {
    return {
      class: {
        default: null, // 默认值为空
      },
      style: {
        default: null, // 默认值为空
      },
    }
  },
})