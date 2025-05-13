import { useState } from 'react';
import { RiFileImageLine } from '@remixicon/react';
import { Button, Tooltip, Popover, Input } from 'antd';
import { useFileUploader } from '../../../hooks/use-file-uploader';

const DesCmp = ({ editor, setOpen }) => {
  const { inputRef, file, uploading, error, selectFile, onFileChange } = useFileUploader({
    // url: 'http://localhost:3002/file/upload',
    url: 'https://api.dingshaohua.com/file/upload',
    onProgress: (percent, file) => {
      console.log(`Uploading ${file.name}: ${percent}%`);
    },
    onSuccess: (res, file) => {
      setOpen(false);
      const imgUrl = 'https://api.dingshaohua.com' + res.data;
      console.log(`Uploadedsuccessfully`, imgUrl);

      // 调用内置的 @tiptap/extension-image
      editor.chain().focus().setImage({ src: imgUrl }).run();
    },
    onError: (err, file) => {
      console.error(`Failed to upload ${file.name}`, err);
    },
  });
  // http://localhost:3003/assets/images/fe-fw-lib-7961ee52ada77d43b6b3d68daef3794d.png
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
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <Input
        value={netImg}
        onChange={(e: any) => setNetImg(e.target.value)}
        style={{ width: '120px' }}
        addonAfter={
          <span style={{ cursor: 'pointer' }} onClick={insertNetImg}>
            确定
          </span>
        }
        placeholder="网络地址"
      />
      或
      <span style={{ color: 'blue', cursor: 'pointer' }} onClick={onSelectFile}>
        本地上传
      </span>
      {/* 渲染隐藏的input元素 */}
      <input type="file" ref={inputRef} onChange={onFileChange} style={{ display: 'none' }} multiple />
    </div>
  );
};

const imgUpload = ({ editor }) => {
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
    <div className="fontStyle">
      <Tooltip title="图片">
        <Popover content={<DesCmp editor={editor} setOpen={setOpen} />} title="" open={open} trigger="click" destroyOnHidden={true} onOpenChange={handleOpenChange} getPopupContainer={trigger => trigger.parentNode as HTMLElement}>
          <Button onClick={show} color="default" variant="filled" autoInsertSpace>
            <RiFileImageLine />
          </Button>
        </Popover>
      </Tooltip>
    </div>
  );
};

export default imgUpload;
