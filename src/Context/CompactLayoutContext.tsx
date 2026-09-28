import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type CompactLayoutContextType = {
    compactLayout: boolean;
    setCompactLayout: (value: boolean) => void;
};

const CompactLayoutContext = createContext<CompactLayoutContextType | undefined>(undefined);

const STORAGE_KEY = "partlink-compact-layout";

export function CompactLayoutProvider({ children }: { children: ReactNode }) {
    const [compactLayout, setCompactLayoutState] = useState<boolean>(() => {
        return localStorage.getItem(STORAGE_KEY) === "true";
    });

    useEffect(() => {
        document.documentElement.classList.toggle("compact-layout", compactLayout);
        localStorage.setItem(STORAGE_KEY, String(compactLayout));
    }, [compactLayout]);

    const setCompactLayout = (value: boolean) => setCompactLayoutState(value);

    return (
        <CompactLayoutContext.Provider value={{ compactLayout, setCompactLayout }}>
            {children}
        </CompactLayoutContext.Provider>
    );
}

export function useCompactLayout() {
    const ctx = useContext(CompactLayoutContext);
    if (!ctx) throw new Error("useCompactLayout must be used within a CompactLayoutProvider");
    return ctx;
}
