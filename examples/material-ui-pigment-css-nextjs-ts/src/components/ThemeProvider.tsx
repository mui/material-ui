'use client';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useEffect,
  createContext,
  useContext,
  useState,
} from 'react';

const ThemeContext = createContext<{
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}>({
  theme: 'dark',
  setTheme: () => '',
});

function setCookie(name: string, value: string, days: number = 100) {
  var expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

export const ThemeProvider = ({
  theme: initialTheme,
  children,
}: PropsWithChildren<{ theme: string }>) => {
  const [theme, setTheme] = useState<string>(initialTheme);

  // Set the theme in localStorage
  useEffect(() => {
    setCookie('theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Handle when localStorage has changed
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      const value = event.newValue;
      if (typeof event.key === 'string' && event.key === 'theme' && typeof value === 'string') {
        setTheme(value);
      }
    };
    // For syncing color-scheme changes between iframes
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [setTheme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
