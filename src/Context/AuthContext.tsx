import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import type { User } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error("refreshUser error:", error);
            return;
        }
        setUser(data.user ?? null);
    };

    useEffect(() => {
        let mounted = true;

        // Safety net: never stay on "loading" forever
        const timeout = setTimeout(() => {
            if (mounted) {
                console.warn("Auth: timed out, continuing without session");
                setLoading(false);
            }
        }, 4000);

        // Fires INITIAL_SESSION on startup, then SIGNED_IN / SIGNED_OUT / USER_UPDATED
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!mounted) return;
            // Keep this callback synchronous: do NOT await other supabase calls in here
            setUser(session?.user ?? null);
            setLoading(false);
            clearTimeout(timeout);
        });

        return () => {
            mounted = false;
            clearTimeout(timeout);
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error);
            return;
        }
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth must be used inside <AuthProvider>");
    }
    return ctx;
}