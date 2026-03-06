import { useMemo } from 'react';
import Navbar from '../components/Navbar';
import { usePreferences } from '../context/PreferencesContext.jsx';
import './Settings.css';

function ToggleRow({ title, desc, checked, onChange }) {
  return (
    <div className="set-row">
      <div className="set-row-text">
        <div className="set-row-title">{title}</div>
        <div className="set-row-desc">{desc}</div>
      </div>
      <label className="set-switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="set-slider" aria-hidden="true" />
      </label>
    </div>
  );
}

export default function Settings() {
  const { prefs, toggle, reset } = usePreferences();

  const rows = useMemo(() => ([
    {
      key: 'largeText',
      title: 'Larger text',
      desc: 'Makes text easier to read across the app.',
    },
    {
      key: 'highContrast',
      title: 'High contrast',
      desc: 'Stronger color contrast for improved readability.',
    },
    {
      key: 'reduceMotion',
      title: 'Reduce motion',
      desc: 'Disables animations and transitions.',
    },
    {
      key: 'dyslexiaFont',
      title: 'Dyslexia-friendly font',
      desc: 'Uses a clearer system font and slightly more spacing.',
    },
  ]), []);

  return (
    <div className="set-root">
      <Navbar />
      <div className="set-wrap">
        <div className="card set-card">
          <div className="set-head">
            <div>
              <h1 className="set-title">Settings</h1>
              <p className="set-sub text-muted">Accessibility and usability preferences (saved on this device).</p>
            </div>
            <button className="btn btn-ghost" onClick={reset}>Reset</button>
          </div>

          <div className="set-list">
            {rows.map(r => (
              <ToggleRow
                key={r.key}
                title={r.title}
                desc={r.desc}
                checked={!!prefs[r.key]}
                onChange={() => {
                  toggle(r.key);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

