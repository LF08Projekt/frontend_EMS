import {Button, Container, Table} from "react-bootstrap";
import {useEmployeeApi} from "../hooks/useEmployeeApi.ts";
import {useState} from "react";
import EmployeeSearchBar from "../components/SearchBar.tsx";

interface Employee {
    firstName: string;
    lastName: string;
}

export function EmployeeTable() {

    const {fetchEmployees, loading, error} = useEmployeeApi();
    const [employees, setEmployees] = useState<Employee[]>([]);

    const handleLoadEmployees = () => {
        fetchEmployees().then(data => setEmployees(data)).catch(err => console.error(err));
    }

    if (loading) {
        return <div>Lade Mitarbeiter...</div>;
    }

    if (error) {
        return <div> {error}</div>;
    }

    return (
        <Container>
            <Button onClick={handleLoadEmployees}>
                Mitarbeiter laden
            </Button>
            <EmployeeSearchBar onSearch={(query) => {
                <Button onClick={handleLoadEmployees}>
                Mitarbeiter laden
            </Button>
                console.log("Search query:", query);
            }} />
            <Table>
                <thead>
                <tr>
                    <th>Vorname</th>
                    <th>Nachname</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee, index) => (
                    <tr key={index}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </Container>
    )
}