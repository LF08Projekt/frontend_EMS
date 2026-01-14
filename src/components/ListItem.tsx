import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { FaTrash, FaPen } from 'react-icons/fa';

type Employee = {
    name: string;
    location: string;
    qualifications: string[];
};

type EmployeeListItemProps = {
    employee: Employee;
    onEdit?: (employee: Employee) => void;
    onDelete?: (employee: Employee) => void;
};

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({ employee, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{employee.name}</td>
            <td>{employee.location}</td>
            <td>
                {employee.qualifications.map((q, idx) => (
                    <Badge key={idx} bg="secondary" className="me-1">
                        {q}
                    </Badge>
                ))}
            </td>
            <td>
                <Button variant="outline-dark" size="sm" className="me-2" onClick={() => onEdit?.(employee)}>
                    <FaPen />
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete?.(employee)}>
                    <FaTrash />
                </Button>
            </td>
        </tr>
    );
};

export default EmployeeListItem;