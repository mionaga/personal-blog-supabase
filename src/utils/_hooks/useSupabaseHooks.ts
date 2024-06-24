'use client'

import { supabase } from "@/utils/supabase"
import { Session } from '@supabase/supabase-js'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useSupabaseSessions = () => {
    const [session, setSession] = useState<Session | null | undefined>(undefined);
    const [token, setToken] = useState<string | null >(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAuth = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setSession(session);
            setToken(session?.access_token || null)
            setIsLoading(false)
        }

        // Listen for auth state changes
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            setSession(session);
            setToken(session?.access_token || null);
            setIsLoading(false);
        });

        fetchAuth();

        // Cleanup the listener on unmount
        return () => {
            authListener.subscription.unsubscribe();
        };
    }, [])

    return { session, isLoading, token };
}

export const useRouteGuard = () => {
    const router = useRouter()
    const { session, isLoading} = useSupabaseSessions()

    useEffect(() => {
        // if (session == undefined) return;

        // const fetchSession = async () => {
        //     if (session === null) {
        //         router.replace('/login')
        //     }
        // }

        // fetchSession();
        if (isLoading) return; // Loadingが完了するまで待つ

        if (session === null) {
            router.replace('/login');
        }
    }, [router, session, isLoading])
}