
import React from 'react';
import type { Employee } from '../types/employee';

interface DeleteModalProps {
  isOpen: boolean;
  employee: Employee | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  employee,
  onConfirm,
  onCancel
}) => {
  if (!isOpen || !employee) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Delete Employee</h3>
        <p>
          Are you sure you want to delete{" "}
          <strong>{employee.firstName} {employee.lastName}</strong>?
          <br />
          This action cannot be undone.
        </p>
        
        <div className="modal-actions">
          <button 
            onClick={onCancel}
            className="cancel-button"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="confirm-delete-button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
