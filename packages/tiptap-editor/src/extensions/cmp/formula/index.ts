import katex from 'katex';
import { Editor } from '@tiptap/core';
import { Extension } from '@tiptap/core';
import { Plugin } from 'prosemirror-state';
import emitter from '../../../utils/emitter';
import { Decoration, DecorationSet } from 'prosemirror-view';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    formula: {
      insertFormula: (latex: string) => ReturnType;
      updateFormula: (pos: number, end: number, latex: string) => ReturnType;
    };
  }
}

export const Formula = Extension.create({
  name: 'formula',

  addCommands() {
    return {
      insertFormula:
        (latex: string) =>
        ({ editor }: { editor: Editor }) => {
          // 根据公式类型选择合适的分隔符
          // const isBlock = latex.includes('\n') || latex.length > 50; // 简单的启发式判断
          // const formula = isBlock ? `\\[${latex}\\]` : `\\(${latex}\\)`;
          
          return editor.commands.insertContent(latex);
        },
      updateFormula:
        (pos: number, end: number, latex: string) =>
        ({ editor }: { editor: Editor }) => {
          console.log(111, pos, end, latex);

          // 根据公式类型选择合适的分隔符
          // const isBlock = latex.includes('\n') || latex.length > 50; // 简单的启发式判断
          // const formula = isBlock ? `\\[${latex}\\]` : `\\(${latex}\\)`;
          
          // 先删除旧内容
          editor.commands.deleteRange({ from: pos, to: end });
          // 再插入新内容
          return editor.commands.insertContentAt(pos, latex);
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        props: {
          decorations: (state) => {
            const decorations: Decoration[] = [];
            
            state.doc.descendants((node, pos) => {
              if (node.isText) {
                const text = node.text || '';
                
                // 定义各类 LaTeX 匹配规则
                const rules: { regex: RegExp; type: string }[] = [
                  // { regex: /\\\((.*?)\\\)/g, type: 'inline' }, // 匹配 \( ... \)
                  // { regex: /\$(?!\$)(.*?)(?<!\\)\$/g, type: 'inline' }, // 匹配 $...$，避免 $$ 和转义 $
                  // { regex: /\\\[([\s\S]*?)\\\]/g, type: 'block' }, // 匹配 \[ ... \]
                  // { regex: /\$\$([\s\S]*?)\$\$/g, type: 'block' }, // 匹配 $$ ... $$
                  // { regex: /\\rm\{([\s\S]*?)\}/g, type: 'rm' }, // 匹配 \rm{ ... }
                  { regex: /(\\\(.*?\\\))/g, type: 'inline' }, // 匹配 \( ... \)
                  { regex: /(\$(?!\$).*?(?<!\\)\$)/g, type: 'inline' }, // 匹配 $...$，避免 $$ 和转义 $
                  { regex: /(\\\[[\s\S]*?\\\])/g, type: 'block' }, // 匹配 \[ ... \]
                  { regex: /(\$\$[\s\S]*?\$\$)/g, type: 'block' }, // 匹配 $$ ... $$
                  { regex: /(\\rm\{[\s\S]*?\})/g, type: 'rm' }, // 匹配 \rm{ ... }
                ];

                // 遍历所有规则
                for (const rule of rules) {
                  let match;
                  while ((match = rule.regex.exec(text)) !== null) {
                    const formulaContent = match[1];
                    const start = pos + match.index;
                    const end = start + match[0].length;

                    console.log(666, formulaContent);
                    
                    
                    // 使用 inline 装饰器来隐藏原始文本
                    decorations.push(
                      Decoration.inline(start, end, {
                        style: 'display: none;',
                      }),
                    );
                    
                    // 使用 widget 装饰器来显示渲染后的公式
                    const decoration = Decoration.widget(start, () => {
                      const container = document.createElement('span');
                      container.className = 'formula-container';
                      container.style.cssText = 'display: inline-block; position: relative; cursor: pointer;';
                      
                      const formula = document.createElement('span');
                      formula.className = 'formula-decoration';
                      formula.style.cssText = 'display: inline-block;';
                      
                      // 根据公式类型设置不同的渲染选项
                      const options = {
                        displayMode: rule.type === 'block',
                        throwOnError: false,
                      };
                      
                      formula.innerHTML = katex.renderToString(formulaContent, options);

                      // 添加样式来隐藏 katex-html 元素（KaTeX 渲染时自动添加的辅助元素）
                      const style = document.createElement('style');
                      style.textContent = `
                        .formula-decoration .katex-html {
                          display: none !important;
                        }
                      `;
                      
                      // 使用 requestAnimationFrame 确保在下一帧时添加事件监听
                      requestAnimationFrame(() => {
                        // 添加点击事件
                        container.addEventListener('click', (event) => {
                          event.stopPropagation();
                          
                          // 从 Extension 上下文获取编辑器实例
                          const editor = this.editor;
                          
                          if (editor) {
                            emitter.emit('formula-click', {
                              content: formulaContent,
                              pos: start,
                              end,
                            });
                          }
                        });
                      });
                      
                      container.appendChild(style);
                      container.appendChild(formula);
                      return container;
                    });
                    
                    decorations.push(decoration);
                  }
                }
              }
              return true;
            });
            
            return DecorationSet.create(state.doc, decorations);
          },
        },
      }),
    ];
  },
});
