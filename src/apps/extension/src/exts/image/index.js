import { Node, nodeInputRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import {
  uploadImagePlugin,
  openFileWindow,
  fileToBase64,
} from "./helper";
import ImgCmp from "./img-cmp";

/**
 * Tiptap Extension to upload images
 * @see  https://gist.github.com/slava-vishnyakov/16076dff1a77ddaca93c4bccd4ec4521#gistcomment-3744392
 * @since 7th July 2021
 *
 * Matches following attributes in Markdown-typed image: [, alt, src, title]
 *
 * Example:
 * ![Lorem](image.jpg) -> [, "Lorem", "image.jpg"]
 * ![](image.jpg "Ipsum") -> [, "", "image.jpg", "Ipsum"]
 * ![Lorem](image.jpg "Ipsum") -> [, "Lorem", "image.jpg", "Ipsum"]
 */

const IMAGE_INPUT_REGEX = /!\[(.+|:?)\]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export default Node.create({
  name: "image",
  selected: true,
  atom: true,
  draggable: true,
  inline: true,
  group: "inline",
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      width: {
        default: 300,
      },
    };
  },
  parseHTML: () => [
    {
      tag: "img",
    },
  ],

  renderHTML({ HTMLAttributes, node }) {
    return ["img", HTMLAttributes, 0];
  },

  addCommands() {
    return {
      uploadImg:
        () =>
        ({ editor }) => {
          openFileWindow().then(async (imgFile) => {
            const imgBase64 = await fileToBase64(imgFile);
            const tiptapNodeForCurrent = {
              type: this.name,
              attrs: {
                src: imgBase64,
              },
            };
            const { from, to } = editor.state.selection;
            editor.commands.insertContentAt(to, tiptapNodeForCurrent);
          });
          return true;
        },
    };
  },
  // 配合parseHTML方法使用，命中的都会进去这里来
  addNodeView() {
    return ReactNodeViewRenderer(ImgCmp);
  },

  addInputRules() {
    const fn = (match) => {
      const [_, alt, src, width] = match;
      return {
        src,
        alt,
        width,
      };
    };
    return [
      nodeInputRule({
        find: IMAGE_INPUT_REGEX,
        type: this.type,
        getAttributes: fn,
      }),
    ];
  },

  // 定义扩展的底层行为，比如监听复制粘贴 或 拖拽等等
  addProseMirrorPlugins() {
    return [uploadImagePlugin()];
  },
});
