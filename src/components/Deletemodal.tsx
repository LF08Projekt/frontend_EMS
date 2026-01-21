import React, {type ReactNode} from "react";

interface GenericModalProps {
    isOpen: boolean;
    title: string;
    body: ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
}

export const GenericModal: React.FC<GenericModalProps> = ({
                                                              isOpen,
                                                              title,
                                                              body,
                                                              onConfirm,
                                                              onCancel
                                                          }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{title}</h3>
                <div className="modal-body">{body}</div>
                <div className="modal-actions">
                    <button onClick={onCancel} className="cancel-button">
                        Abbrechen
                    </button>
                    <button onClick={onConfirm} className="confirm-delete-button">
                        Bestätigen
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenericModal;
