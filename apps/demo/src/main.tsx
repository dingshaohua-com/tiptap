import 'mathlive';
import './index.css';
import axios from 'axios';
import App from '@/pages/app/index';
import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client';
import { EditorDefaultConfigProvider } from '@repo/tiptap-editor';

const defaultConfig = {
  imgBaseUrl: 'https://api.dingshaohua.com',
  imageUploadHandler: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post('https://api.dingshaohua.com/file/upload', formData);
    return res.data.data;
  },
  onImageUpload({ file, base64, url, id }) {
    console.log(file, base64, url, id);
  }
};

createRoot(document.querySelector('#root')!).render(
  <EditorDefaultConfigProvider {...defaultConfig}>
    <App />
  </EditorDefaultConfigProvider>,
);
