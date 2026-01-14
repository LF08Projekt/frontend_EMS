/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Button, Spinner } from "react-bootstrap";
import type { Employee } from "../types/employee";
import editIcon from "../assets/edit.svg.png";
import deleteIcon from "../assets/delete.svg.png";


interface PrimaryButtonProps {
    label: string;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    isLoading?: boolean;
    disabled?: boolean;
    className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
                                                                label,
                                                                onClick,
                                                                type = "button",
                                                                isLoading = false,
                                                                disabled = false,
                                                                className = "",
                                                            }) => {
    return (
        <Button
            type={type}
            variant="secondary"
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`px-4 py-2 ${className}`}
        >
            {isLoading ? (
                <>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                    />
                    Lädt...
                </>
            ) : (
                label
            )}
        </Button>
    );
};
interface ActionButtonProps {
    employee: Employee;
    onEdit?: (employee: Employee) => void;
    onDelete?: (employeeId: Employee) => void;
}

export const ActionButtons: React.FC<ActionButtonProps> = ({
    employee,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="action-buttons">
            <Button
                onClick={() => onEdit?.(employee)}
                className="edit-button"
                title="edit"
                variant="light"
                size="sm"
            >
                <img src={editIcon} alt="Edit" style={{ width: '30px', height: '30px' }} />
            </Button>
            <Button
                onClick={() => onDelete?.(employee)}
                className="delete-button"
                title="delete"
                variant="light"
                size="sm"
            >
                <img src={deleteIcon} alt="Delete" style={{ width: '25px', height: '25px' }} />
            </Button>
        </div>
    );
}
