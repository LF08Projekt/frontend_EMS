import React, {useState, useEffect} from 'react';
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
import {useParams, useNavigate} from 'react-router-dom';
import {useEmployeeApi} from '../hooks/useEmployeeApi.ts';
import {useQualificationApi} from '../hooks/useQualificationApi.ts';
import type {Qualification} from '../types/employee.ts';
import {AddQualificationInline} from "../components/AddQualificationInline.tsx";


const EditEmployeePage: React.FC = () => {
    const {id} = useParams<{id: string}>();
    const navigate = useNavigate();
    const {fetchEmployeeById, updateEmployee} = useEmployeeApi();
    const {fetchQualifications} = useQualificationApi();


    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        postcode: '',
        city: '',
        phone: '',
    });

    const [loading, setLoading] = useState(true);
    const [selectedSkills, setSelectedSkills] = useState<{id: number, skill: string}[]>([]);
    const [availableQualifications, setAvailableQualifications] = useState<Qualification[]>([]);
    const {createQualification} = useQualificationApi();


    useEffect(() => {
        const loadData = async () => {
            if (id) {
                const [employee, qualifications] = await Promise.all([
                    fetchEmployeeById(Number(id)),
                    fetchQualifications()
                ]);

                if (employee) {
                    setFormData({
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        street: employee.street,
                        postcode: employee.postcode,
                        city: employee.city,
                        phone: employee.phone,
                    });
                    const sortedSkills = [...employee.skillSet].sort((a, b) => a.id - b.id);
                    setSelectedSkills(sortedSkills);
                }

                if (qualifications) {
                    setAvailableQualifications(qualifications);
                }

                setLoading(false);
            }
        };

        loadData();
    }, [id]);


    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleAddSkill = (qualification: Qualification) => {
        if (!selectedSkills.find(s => s.id === qualification.id)) {
            setSelectedSkills((prev) => [...prev, {id: qualification.id, skill: qualification.skill}]);
        }
    };

    const handleRemoveSkill = (skillId: number) => {
        setSelectedSkills((prev) => prev.filter((s) => s.id !== skillId));
    };

    const handleCreateNewQualification = async (name: string) => {
        const created = await createQualification({skill: name});

        if (created) {
            setAvailableQualifications(prev => [...prev, created]);
            handleAddSkill(created);
        }
    };


    const handleSave = async () => {
        if (!id) return;
        
        try {
            const updatedEmployee = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                street: formData.street,
                postcode: formData.postcode,
                city: formData.city,
                phone: formData.phone,
                skillSet: selectedSkills.map(skill => skill.id),
            };
            
            console.log('Saving employee:', updatedEmployee);
            const result = await updateEmployee(Number(id), updatedEmployee);
            console.log('Update result:', result);
            
            if (result) {
                console.log('Success! Navigating back to employees');
                navigate('/employees');
            } else {
                console.error('Update failed - result is null');
                alert('Fehler beim Speichern. Bitte überprüfen Sie die Konsole für Details.');
            }
        } catch (error) {
            console.error('Exception during save:', error);
            alert('Ein Fehler ist aufgetreten: ' + error);
        }
    };

    if (loading) {
        return <Container className="py-4"><h3>Laden...</h3></Container>;
    }

    return (
        <Container className="py-4">
            <h3 className="mb-4">Mitarbeiter bearbeiten</h3>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        placeholder="Vorname"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                </Col>
                <Col md={6}>
                    <Form.Control
                        placeholder="Nachname"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col>
                    <Form.Control
                        placeholder="Adresse"
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={3}>
                    <Form.Control
                        placeholder="Postleitzahl"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                </Col>
                <Col md={9}>
                    <Form.Control
                        placeholder="Ort"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
                    />
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <Form.Control
                        placeholder="Telefon"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        style={{backgroundColor: '#f8f9fa'}}
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
                        {selectedSkills.map((skill, index) => (
                            <Badge bg="secondary" key={`skill-${index}`}>
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
                        {availableQualifications.map((qual) => (
                            <Dropdown.Item
                                key={qual.id}
                                onClick={() => handleAddSkill(qual)}
                                className="text-dark"
                            >
                                {qual.skill}
                            </Dropdown.Item>
                        ))}
                    </DropdownButton>
                    <AddQualificationInline onAdd={handleCreateNewQualification} />
                </Col>
            </Row>


            <div className="d-flex justify-content-center gap-2">
                <Button variant="secondary" onClick={() => navigate('/employees')}>
                    Abbrechen
                </Button>
                <PrimaryButton 
                    label={"Änderungen speichern"}
                    onClick={handleSave}
                />
            </div>
        </Container>
    );
};

export default EditEmployeePage;
