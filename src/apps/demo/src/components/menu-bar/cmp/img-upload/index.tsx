import { Button, Tooltip, Popover, Input } from 'antd';
import { RiFileImageLine } from '@remixicon/react';
import { useState } from 'react';
import { useFileUploader } from '@/hooks/use-file-uploader';

const description = () => {
  const { inputRef, file, uploading, error, selectFile, onFileChange } =
    useFileUploader({
      url: 'https://api.dingshaohua.com/api/file/upload',
      onProgress: (percent, file) => {
        console.log(`Uploading ${file.name}: ${percent}%`);
      },
      onSuccess: (res, file) => {
        console.log(`Uploaded ${file.name} successfully`, res);
      },
      onError: (err, file) => {
        console.error(`Failed to upload ${file.name}`, err);
      },
    });
  const onSelectFile = () => {
    console.log(123);

    selectFile();
  };

  return (
    <div>
      <Input
        addonAfter={<span style={{ cursor: 'pointer' }}>确定</span>}
        placeholder="网络地址"
      />
      <div>
        或
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={onSelectFile}
        >
          本地上传
        </span>
        {/* 渲染隐藏的input元素 */}
        <input
          type="file"
          ref={inputRef}
          onChange={onFileChange}
          style={{ display: 'none' }}
          multiple
        />
      </div>
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
        <Popover
          content={description}
          title=""
          open={open}
          trigger="click"
          destroyTooltipOnHide={true}
          onOpenChange={handleOpenChange}
        >
          <Button
            onClick={show}
            color="default"
            variant="filled"
            autoInsertSpace
          >
            <RiFileImageLine />
          </Button>
        </Popover>
      </Tooltip>
    </div>
  );
};

export default imgUpload;
