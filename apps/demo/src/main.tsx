import 'mathlive';
import './index.css'
import App from '@/pages/app/index'
import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client'

createRoot(document.querySelector('#root')!).render( <App />,)
