import {useAuth} from "react-oidc-context";
import type {JSX} from "react";

export default function RequireAuth({children}: { children: JSX.Element }) {
    const auth = useAuth();



    if (auth.isLoading) return <p>Lädt…</p>;
    if (auth.error) return <p>Fehler: {auth.error.message}</p>;

    if (!auth.isAuthenticated) {
        auth.signinRedirect();
        return <div>Weiterleitung zum Login...</div>;
    }
    return children;
}