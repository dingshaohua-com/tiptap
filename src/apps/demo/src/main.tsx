import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/pages/app/index'
import 'mathlive';

createRoot(document.querySelector('#root')!).render( <App />,)
