import { Plugin } from "prosemirror-state";

// --===上传图片辅助工具start===--
const readFileAsDataURL = (file) => {
  return new Promise(function (resolve, reject) {
    let fr = new FileReader();

    fr.onload = function () {
      resolve(fr.result);
    };

    fr.onerror = function () {
      reject(fr);
    };

    fr.readAsDataURL(file);
  });
};

export const handleUpload = async (file) => {
  const result = await readFileAsDataURL(file);
  return result;
};
// --===上传图片辅助工具end===--

/**
 * function for image drag n drop(for tiptap)
 * @see https://gist.github.com/slava-vishnyakov/16076dff1a77ddaca93c4bccd4ec4521#gistcomment-3744392
 */

export const uploadImagePlugin = () => {
  const upload = handleUpload;
  return new Plugin({
    props: {
      handlePaste(view, event, slice) {
        const {
          state: { schema },
        } = view;
        const { clipboardData } = event;
        // const pastedText = clipboardData.getData('text/plain');

        const items = Array.from(clipboardData.items);
        items.forEach((item) => {
         
         
          const isImg = item.type.indexOf("image") > -1;
          if (isImg) {
            
            
            event.preventDefault();
            const image = item.getAsFile();
            console.log(8989, image);
            if (upload && image) {
              upload(image).then((src) => {
                console.log(111, src);
                const node = schema.nodes.image.create({
                  src,
                });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              });
            }
          } 
          
          // else {
          //   const reader = new FileReader();
          //   reader.onload = (readerEvent) => {
          //     const node = schema.nodes.image.create({
          //       src: readerEvent.target?.result,
          //     });
          //     const transaction = view.state.tr.replaceSelectionWith(node);
          //     view.dispatch(transaction);
          //   };
          //   if (!image) return;
          //   reader.readAsDataURL(image);
          // }
        });

        return false;
      },

      handleDOMEvents: {
        drop(view, event) {
          const hasFiles = event.dataTransfer?.files?.length;

          if (!hasFiles) {
            return false;
          }

          const images = Array.from(event.dataTransfer.files).filter((file) =>
            /image/i.test(file.type)
          );

          if (images.length === 0) {
            return false;
          }

          event.preventDefault();

          const { schema } = view.state;
          const coordinates = view.posAtCoords({
            left: event.clientX,
            top: event.clientY,
          });

          images.forEach(async (image) => {
            const reader = new FileReader();

            if (upload) {
              const node = schema.nodes.image.create({
                src: await upload(image),
              });
              const transaction = view.state.tr.insert(coordinates.pos, node);
              view.dispatch(transaction);
            } else {
              reader.onload = (readerEvent) => {
                const node = schema.nodes.image.create({
                  src: readerEvent.target?.result,
                });
                const transaction = view.state.tr.insert(coordinates.pos, node);
                view.dispatch(transaction);
              };
              reader.readAsDataURL(image);
            }
          });
          return false;
        },
      },
    },
  });
};

// 创建图片
export const openFileWindow = (callbc) => {
  return new Promise((resolve) => {
    const imgInput = document.createElement("input");
    imgInput.type = "file";
    imgInput.hidden = true;
    imgInput.accept = "image/*";
    imgInput.click();
    imgInput.addEventListener("change", function (e) {
      const { files } = this;
      const file = files[0];
      resolve(file);
      // const src = await uploadImg(files[0]);
    });
  });
};

// 文件转base64
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};
