import React from 'react';
import { Container } from 'react-bootstrap';
import {PrimaryButton} from "../components/Button.tsx";

type LoginPageProps = {
    onLogin: () => void;
};

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    return (
        <Container
            fluid
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#f8f9fa'
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <h2 style={{ marginBottom: '1.5rem' }}>Employee Management Service</h2>
                <PrimaryButton label="Login" onClick={onLogin} />
            </div>
        </Container>
    );
};

export default LoginPage;
