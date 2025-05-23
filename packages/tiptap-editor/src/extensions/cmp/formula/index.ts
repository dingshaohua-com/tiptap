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
      const hammer = new Hammer.Manager(wrapper);
      const singleTap = new Hammer.Tap({ event: 'singletap', taps: 1 });
      const doubleTap = new Hammer.Tap({ event: 'doubletap', taps: 2, interval: 300, threshold: 9, });

      hammer.add([doubleTap, singleTap]);
      doubleTap.recognizeWith(singleTap); // 双击时需要识别单击
      singleTap.requireFailure(doubleTap); // 单击需要等待确认不是双击
      // hammer.on('singletap', (e) => {
      //   // if (!editor.isFocused) { }
      // });
      hammer.on('doubletap', (event) => {
        if (editor.isFocused) {
          // 你可以在这里触发编辑器命令或做其他操作
          editor.commands.setNodeSelection(getPos());
          console.log('formula-click发射啦');
          emitter.emit('formula-click', {
            content: node.textContent,
            pos: getPos(),
          });
        }
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
        editor.commands.focus();
        return true;
      },
      updateFormula: (pos, arg) => ({ tr, state, dispatch, commands }) => {
        // 获取指定位置的节点
        const node = state.doc.nodeAt(pos);
        // 创建新节点
        const newNode = this.type.create(
          node.attrs, 
          arg ? [state.schema.text(arg)] : null
        );
        tr.replaceWith(pos, pos + node.nodeSize, newNode);
        commands.focus();
        return true;
      },
    };
  },
});
