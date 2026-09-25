import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import { supabase } from "../lib/supabaseClient";
import type { User } from "@supabase/supabase-js";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => {},
    refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        try {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error) {
                console.error(
                    "Error getting current user:",
                    error
                );
                setUser(null);
                return;
            }

            setUser(user ?? null);
        } catch (error) {
            console.error(
                "Unexpected error getting current user:",
                error
            );
            setUser(null);
        }
    };

    useEffect(() => {
        let mounted = true;

        const initializeAuth = async () => {
            console.log("Auth: checking current session...");

            try {
                const {
                    data: { session },
                    error,
                } = await supabase.auth.getSession();

                if (error) {
                    console.error(
                        "Auth: error getting session:",
                        error
                    );

                    if (mounted) {
                        setUser(null);
                    }

                    return;
                }

                console.log(
                    "Auth: session found:",
                    session?.user?.email || "No user"
                );

                if (mounted) {
                    setUser(session?.user ?? null);
                }
            } catch (error) {
                console.error(
                    "Auth: error restoring session:",
                    error
                );

                if (mounted) {
                    setUser(null);
                }
            } finally {
                console.log("Auth: finished loading.");

                if (mounted) {
                    setLoading(false);
                }
            }
        };

        initializeAuth();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                console.log(
                    "Auth state changed:",
                    _event,
                    session?.user?.email || "No user"
                );

                if (mounted) {
                    setUser(session?.user ?? null);
                    setLoading(false);
                }
            }
        );

        return () => {
            mounted = false;
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
        <AuthContext.Provider
            value={{
                user,
                loading,
                signOut,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
