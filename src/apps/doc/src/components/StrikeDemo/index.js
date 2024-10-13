import StarterKit from "@tiptap/starter-kit";
import { markInputRule  } from "@tiptap/core";
import Strike from "@tiptap/extension-strike";
import { EditorContent, useEditor } from "@tiptap/react";
import React from "react";

export default () => {
  // 修改默认激活删除线规则： 由需要两边各输入两条波浪线 改为两边各输入一条即可
  const CustomStrike = Strike.extend({
    addInputRules() {
      return [
        markInputRule({
          find: /(?:^|\s)((?:~)((?:[^~]+))(?:~))$/,
          type: this.type,
        }),
      ];
    },
  });

  const editor = useEditor({
    extensions: [StarterKit, CustomStrike],
    content: "在我两边各输入一条波浪线试试",
  });

  return <EditorContent editor={editor} />;
};
