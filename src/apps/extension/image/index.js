import { Node, nodeInputRule } from "@tiptap/core";
import { mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";
import {
  handleUpload,
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
  addOptions: {
    HTMLAttributes: {},
  },
  // 配合parseHTML方法使用，命中的都会进去这里来
  addNodeView() {
    return ReactNodeViewRenderer(ImgCmp);
  },
  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
      title: {
        default: null,
      },
      width: {
        default: null,
      },
    };
  },
  parseHTML: () => [
    {
      tag: "img",
      getAttrs: (dom) => {
        if (typeof dom === "string") return {};
        const element = dom;
        const obj = {
          src: element.getAttribute("src"),
          title: element.getAttribute("title"),
          alt: element.getAttribute("alt"),
          width: element.getAttribute("width"),
        };
        return obj;
      },
    },
  ],
  renderHTML({ HTMLAttributes, node }) {
    return ["img", mergeAttributes(HTMLAttributes)];
  },

  uploadImg(){
    console.log(8989);
    
  },

  addCommands() {
    return {
      afterUploadImg(arg) {
        console.log(111, arg);
        
        // const { tr, dispatch, state } = arg;
        // // 获取段落节点类型
        // const paragraphNodeType = state.schema.nodes["paragraph"];
        // // 创建一个包含文本的文本节点
        // const textNode = state.schema.text("哈哈");
        // // 创建段落节点并包含文本节点
        // const paragraphNode = paragraphNodeType.create(null, textNode); // this.type.create 代表创建当前节点
        // // 创建事务
        // const transaction = tr.insert(1, paragraphNode);
        // // 提交事务
        // dispatch(transaction);
        // return true;
      },
      uploadImg: () => (arg) => {
        openFileWindow().then(async (imgFile) => {
          arg.commands.afterUploadImg(arg);
        });
      },
    };
  },

  addInputRules() {
    const fn = (match) => {
      const [_, alt, src, title, width] = match;
      return {
        src,
        alt,
        title,
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
  addProseMirrorPlugins() {
    return [uploadImagePlugin(handleUpload)];
  },
});
