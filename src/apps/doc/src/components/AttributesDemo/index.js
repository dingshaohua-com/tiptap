import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Paragraph from '@tiptap/extension-paragraph'

const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      color: {
        default: null,
        // 自定义HTML解析
        parseHTML: (element) => element.getAttribute("data-color"),
        // … 自定义HTML渲染
        renderHTML: (attributes) => {
          // 您还可以使用 rendered: false， 这样此属性就完全不会在呈现出来了
          return {
            "data-color": attributes.color,
            style: `color: ${attributes.color}`,
          };
        },
      }
      
      // 配置如上color属性后  渲染结果将会如下
      // <p data-color="pink" style="color: pink">示例文本</p>
    };
  },
});

export default () => {
  const editor = useEditor({
    extensions: [StarterKit, CustomParagraph],
    content: '<p data-color="pink">示例文本</p>',
  });

  return (
    <>
      <EditorContent editor={editor} />
    </>
  );
};


