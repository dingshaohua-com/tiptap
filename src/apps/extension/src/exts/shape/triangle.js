import { Node } from "@tiptap/core";
import { TextSelection } from "@tiptap/pm/state";

// const svgContent = `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1728996390933" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1460" xmlns:xlink="http://www.w3.org/1999/xlink" width="256" height="256"><path d="M928.64 896a2.144 2.144 0 0 1-0.64 0H96a32.032 32.032 0 0 1-27.552-48.288l416-704c11.488-19.456 43.552-19.456 55.104 0l413.152 699.2A31.936 31.936 0 0 1 928.64 896zM152.064 832h719.84L512 222.912 152.064 832z" fill="#2A323A" p-id="1461" data-spm-anchor-id="a313x.search_index.0.i0.54013a81iTs8kB" class="selected"></path></svg>`;
// const triangleImg =
//   "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svgContent);

export default Node.create({
  name: "triangle",
  group: "inline",
  inline: true,
  atom: true,
  // content: "text*", // 允许插入文本

  addAttributes() {
    return {
      class: {
        default: "triangle",
      },
      style: {
        default: `box-sizing:border-box; padding:2px; display: inline-block;width: 20px;height: 20px;position: relative;top: 4px;margin:0 4px;  background-image: url("https://homeworkdone-rtf.oss-cn-beijing.aliyuncs.com/triangle.png"); background-size: 100% 100%`,
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", HTMLAttributes, 0];
  },
  parseHTML() {
    return [
      {
        tag: "span.triangle",
      },
    ];
  },
  addCommands() {
    return {
      inertTriangle:
      () =>
        ({ commands }) => {
          commands.insertContent({ type: this.name });
          commands.insertContent(" ");
          // 获取当前文档和光标位置
          const { state, view } = this.editor;
          const { from, to } = state.selection;

          // 计算新内容的结束位置
          const newPos = to + 1; // 根据需要调整

          // 设置新的光标位置
          view.dispatch(
            view.state.tr.setSelection(TextSelection.create(state.doc, newPos))
          );
        },
    };
  },
});
