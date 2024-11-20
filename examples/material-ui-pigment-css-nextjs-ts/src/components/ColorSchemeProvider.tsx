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

const ColorSchemeContext = createContext<{
  colorScheme: string;
  setColorScheme: Dispatch<SetStateAction<string>>;
}>({
  colorScheme: 'dark',
  setColorScheme: () => '',
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

export const ColorSchemeProvider = ({
  colorScheme: initialColorScheme,
  children,
}: PropsWithChildren<{ colorScheme: string }>) => {
  const [colorScheme, setColorScheme] = useState<string>(initialColorScheme);

  // Set the colorScheme in localStorage
  useEffect(() => {
    setCookie('colorScheme', colorScheme);
    localStorage.setItem('colorScheme', colorScheme);
  }, [colorScheme]);

  // Handle when localStorage has changed
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      const value = event.newValue;
      if (
        typeof event.key === 'string' &&
        event.key === 'colorScheme' &&
        typeof value === 'string'
      ) {
        setColorScheme(value);
      }
    };
    // For syncing color-scheme changes between iframes
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, [setColorScheme]);

  return (
    <ColorSchemeContext.Provider value={{ colorScheme, setColorScheme }}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = () => {
  return useContext(ColorSchemeContext);
};
