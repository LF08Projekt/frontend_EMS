import {Container} from "react-bootstrap";
import {useEmployeeApi} from "../hooks/useEmployeeApi.ts";
import {useState} from "react";
import EmployeeSearchBar from "../components/SearchBar.tsx";
import {mockEmployees} from "../data/mockEployees.ts";
import type {Employee} from "../types/employee";
import {PrimaryButton} from "../components/Button.tsx";
import {DeleteModal} from "../components/Deletemodal.tsx";
import DetailCard from "../components/DetailCard.tsx";
import {useNavigate} from "react-router-dom";
import EmployeeList from "../components/EmployeeList.tsx";
import "./EmployeeTable.css";


export function EmployeeTable() {
    const {error} = useEmployeeApi();
    const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const handleSearch = (query: string) => {
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

    const navigate = useNavigate();

    const handleAddEmployee = () => {
        navigate('/addemployee');
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container className="employee-page">
            <div className="employee-header">
                <div className="employee-breadcrumbs">
                    <span className="crumb active">Mitarbeiterliste</span>
                </div>

                <div className="employee-header-actions">
                    <PrimaryButton
                        label="+ Mitarbeiter hinzufügen"
                        onClick={handleAddEmployee}
                    />
                </div>
            </div>

            <div className="employee-search-panel">
                <EmployeeSearchBar
                    placeholder="Mitarbeiter suchen..."
                    onSearch={handleSearch}
                />
            </div>

            <div className="employee-table-panel">
                <EmployeeList
                    employees={employees}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRowClick={handleRowClick}
                />
            </div>

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
    );
}

export default EmployeeTable;
