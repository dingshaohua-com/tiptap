import md5 from 'md5';
import { useState } from 'react';
import { getFilename } from '../../../utils';
import { Feature } from '../../../utils/enum';
import { getFileExtension } from '../../../utils';
import { RiFileImageLine } from '@remixicon/react';
import { useEditorConfig } from '../../../config-ctx';
import { Button, Tooltip, Popover, Input } from 'antd';
import { useFileUploader } from '../../../hooks/use-file-uploader';
import { fileToBase64, TexttoBase64 } from '../../../utils/toBase64';

const DesCmp = ({ editor, setOpen, config }) => {
  const { inputRef, selectFile, onFileChange } = useFileUploader({
    handler: config.imageUploadHandler,
    onSuccess: async (res, file) => {
      setOpen(false);
      const url = (config.imgBaseUrl || '') + res;
      editor.chain().focus().setImage({ src: url }).run(); // 调用内置的 @tiptap/extension-image
      const filename = getFilename(url);
      const base64Filename = TexttoBase64(filename);
      const id = md5(base64Filename);
      const base64 = await fileToBase64(file);
      const extension = getFileExtension(url);
      config?.onImageUpload && config?.onImageUpload({ base64, file, url, id, md5FileName: `${id}.${extension}` });
    },
    onError: (err, file) => {
      console.error(`Failed to upload ${file.name}`, err);
    },
  });
  const onSelectFile = () => {
    selectFile();
  };

  const insertNetImg = () => {
    if (netImg) {
      editor.chain().focus().setImage({ src: netImg }).run();
      setOpen(false);
    } else {
      alert('图片地址为空！');
    }
  };

  const [netImg, setNetImg] = useState();
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="no-blur">
      <Input
        value={netImg}
        onChange={(e: any) => setNetImg(e.target.value)}
        style={{ width: 'max-content' }}
        addonAfter={
          <span style={{ cursor: 'pointer' }} onClick={insertNetImg}>
            确定
          </span>
        }
        placeholder="网络地址"
      />
      或
      <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onSelectFile} onMouseDown={(e) => e.preventDefault()}>
        本地上传
      </span>
      <input type="file" ref={inputRef} onChange={onFileChange} style={{ display: 'none' }} multiple accept="image/*" />
    </div>
  );
};

const ImgUpload = () => {
  const config = useEditorConfig();
  const editor = config.editor!;
  if (!config.features.includes(Feature.imgupload)) return null;

  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
  };
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  return (
    <>
      {config.imageUploadHandler ? (
        <Tooltip title="图片">
          <Popover content={<DesCmp editor={editor} setOpen={setOpen} config={config} />} title="" open={open} trigger="click" destroyOnHidden={true} onOpenChange={handleOpenChange}>
            <Button onClick={show} color="default" variant="filled" autoInsertSpace onMouseDown={(e) => e.preventDefault()}>
              <RiFileImageLine />
            </Button>
          </Popover>
        </Tooltip>
      ) : (
        <Button color="default" variant="filled" autoInsertSpace style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          <RiFileImageLine />
        </Button>
      )}
    </>
  );
};

export default ImgUpload;
