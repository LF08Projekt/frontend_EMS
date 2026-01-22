import {Container} from "react-bootstrap";
import {useEmployeeApi} from "../hooks/useEmployeeApi.ts";
import {useEffect, useState} from "react";
import type {Employee} from "../types/employee";
import {PrimaryButton} from "../components/Button.tsx";
import DetailCard from "../components/DetailCard.tsx";
import {useNavigate} from "react-router-dom";
import EmployeeList from "../components/EmployeeList.tsx";
import "./EmployeeTable.css";
import GenericModal from "../components/Deletemodal.tsx";
import {useDebounce} from "../hooks/useDebounce.ts";
import SearchBar from "../components/SearchBar.tsx";
import {useCallback} from "react";


export function EmployeeTable() {
    const {fetchEmployees, deleteEmployee, loading, error} = useEmployeeApi();
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
    const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);


    const loadEmployees = useCallback(async () => {
        const data = await fetchEmployees();
        if (data) {
            setEmployees(data);
            setFilteredEmployees(data);
        }
    }, [fetchEmployees]);


    useEffect(() => {
        loadEmployees();
    }, [loadEmployees]);


    const handleSearch = useCallback((query: string) => {
        const lower = query.toLowerCase();

        const filtered = employees.filter(emp =>
            emp.firstName.toLowerCase().includes(lower) ||
            emp.lastName.toLowerCase().includes(lower) ||
            emp.city.toLowerCase().includes(lower) ||
            emp.skillSet.some(skill => skill.skill.toLowerCase().includes(lower))
        );

        setFilteredEmployees(filtered);
    }, [employees]);

    useEffect(() => {
        handleSearch(debouncedSearch);
    }, [debouncedSearch, handleSearch]);

    const handleEdit = (employee: Employee) => {
        navigate(`/editemployee/${employee.id}`);
    };


    const handleDelete = (employee: Employee) => {
        setEmployeeToDelete(employee);
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (employeeToDelete?.id) {
            const success = await deleteEmployee(employeeToDelete.id);
            if (success) {
                await loadEmployees();
                setIsModalOpen(false);
                setEmployeeToDelete(null);
            }
        }
    };

    const handleDeleteCancel = () => {
        setIsModalOpen(false);
        setEmployeeToDelete(null);
    };

    const handleRowClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedEmployee(null);
    };

    const navigate = useNavigate();

    const handleAddEmployee = () => {
        navigate('/addemployee');
    };

    if (loading) {
        return <div>Laden...</div>;
    }

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
                <SearchBar
                    placeholder="Mitarbeiter suchen..."
                    onSearch={(value) => setSearchTerm(value)}
                />
            </div>

            <div className="employee-table-panel">
                <EmployeeList
                    employees={filteredEmployees}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onRowClick={handleRowClick}
                />
            </div>

            <GenericModal
                isOpen={isModalOpen}
                title="Mitarbeiter/in löschen"
                body={
                    <>
                        Wollen Sie den/die
                        Mitarbeiter/in <strong>{employeeToDelete?.firstName} {employeeToDelete?.lastName}</strong> wirklich
                        löschen?
                    </>
                }
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
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
