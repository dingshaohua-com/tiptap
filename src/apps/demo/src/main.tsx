import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/pages/app/index'
import 'mathlive';
import '@ant-design/v5-patch-for-react-19';

createRoot(document.querySelector('#root')!).render( <App />,)
