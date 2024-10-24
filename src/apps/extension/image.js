import { Node, nodeInputRule } from '@tiptap/core';
import { mergeAttributes, ReactNodeViewRenderer } from '@tiptap/react';
import { uploadImagePlugin, UploadFn } from '../upimg-helper/upload_image';
import handleUpload from '../upimg-helper/handle-upload';
import ImgCmp from '../componetns/img-cmp';

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
  name: 'image',
  selected: true,
  atom: true,
  draggable: true,
  defaultOptions: {
    inline: true,
    HTMLAttributes: {},
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? 'inline' : 'block';
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
      tag: 'img[src]',
      getAttrs: (dom) => {
        if (typeof dom === 'string') return {};
        const element = dom;
        const obj = {
          src: element.getAttribute('src'),
          title: element.getAttribute('title'),
          alt: element.getAttribute('alt'),
          width: element.getAttribute('width'),
        };
        return obj;
      },
    },
  ],
  renderHTML({ HTMLAttributes, node }) {
    return ['img', mergeAttributes(HTMLAttributes)];
  },

  addCommands() {
    return {
      setImage: (attrs) => ({ state, dispatch }) => {
        const { selection } = state;
        const position = selection.$head
          ? selection.$head.pos
          : selection.$to.pos;

        const node = this.type.create(attrs);
        const transaction = state.tr.insert(position, node);
        return dispatch?.(transaction);
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
