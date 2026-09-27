import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type TextSize = "Small" | "Default" | "Large";

type TextSizeContextType = {
    textSize: TextSize;
    setTextSize: (size: TextSize) => void;
};

const TextSizeContext = createContext<TextSizeContextType | undefined>(undefined);

const STORAGE_KEY = "partlink-text-size";

export function TextSizeProvider({ children }: { children: ReactNode }) {
    const [textSize, setTextSizeState] = useState<TextSize>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return (stored as TextSize) || "Default";
    });

    useEffect(() => {
        document.documentElement.classList.remove("text-small", "text-default", "text-large");
        document.documentElement.classList.add(
            textSize === "Small" ? "text-small" : textSize === "Large" ? "text-large" : "text-default"
        );
        localStorage.setItem(STORAGE_KEY, textSize);
    }, [textSize]);

    const setTextSize = (size: TextSize) => setTextSizeState(size);

    return (
        <TextSizeContext.Provider value={{ textSize, setTextSize }}>
            {children}
        </TextSizeContext.Provider>
    );
}

export function useTextSize() {
    const ctx = useContext(TextSizeContext);
    if (!ctx) throw new Error("useTextSize must be used within a TextSizeProvider");
    return ctx;
}
