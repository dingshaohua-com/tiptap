import TextStyle from '@tiptap/extension-text-style';

export default TextStyle.extend({
  name: 'textStyle',

  // 仅重写 parseHTML 方法
  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: element => {
          // 如果 class 是 square，则忽略这个元素
          if (element.classList.contains('ignore-text-style')) {
            return false  // 返回 false 表示忽略该标签
          }

          // 否则，按照原来逻辑解析
          const hasStyles = element.hasAttribute('style')
          if (!hasStyles) {
            return false
          }

          return {}  // 继续解析其余带有样式的 span
        },
      },
    ]
  },
})
