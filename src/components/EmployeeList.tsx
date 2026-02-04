import {Table} from 'react-bootstrap';
import EmployeeListItem from "./EmployeeListItem.tsx";
import type {Employee} from "../types/employee";

type EmployeeListProps = {
    employees: Employee[];
    onEdit?: (employee: Employee) => void;
    onDelete?: (employee: Employee) => void;
    onRowClick?: (employee: Employee) => void;
};

function EmployeeList({employees, onEdit, onDelete, onRowClick}: EmployeeListProps) {
    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>Vorname</th>
                <th>Nachname</th>
                <th>Stadt</th>
                <th>Qualifikationen</th>
                <th>Aktionen</th>
            </tr>
            </thead>
            <tbody>
            {employees.map((employee, index) => (
                <EmployeeListItem
                    key={employee.id || index}
                    employee={employee}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onRowClick={onRowClick}
                />
            ))}
            </tbody>
        </Table>
    );
}

export default EmployeeList;
