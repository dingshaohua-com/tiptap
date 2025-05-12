import axios from 'axios';
import { useRef, useState, useCallback } from 'react';

interface UploadOptions {
  url: string;
  fieldName?: string; // default 'file'
  headers?: Record<string, string>;
  onProgress?: (percent: number, file: File) => void;
  onSuccess?: (response: any, file: File) => void;
  onError?: (error: any, file: File) => void;
}

export function useFileUploader(options: UploadOptions) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectFile = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const uploadFile = useCallback(
    async (fileToUpload: File) => {
      const formData = new FormData();
      formData.append(options.fieldName || 'file', fileToUpload);

      try {
        setUploading(true);
        setError(null);

        const response = await axios.post(options.url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...options.headers,
          },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / (e.total || 1));
            options.onProgress?.(percent, fileToUpload);
          },
        });

        options.onSuccess?.(response.data, fileToUpload);
      } catch (err) {
        setError('上传失败');
        options.onError?.(err, fileToUpload);
      } finally {
        setUploading(false);
      }
    },
    [options],
  );

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0];
      e.target.value = ''; // 允许重新选同一文件

      if (selected) {
        setFile(selected);
        uploadFile(selected);
      }
    },
    [uploadFile],
  );

  return {
    inputRef,
    file,
    uploading,
    error,
    selectFile,
    onFileChange,
  };
}
