import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PreferencesProvider } from './context/PreferencesContext.jsx'

const rootEl = document.getElementById('root')

// #region agent log
fetch('http://127.0.0.1:7497/ingest/441325da-a54d-4149-8145-ea1d5aa2766b', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '2857d3' }, body: JSON.stringify({ sessionId: '2857d3', runId: 'baseline', hypothesisId: 'H_BOOT', location: 'src/main.jsx:8', message: 'main.jsx boot', data: { hasRoot: !!rootEl, mode: import.meta.env.MODE, href: window.location.href }, timestamp: Date.now() }) }).catch(() => {})
// #endregion

createRoot(rootEl).render(
  <StrictMode>
    <PreferencesProvider>
      <App />
    </PreferencesProvider>
  </StrictMode>,
)
