import React from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import type { Employee } from '../types/employee';
import Tag from './Tag';
import './DetailCard.css';

interface DetailCardProps {
    employee: Employee | null;
    isOpen: boolean;
    onClose: () => void;
}

export const DetailCard: React.FC<DetailCardProps> = ({ employee, isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!employee) return null;

    const handleEdit = () => {
        onClose();
        navigate(`/editemployee/${employee.id}`);
    };

    return (
        <Modal show={isOpen} onHide={onClose} centered className="detail-card-modal">
            <Modal.Header closeButton className="detail-card-header">
            </Modal.Header>
            <Modal.Body className="detail-card-body">
                <div className="detail-card-container">
                    <div className="avatar-section">
                        <div className="avatar-circle">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <button className="edit-btn" onClick={handleEdit}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="employee-info">
                        <div className="info-row">
                            <div className="info-column">
                                <label>Nachname</label>
                                <p>{employee.lastName}</p>
                            </div>
                        </div>

                        <div className="info-row">
                            <div className="info-column">
                                <label>Vorname</label>
                                <p>{employee.firstName}</p>
                            </div>
                        </div>

                        <div className="info-row">
                            <div className="info-column">
                                <label>Adresse</label>
                                <p>{employee.street}</p>
                            </div>
                        </div>

                        <div className="info-row">
                            <div className="info-column">
                                <label>Postleitzahl</label>
                                <p>{employee.postcode}</p>
                            </div>

                            <div className="info-column">
                                <label>Ort</label>
                                <p>{employee.city}</p>
                            </div>
                        </div>

                        <div className="info-row">
                            <div className="info-column">
                                <label>Telefon</label>
                                <p>{employee.phone}</p>
                            </div>
                        </div>

                        <div className="qualifications-section">
                            <label>Qualifikationen</label>
                            <div className="qualification-tags">
                                {employee.skillSet.map((qual, idx) => (
                                    <Tag key={idx} label={qual.skill} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default DetailCard;
