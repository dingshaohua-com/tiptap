import { Image as BaseImage } from '@tiptap/extension-image';

export const Img = BaseImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: { default: null },
      width: { default: null },
      height: { default: null },
      class: { default: null },
      // 你想支持的属性都可以写上
    };
  },
});