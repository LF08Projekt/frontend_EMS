import React from 'react';
import {PrimaryButton} from "../components/Button.tsx";
import {useAuth} from "react-oidc-context";


const LoginPage: React.FC = () => {
    const auth = useAuth();

    const handleLogin = () => {
        auth.signinRedirect();
    };


    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8f9fa'
            }}
        >
            <div style={{textAlign: 'center'}}>
                <h2 style={{marginBottom: '1.5rem'}}>Employee Management Service</h2>
                <PrimaryButton label="Login" onClick={handleLogin}/>
            </div>
        </div>
    );
};

export default LoginPage;
