import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CoverPageData, Theme } from '../types';
import { DEFAULT_COVER_PAGE_DATA } from '../constants/defaultData';

interface AppContextType {
  data: CoverPageData;
  setData: React.Dispatch<React.SetStateAction<CoverPageData>>;
  updateField: (field: keyof CoverPageData, value: string) => void;
  resetData: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<CoverPageData>(() => {
    const saved = localStorage.getItem('briu_cover_page_data');
    if (saved) {
      try {
        return { ...DEFAULT_COVER_PAGE_DATA, ...JSON.parse(saved) };
      } catch (e) {
        return DEFAULT_COVER_PAGE_DATA;
      }
    }
    return DEFAULT_COVER_PAGE_DATA;
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('briu_theme') as Theme;
    return saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });

  useEffect(() => {
    localStorage.setItem('briu_cover_page_data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('briu_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const updateField = (field: keyof CoverPageData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const resetData = () => {
    setData(DEFAULT_COVER_PAGE_DATA);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <AppContext.Provider value={{ data, setData, updateField, resetData, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
