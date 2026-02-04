import React, {useState, useEffect} from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Badge,
    Dropdown,
    DropdownButton, Button,
} from 'react-bootstrap';
import {PrimaryButton} from "../components/Button.tsx";
import {useEmployeeApi} from "../hooks/useEmployeeApi.ts";
import {useQualificationApi} from "../hooks/useQualificationApi.ts";
import {useNavigate} from "react-router-dom";
import type {Qualification} from "../types/employee.ts";
import {AddQualificationInline} from "../components/AddQualificationInline.tsx";

const AddEmployeePage: React.FC = () => {
    const {createEmployee, loading, error} = useEmployeeApi();
    const {fetchQualifications, createQualification} = useQualificationApi();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        houseNumber: '',
        postcode: '',
        city: '',
        phone: ''
    });

    const [availableSkills, setAvailableSkills] = useState<Qualification[]>([]);
    const [selectedSkills, setSelectedSkills] = useState<Qualification[]>([]);

    useEffect(() => {
        loadSkills();
    }, []);

    const loadSkills = async () => {
        const skills = await fetchQualifications();
        if (skills) {
            setAvailableSkills(skills);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleAddSkill = (skill: Qualification) => {
        if (!selectedSkills.find(s => s.id === skill.id)) {
            setSelectedSkills((prev) => [...prev, skill]);
        }
    };

    const handleRemoveSkill = (skillId: number) => {
        setSelectedSkills((prev) => prev.filter((s) => s.id !== skillId));
    };

    const handleCreateNewQualification = async (name: string) => {
        const created = await createQualification({skill: name});

        if (created) {
            setAvailableSkills(prev => [...prev, created]);
            handleAddSkill(created);
        }
    };

    const handleSave = async () => {
        if (!formData.firstName || !formData.lastName || !formData.city) {
            alert("Bitte füllen Sie alle Pflichtfelder aus");
            return;
        }

        const employeeData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            street: `${formData.street} ${formData.houseNumber}`.trim(),
            postcode: formData.postcode,
            city: formData.city,
            phone: formData.phone,
            skillSet: selectedSkills.map(skill => skill.id) // Nur IDs senden
        };

        const result = await createEmployee(employeeData);
        if (result) {
            navigate('/employees');
        }
    };



    return (
        <Container className="py-4">
            <h3 className="mb-4">Mitarbeiter hinzufügen</h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        placeholder="Vorname"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                </Col>
                <Col md={6}>
                    <Form.Control
                        placeholder="Nachname"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={9}>
                    <Form.Control
                        placeholder="Straße"
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        placeholder="Hausnummer"
                        value={formData.houseNumber}
                        onChange={(e) => handleInputChange('houseNumber', e.target.value)}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        placeholder="PLZ"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                    />
                </Col>
                <Col md={6}>
                    <Form.Control
                        placeholder="Stadt"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                    />
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={12}>
                    <Form.Control
                        placeholder="Telefon"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                </Col>
            </Row>

            <Row className="mb-4">
                <Col md={6}>
                    <div
                        className="d-flex flex-wrap gap-2 p-3 border rounded"
                        style={{
                            borderColor: '#dee2e6',
                            backgroundColor: '#f8f9fa',
                            minHeight: '50px'
                        }}
                    >
                        {selectedSkills.map((skill) => (
                            <Badge bg="secondary" key={skill.id}>
                                {skill.skill}{' '}
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="text-white text-decoration-none p-0 ms-1"
                                    onClick={() => handleRemoveSkill(skill.id)}
                                >
                                    &times;
                                </Button>
                            </Badge>
                        ))}
                    </div>
                </Col>
                <Col md={6} className="d-flex gap-2">
                    <DropdownButton
                        title="Hinzufügen"
                        variant="outline-secondary"
                        className="dropdown-gray flex-shrink-0"
                    >
                        {availableSkills.map((skill) => (
                            <Dropdown.Item
                                key={skill.id}
                                onClick={() => handleAddSkill(skill)}
                                className="text-dark"
                            >
                                {skill.skill}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                    <AddQualificationInline onAdd={handleCreateNewQualification} />
                </Col>
            </Row>



            <Row>
                <div className="d-flex justify-content-center gap-2">
            <Button variant="secondary" onClick={() => navigate('/employees')}>
                    Abbrechen
            </Button>
                <PrimaryButton
                    label={loading ? "Wird gespeichert..." : "Speichern"}
                    onClick={handleSave}
                    disabled={loading}
                />
                </div>
            </Row>
        </Container>
    );
};

export default AddEmployeePage;
