import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './Context/ThemeContext'
import { LanguageProvider } from './Context/LanguageContext'
import { TextSizeProvider } from './Context/TextSizeContext'
import { CompactLayoutProvider } from './Context/CompactLayoutContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <TextSizeProvider>
          <CompactLayoutProvider>
            <App />
          </CompactLayoutProvider>
        </TextSizeProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
