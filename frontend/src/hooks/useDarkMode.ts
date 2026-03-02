import { useState, useEffect } from 'react';

/**
 * Persists dark mode preference in localStorage and toggles the `dark`
 * class on <html>. Falls back to the OS prefers-color-scheme on first visit.
 *
 * Returns [isDark, toggleDark].
 */
export function useDarkMode(): [boolean, () => void] {
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved !== null) return saved === 'dark';
    } catch {
      // localStorage may be blocked in some private-browsing contexts
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Toggle the .dark class on <html> — Tailwind's class-based dark variant
    // reads this selector (configured via @variant dark in index.css)
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    } catch {
      // ignore write failures
    }
  }, [isDark]);

  const toggleDark = (): void => setIsDark((prev) => !prev);
  return [isDark, toggleDark];
}
