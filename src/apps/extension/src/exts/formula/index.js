import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Cmp from '../componetns/formula-cmp';
import emitter from '../emitter';

export default Node.create({
  name: 'formula',
  selected: true,
  atom: true,
  group: 'inline',
  inline: true,
  content: 'text*',
  addAttributes() {
    return {
      'data-latex': '',
    };
  },
  // 什么情况下会次插件会解析（当tag为formula 或者为旧版本的公式的时候）
  parseHTML() {
    return [{ tag: 'formula' }];
  },
  // 配合parseHTML方法使用，命中的都会进去这里来
  addNodeView() {
    return ReactNodeViewRenderer(Cmp);
  },
  // 提交的时候，即调用getHtml的时候最终保存的样式
  renderHTML({ node, HTMLAttributes }) {
    const isOld = Boolean(HTMLAttributes['data-latex']);
    return ['formula', {}, isOld ? HTMLAttributes['data-latex']! : 0];
  },

  // @ts-ignore
  addCommands() {
    const that = this;
    return {
      openFormula(arg1) {
        const cmd = (arg2) => {
          const editorAttr: any = that.editor.options.editorProps.attributes;
          emitter.emit(`openFormulaModal${editorAttr.id}`, arg1);
        };
        return cmd;
      },
    };
  },
});
