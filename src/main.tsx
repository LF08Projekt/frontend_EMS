import 'bootstrap/dist/css/bootstrap.min.css'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "react-oidc-context";

const oidc = {
    authority: "http://localhost:9000/application/o/employee_api",
    client_id: "employee_api_client",
    redirect_uri: `${window.location.origin}/callback`,
    post_logout_redirect_uri: `${window.location.origin}/`,
    response_type: "code",
    scope: "openid profile email",
};


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider {...oidc}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </AuthProvider>
    </StrictMode>,
)
