import {Button, Container, Table} from "react-bootstrap";
import {useEmployeeApi} from "../hooks/useEmployeeApi.ts";
import {useState} from "react";
import EmployeeSearchBar from "../components/SearchBar.tsx";
import { mockEmployees } from "../data/mockEployees.ts";
import type { Employee } from "../types/employee";
import { ActionButtons } from "../components/Button.tsx";
import { DeleteModal } from "../components/Deletemodal.tsx";
import Tag from "../components/Tag.tsx";
import DetailCard from "../components/DetailCard.tsx";
// import { mock } from "node:test";


export function EmployeeTable() {

    const {fetchEmployees, error} = useEmployeeApi();
    const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleLoadEmployees = () => {
        fetchEmployees().then(data => setEmployees(data)).catch(err => console.error(err));
    }

    const handleSearch = (query: string) => {
        console.log("Search query:", query);
        // Filter mock data based on search query
        const filtered = mockEmployees.filter(emp => 
            emp.firstName.toLowerCase().includes(query.toLowerCase()) ||
            emp.lastName.toLowerCase().includes(query.toLowerCase()) ||
            emp.city.toLowerCase().includes(query.toLowerCase())
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

    const handleRowClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsDetailOpen(true);
    }

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedEmployee(null);
    }

    if (error) {
        return <div> {error}</div>;
    }

    return (
        <Container>
            <EmployeeSearchBar onSearch={handleSearch} />
            <Button onClick={handleLoadEmployees}>
                Mitarbeiter laden
            </Button>

            <Table>
                <thead>
                <tr>
                    <th></th>
                    <th>Vorname</th>
                    <th>Nachname</th>
                    <th>Abteilung</th>
                    <th>Stadt</th>
                    <th>Qualifikationen</th>
                    <th>Aktionen</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee, index) => (
                    <tr key={index} onClick={() => handleRowClick(employee)} style={{ cursor: 'pointer' }} className="employee-row">
                        <td>
                            <div className="table-avatar">
                                {employee.photo ? (
                                    <img src={employee.photo} alt={`${employee.firstName} ${employee.lastName}`} className="table-avatar-img" />
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8b92a9" strokeWidth="1.5">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="12" cy="7" r="4"></circle>
                                    </svg>
                                )}
                            </div>
                        </td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.city}</td>
                        <td>{employee.department}</td>
                        <td>
                            <div className="qualification-tags">
                                {employee.skillSet.map((qual, idx) => (
                                    <Tag key={idx} label={qual.skill} />
                                ))}
                            </div>
                        </td>
                        <td onClick={(e) => e.stopPropagation()}>
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

            <DetailCard
                employee={selectedEmployee}
                isOpen={isDetailOpen}
                onClose={handleCloseDetail}
            />
        </Container>
    )
};