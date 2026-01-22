import React, {useState, useEffect} from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Badge,
    Dropdown,
    DropdownButton,
} from 'react-bootstrap';
import {PrimaryButton} from "../components/Button.tsx";
import {useEmployeeApi} from "../hooks/useEmployeeApi.ts";
import {useQualificationApi} from "../hooks/useQualificationApi.ts";
import {useNavigate} from "react-router-dom";
import type {Qualification} from "../types/employee.ts";

const AddEmployeePage: React.FC = () => {
    const {createEmployee, loading, error} = useEmployeeApi();
    const {fetchQualifications} = useQualificationApi();
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

    const handleSave = async () => {
        // Validierung
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

            <Row className="mb-3">
                <Col>
                    <h5>Qualifikationen</h5>
                    <DropdownButton title="Qualifikation hinzufügen" variant="outline-secondary">
                        {availableSkills.map((skill) => (
                            <Dropdown.Item key={skill.id} onClick={() => handleAddSkill(skill)}>
                                {skill.skill}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    {selectedSkills.map((skill) => (
                        <Badge
                            key={skill.id}
                            bg="primary"
                            className="me-2"
                            style={{cursor: 'pointer'}}
                            onClick={() => handleRemoveSkill(skill.id)}
                        >
                            {skill.skill} ×
                        </Badge>
                    ))}
                </Col>
            </Row>

            <div className="d-flex justify-content-center">
                <PrimaryButton
                    label={loading ? "Wird gespeichert..." : "Speichern"}
                    onClick={handleSave}
                    disabled={loading}
                />
            </div>
        </Container>
    );
};

export default AddEmployeePage;
