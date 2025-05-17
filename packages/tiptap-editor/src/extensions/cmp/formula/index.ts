import { Node } from '@tiptap/core';
import emitter from '../../../utils/emitter';
import Hammer from 'hammerjs';

export const Formula = Node.create({
  name: 'mathField',
  atom: true,
  group: 'inline',
  inline: true,
  content: 'text*',

  parseHTML() {
    return [{ tag: 'math-field' }];
  },
 
  // 渲染（文档初始化和变动就会被渲染 执行此函数）和提交（即调用getHtml）的时候的最终代码
  renderHTML({HTMLAttributes }) {
    return ['math-field', HTMLAttributes, 0];
  },

  addNodeView() {
    return ({ editor, node, getPos, HTMLAttributes }) => {
      const wrapper = document.createElement('math-field');
      
      // 设置属性
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        wrapper.setAttribute(key, value);
      });
      
      // 设置内容
      wrapper.textContent = node.textContent;
      
      // 添加点击事件
      const mc = new Hammer(wrapper, {
        recognizers: [
          [Hammer.Tap, { event: 'doubletap', taps: 2 }]
        ]
      });
      mc.on('doubletap', (event) => {
        console.log('Math field clicked', { node, getPos, editor });
        // 你可以在这里触发编辑器命令或做其他操作
        editor.commands.setNodeSelection(getPos());
        emitter.emit('formula-click', {
          content: node.textContent, 
          pos:getPos()
        });
      });
      
      return {
        dom: wrapper,
      };
    };
  },

  // @ts-ignore
  addCommands() {
    return {
      insertFormula: (arg) => (editor) => {
        const currentNode = {
          type: this.name,
          content: [{ type: 'text', text: arg || '' }],
        };
        const { from } = editor.state.selection;
        editor.commands.insertContentAt(from, currentNode);
        return true;
      },
      updateFormula: (pos, arg) => ({ tr, state, dispatch }) => {
        // 获取指定位置的节点
        const node = state.doc.nodeAt(pos);
        // 创建新节点
        const newNode = this.type.create(
          node.attrs, 
          arg ? [state.schema.text(arg)] : null
        );
        tr.replaceWith(pos, pos + node.nodeSize, newNode);
        return true;
      },
    };
  },
});
