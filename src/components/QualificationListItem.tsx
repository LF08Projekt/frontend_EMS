import React from 'react';
import {Button} from 'react-bootstrap';
import { FaTrash, FaPen } from 'react-icons/fa';

type Qualification = {
    name: string;
};

type QualificationListItemProps = {
    qualification: Qualification;
    onEdit?: (q: Qualification) => void;
    onDelete?: (q: Qualification) => void;
};

const QualificationListItem: React.FC<QualificationListItemProps> = ({ qualification, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{qualification.name}</td>
            <td>
                <Button variant="outline-dark" size="sm" className="me-2" onClick={() => onEdit?.(qualification)}>
                    <FaPen />
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => onDelete?.(qualification)}>
                    <FaTrash />
                </Button>
            </td>
        </tr>
    );
};



export default QualificationListItem;