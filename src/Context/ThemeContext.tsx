import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type ThemeContextType = {
    darkMode: boolean;
    setDarkMode: (value: boolean) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const STORAGE_KEY = "partlink-dark-mode";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [darkMode, setDarkModeState] = useState<boolean>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? stored === "true" : false;
    });

    useEffect(() => {
        document.documentElement.classList.remove("dark", "light");
        document.documentElement.classList.add(darkMode ? "dark" : "light");
        localStorage.setItem(STORAGE_KEY, String(darkMode));
    }, [darkMode]);

    const setDarkMode = (value: boolean) => setDarkModeState(value);

    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
    return ctx;
}
