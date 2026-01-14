import React, {useState} from 'react';
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Badge,
    Dropdown,
    DropdownButton,
} from 'react-bootstrap';
import {PrimaryButton} from "../components/Button.tsx";

const mockSkills = ['Java', 'SQL', 'Figma', 'Projektmanagement', 'Kaffee'];

const AddEmployeePage: React.FC = () => {
    const [formData, setFormData] = useState({
        vorname: '',
        nachname: '',
        strasse: '',
        hausnummer: '',
        plz: '',
        ort: '',
    });

    const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleAddSkill = (skill: string) => {
        if (!selectedSkills.includes(skill)) {
            setSelectedSkills((prev) => [...prev, skill]);
        }
    };

    const handleRemoveSkill = (skill: string) => {
        setSelectedSkills((prev) => prev.filter((s) => s !== skill));
    };

    const handleSave = () => {
        console.log('Mitarbeiter speichern:', formData, selectedSkills);
    };

    return (
        <Container className="py-4">
            <h3 className="mb-4">Mitarbeiter hinzufügen</h3>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        placeholder="Vorname"
                        value={formData.vorname}
                        onChange={(e) => handleInputChange('vorname', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                </Col>
                <Col md={6}>
                    <Form.Control
                        placeholder="Nachname"
                        value={formData.nachname}
                        onChange={(e) => handleInputChange('nachname', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={9}>
                    <Form.Control
                        placeholder="Straße"
                        value={formData.strasse}
                        onChange={(e) => handleInputChange('strasse', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                </Col>
                <Col md={3}>
                    <Form.Control
                        placeholder="Hausnummer"
                        value={formData.hausnummer}
                        onChange={(e) => handleInputChange('hausnummer', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Control
                        placeholder="Postleitzahl"
                        value={formData.plz}
                        onChange={(e) => handleInputChange('plz', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                </Col>
                <Col md={9}>
                    <Form.Control
                        placeholder="Ort"
                        value={formData.ort}
                        onChange={(e) => handleInputChange('ort', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                </Col>
            </Row>


            <Row className="mb-4">
                <Col md={8}>
                    <div
                        className="d-flex flex-wrap gap-2 p-3 border rounded"
                        style={{
                            borderColor: '#dee2e6',
                            backgroundColor: '#f8f9fa',
                            minHeight: '50px'
                        }}
                    >
                        {selectedSkills.map((skill) => (
                            <Badge bg="secondary" key={skill}>
                                {skill}{' '}
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="text-white text-decoration-none p-0 ms-1"
                                    onClick={() => handleRemoveSkill(skill)}
                                >
                                    &times;
                                </Button>
                            </Badge>
                        ))}
                    </div>
                </Col>
                <Col md={4}>
                    <DropdownButton title="Hinzufügen" variant="outline-dark">
                        {mockSkills.map((skill) => (
                            <Dropdown.Item key={skill}
                                           onClick={() => handleAddSkill(skill)}>
                                {skill}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                </Col>
            </Row>


            <div className="d-flex justify-content-center">
                <PrimaryButton label={"Mitarbeiter speichern"}
                               onClick={() => handleSave()}/>
            </div>

        </Container>
    );
};

export default AddEmployeePage;
