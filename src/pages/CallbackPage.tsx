import React, {useEffect} from "react";
import {useAuth} from "react-oidc-context";
import {useNavigate} from "react-router-dom";

const CallbackPage: React.FC = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) {
            navigate("/employees");
        }
    }, [auth.isAuthenticated, navigate]);

    return <p>Authentifizierung läuft…</p>;
};

export default CallbackPage;
