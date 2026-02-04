import React, {useState} from 'react';
import {Button, Form} from 'react-bootstrap';
import {FaTrash, FaPen, FaCheck, FaTimes} from 'react-icons/fa';
import type {Qualification} from '../types/employee.ts';


type QualificationListItemProps = {
    qualification: Qualification;
    onEdit?: (q: Qualification, newName: string) => void;
    onDelete?: (q: Qualification) => void;
};

const QualificationListItem: React.FC<QualificationListItemProps> = ({qualification, onEdit, onDelete}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(qualification.skill);

    const handleStartEdit = () => {
        setEditValue(qualification.skill);
        setIsEditing(true);
    };

    const handleSaveEdit = () => {
        const trimmed = editValue.trim();
        if (trimmed && trimmed !== qualification.skill) {
            onEdit?.(qualification, trimmed);
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditValue(qualification.skill);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    return (
        <tr>
            <td style={{width: '50%'}}>
                {isEditing ? (
                    <Form.Control
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                ) : (
                    qualification.skill
                )}
            </td>
            <td>
                {isEditing ? (
                    <>
                        <Button variant="outline-success" size="sm" className="me-2" onClick={handleSaveEdit}>
                            <FaCheck/>
                        </Button>
                        <Button variant="outline-secondary" size="sm" className="me-2" onClick={handleCancelEdit}>
                            <FaTimes/>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button variant="outline-dark" size="sm" className="me-2" onClick={handleStartEdit}>
                            <FaPen/>
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => onDelete?.(qualification)}>
                            <FaTrash/>
                        </Button>
                    </>
                )}
            </td>
        </tr>
    );
};


export default QualificationListItem;