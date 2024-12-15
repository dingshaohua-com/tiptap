import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/pages/app/index'
import { MathfieldElement } from 'mathlive';


declare global {
    namespace JSX {
      interface IntrinsicElements {
        'math-field': React.DetailedHTMLProps<React.HTMLAttributes<MathfieldElement>, MathfieldElement>;
      }
    }
  }

createRoot(document.querySelector('#root')!).render( <App />,)
