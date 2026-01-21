import './App.css'
import {Container, Nav, Navbar} from "react-bootstrap";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import RequireAuth from "./auth/RequireAuth.tsx";
import {EmployeeTable} from "./pages/EmployeeTable.tsx";
import {QualificationListPage} from "./pages/QualificationListPage.tsx";
import AddEmployeePage from "./pages/AddEmployeePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import {useAuth} from "react-oidc-context";
import CallbackPage from "./pages/CallbackPage.tsx";


function App() {
    const auth = useAuth();

    return (
        <Container>
            {auth.isAuthenticated && (
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/employees">Mitarbeiter</Nav.Link>
                                <Nav.Link as={Link} to="/qualifications">Qualifikationen</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}
            <Routes>
                <Route path="/" element={!auth.isAuthenticated ? <LoginPage/> : <Navigate to="/employees"/>}/>
                <Route path="/callback" element={<CallbackPage/>}/>
                <Route path="/employees" element={
                    <RequireAuth>
                        <EmployeeTable/>
                    </RequireAuth>
                }/>
                <Route path="/qualifications" element={
                    <RequireAuth>
                        <QualificationListPage/>
                    </RequireAuth>
                }/>
                <Route path="/addemployee" element={
                    <RequireAuth>
                        <AddEmployeePage/>
                    </RequireAuth>
                }/>
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>

        </Container>
    )
}

export default App
