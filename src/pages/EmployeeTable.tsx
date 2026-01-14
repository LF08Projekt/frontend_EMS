import {Button, Container, Row, Table} from "react-bootstrap";
import {useEmployeeApi} from "../hooks/useEmployeeApi.ts";
import {useState} from "react";
import EmployeeSearchBar from "../components/SearchBar.tsx";
import { mockEmployees } from "../data/mockEployees.ts";
import type { Employee } from "../types/employees";
import {ActionButtons, PrimaryButton} from "../components/Button.tsx";
import { DeleteModal } from "../components/Deletemodal.tsx";
import {useNavigate} from "react-router-dom";
// import { mock } from "node:test";


function EmployeeTable() {

    const {fetchEmployees, loading, error} = useEmployeeApi();
    const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
    const [searchTerm, setSearchTerm] = useState('');
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLoadEmployees = () => {
        fetchEmployees().then(data => setEmployees(data)).catch(err => console.error(err));
    }

    const handleSearch = (query: string) => {
        console.log("Search query:", query);
        // Filter mock data based on search query
        const filtered = mockEmployees.filter(emp => 
            emp.firstName.toLowerCase().includes(query.toLowerCase()) ||
            emp.lastName.toLowerCase().includes(query.toLowerCase()) ||
            emp.department.toLowerCase().includes(query.toLowerCase())
        );
        setEmployees(filtered);
    }

    const handleEdit = (employee: Employee) => {
        console.log("Edit employee:", employee);
        alert(`Edit employee: ${employee.firstName} ${employee.lastName}`);
    }

    const handleDelete = (employee: Employee) => {
        setEmployeeToDelete(employee);
        setIsModalOpen(true);
    }

    const handleDeleteConfirm = () => {
        if (employeeToDelete) {
            setEmployees(employees.filter(emp => emp !== employeeToDelete));
            setIsModalOpen(false);
            setEmployeeToDelete(null);
        }
    }

    const handleDeleteCancel = () => {
        setIsModalOpen(false);
        setEmployeeToDelete(null);
    }

    const navigate = useNavigate();

    const handleAddEmployee = () => {
        navigate('/addemployee');
    };

    if (error) {
        return <div> {error}</div>;
    }


    return (
        <Container>
            <EmployeeSearchBar onSearch={handleSearch} />
            <Row className="mb-2">
            <Button onClick={handleLoadEmployees}>
                Mitarbeiter laden
            </Button>
            <PrimaryButton label={"Mitarbeiter hinzufügen"} onClick={handleAddEmployee}/>
            </Row>

            <Table>
                <thead>
                <tr>
                    <th>Vorname</th>
                    <th>Nachname</th>
                    <th>Abteilung</th>
                    <th>Standort</th>
                    <th>Qualifikationen</th>
                    <th>Position</th>
                    <th>Aktionen</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee, index) => (
                    <tr key={index}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.department}</td>
                        <td>{employee.location}</td>
                        <td>{employee.qualifications.join(", ")}</td>
                        <td>{employee.position}</td>
                        <td>
                            <ActionButtons 
                                employee={employee}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            <DeleteModal
                isOpen={isModalOpen}
                employee={employeeToDelete}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </Container>
    )
}

export default EmployeeTable
;