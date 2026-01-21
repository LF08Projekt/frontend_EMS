import React from 'react';
import {Button} from 'react-bootstrap';
import {FaTrash, FaPen} from 'react-icons/fa';
import type {Employee} from "../types/employee";
import Tag from "./Tag.tsx";

type EmployeeListItemProps = {
    employee: Employee;
    onEdit?: (employee: Employee) => void;
    onDelete?: (employee: Employee) => void;
    onRowClick?: (employee: Employee) => void;
};

const EmployeeListItem: React.FC<EmployeeListItemProps> = ({employee, onEdit, onDelete, onRowClick}) => {
    return (
        <tr
            onClick={() => onRowClick?.(employee)}
            style={{cursor: 'pointer'}}
        >
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.city}</td>
            <td>
                <div className="qualification-tags">
                    {employee.skillSet.map((qual, idx) => (
                        <Tag key={idx} label={qual.skill}/>
                    ))}
                </div>
            </td>
            <td onClick={(e) => e.stopPropagation()}>
                <Button variant="outline-dark" size="sm" className="me-2" onClick={() => onEdit?.(employee)}>
                    <FaPen/>
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete?.(employee)}>
                    <FaTrash/>
                </Button>
            </td>
        </tr>
    );
};

export default EmployeeListItem;
