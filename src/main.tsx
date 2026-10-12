import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './design-system/tokens/colors.css'
import './design-system/tokens/typography.css'
import './design-system/tokens/spacing.css'
import './design-system/tokens/breakpoints.css'
  import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
