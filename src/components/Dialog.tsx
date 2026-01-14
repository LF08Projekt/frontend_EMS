import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type DeleteEmployeeDialogProps = {
    show: boolean;
    employeeName: string;
    onCancel: () => void;
    onConfirm: () => void;
};

const DeleteEmployeeDialog: React.FC<DeleteEmployeeDialogProps> = ({
                                                                       show,
                                                                       employeeName,
                                                                       onCancel,
                                                                       onConfirm,
                                                                   }) => {
    return (
        <Modal show={show} onHide={onCancel} centered>
            <Modal.Header closeButton>
                <Modal.Title>Mitarbeiter/in löschen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Wollen Sie den/die Mitarbeiter/in <strong>{employeeName}</strong> wirklich löschen?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCancel}>
                    Abbrechen
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Löschen
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteEmployeeDialog;