/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const PreferencesContext = createContext(null);

const STORAGE_KEY = 'guardo_prefs_v1';

const DEFAULTS = {
  largeText: false,
  highContrast: false,
  reduceMotion: false,
  dyslexiaFont: false,
};

function safeParse(json) {
  try { return JSON.parse(json); } catch { return null; }
}

function readPrefs() {
  const raw = safeParse(localStorage.getItem(STORAGE_KEY));
  if (!raw || typeof raw !== 'object') return DEFAULTS;
  return { ...DEFAULTS, ...raw };
}

function applyBodyClasses(prefs) {
  const cls = document.body.classList;
  cls.toggle('pref-large-text', !!prefs.largeText);
  cls.toggle('pref-high-contrast', !!prefs.highContrast);
  cls.toggle('pref-reduce-motion', !!prefs.reduceMotion);
  cls.toggle('pref-dyslexia-font', !!prefs.dyslexiaFont);
}

export function PreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState(() => {
    try { return readPrefs(); } catch { return DEFAULTS; }
  });

  useEffect(() => {
    applyBodyClasses(prefs);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs)); } catch (e) { void e; }
  }, [prefs]);

  const api = useMemo(() => ({
    prefs,
    setPrefs,
    toggle: (key) => setPrefs(p => ({ ...p, [key]: !p[key] })),
    reset: () => setPrefs(DEFAULTS),
  }), [prefs]);

  return (
    <PreferencesContext.Provider value={api}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used within PreferencesProvider');
  return ctx;
}

