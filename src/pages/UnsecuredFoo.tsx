/*
import {Container} from "react-bootstrap";

export function UnsecuredFoo() {
    return (
        <Container>
            <h1>List of Foo (unsecured)</h1>
            <ul>
                <li>Foo 1</li>
                <li>Foo 2</li>
                <li>Foo 3</li>
            </ul>
        </Container>
    )
}*/
import {Container, Form, Button} from "react-bootstrap";
import {useState} from "react";
import {useEmployeeApi} from "../hooks/useEmployeeApi.ts";
import {useQualificationApi} from "../hooks/useQualificationApi.ts";
import type {CreateEmployeeDto} from "../types/employee.ts";

export function UnsecuredFoo() {
    const {
        fetchEmployees,
        fetchEmployeeById,
        createEmployee,
        updateEmployee,
        patchEmployee,
        deleteEmployee,
        fetchEmployeeQualifications,
        addQualificationToEmployee,
        removeQualificationFromEmployee,
    } = useEmployeeApi();

    const {
        fetchQualifications,
        createQualification,
        updateQualification,
        deleteQualification,
        fetchEmployeesByQualification,
    } = useQualificationApi();

    const [output, setOutput] = useState<any>(null);

    // Inputs
    const [employeeId, setEmployeeId] = useState<number>(0);
    const [qualificationId, setQualificationId] = useState<number>(0);
    const [qualificationName, setQualificationName] = useState<string>(""); // <-- NEU
    const [newEmployeeName, setNewEmployeeName] = useState({
        firstName: "",
        lastName: "",
    });
    const [newQualificationName, setNewQualificationName] = useState<string>("");

    return (
        <Container>
            <h1>API Testseite</h1>

            {/* -------------------- EMPLOYEE -------------------- */}
            <h2>Mitarbeiter-Endpunkte</h2>
            <Button className="me-2 mb-2" onClick={async () => setOutput(await fetchEmployees())}>
                Alle Mitarbeiter laden
            </Button>

            <Form.Group className="mb-2">
                <Form.Label>Neuen Mitarbeiter erstellen</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Vorname"
                    value={newEmployeeName.firstName}
                    onChange={(e) =>
                        setNewEmployeeName({
                            ...newEmployeeName,
                            firstName: e.target.value,
                        })
                    }
                />
                <Form.Control
                    type="text"
                    placeholder="Nachname"
                    value={newEmployeeName.lastName}
                    onChange={(e) =>
                        setNewEmployeeName({
                            ...newEmployeeName,
                            lastName: e.target.value,
                        })
                    }
                />
                <Button
                    className="mt-1"
                    onClick={async () => {
                        const emp: CreateEmployeeDto = {
                            firstName: newEmployeeName.firstName || "Max",
                            lastName: newEmployeeName.lastName || "Mustermann",
                            street: "Musterstraße 1",
                            postcode: "12345",
                            city: "Musterstadt",
                            phone: "0123456789",
                            skillSet: [],
                        };
                        setOutput(await createEmployee(emp));
                    }}
                >
                    Erstellen
                </Button>
            </Form.Group>

            {/* Employee ID */}
            <Form.Group className="mb-2">
                <Form.Label>Mitarbeiter ID</Form.Label>
                <Form.Control
                    type="number"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(Number(e.target.value))}
                />
            </Form.Group>

            <Button className="me-2 mb-2" onClick={async () => setOutput(await fetchEmployeeById(employeeId))}>
                Mitarbeiter nach ID laden
            </Button>
            <Button className="me-2 mb-2" onClick={async () => setOutput(await deleteEmployee(employeeId))}>
                Mitarbeiter löschen
            </Button>
            <Button
                className="me-2 mb-2"
                onClick={async () =>
                    setOutput(
                        await updateEmployee(employeeId, {
                            firstName: "Geändert",
                            lastName: "Name",
                            street: "Neue Straße 1",
                            postcode: "99999",
                            city: "Neue Stadt",
                            phone: "0987654321",
                            skillSet: [],
                        })
                    )
                }
            >
                Mitarbeiter PUT (update)
            </Button>

            <Button
                className="me-2 mb-2"
                onClick={async () => setOutput(await patchEmployee(employeeId, {firstName: "PatchVorname"}))}
            >
                Mitarbeiter PATCH
            </Button>

            <Button
                className="me-2 mb-2"
                onClick={async () => setOutput(await fetchEmployeeQualifications(employeeId))}
            >
                Qualifikationen des Mitarbeiters laden
            </Button>

            {/* Qualification NAME für ADD */}
            <Form.Group className="mb-2">
                <Form.Label>Qualifikation (Name) hinzufügen</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="z.B. Java"
                    value={qualificationName}
                    onChange={(e) => setQualificationName(e.target.value)}
                />
            </Form.Group>

            <Button
                className="me-2 mb-2"
                onClick={async () =>
                    setOutput(await addQualificationToEmployee(employeeId, qualificationName))
                }
            >
                Qualifikation zum Mitarbeiter hinzufügen
            </Button>

            {/* Qualification ID für REMOVE */}
            <Form.Group className="mb-2">
                <Form.Label>Qualifikation ID entfernen</Form.Label>
                <Form.Control
                    type="number"
                    value={qualificationId}
                    onChange={(e) => setQualificationId(Number(e.target.value))}
                />
            </Form.Group>

            <Button
                className="me-2 mb-2"
                onClick={async () =>
                    setOutput(await removeQualificationFromEmployee(employeeId, qualificationId))
                }
            >
                Qualifikation vom Mitarbeiter entfernen
            </Button>

            {/* -------------------- QUALIFICATION -------------------- */}
            <h2>Qualifikationen-Endpunkte</h2>

            <Button className="me-2 mb-2" onClick={async () => setOutput(await fetchQualifications())}>
                Alle Qualifikationen laden
            </Button>

            <Form.Group className="mb-2">
                <Form.Label>Neue Qualifikation erstellen</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Qualifikation"
                    value={newQualificationName}
                    onChange={(e) => setNewQualificationName(e.target.value)}
                />
                <Button
                    className="mt-1"
                    onClick={async () =>
                        setOutput(await createQualification({skill: newQualificationName || "Neuer Skill"}))
                    }
                >
                    Erstellen
                </Button>
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>Qualification ID (für PUT/DELETE/Mitarbeiter abrufen)</Form.Label>
                <Form.Control
                    type="number"
                    value={qualificationId}
                    onChange={(e) => setQualificationId(Number(e.target.value))}
                />
            </Form.Group>

            <Button
                className="me-2 mb-2"
                onClick={async () =>
                    setOutput(await updateQualification(qualificationId, {skill: "Geänderte Quali"}))
                }
            >
                Qualifikation PUT (update)
            </Button>
            <Button className="me-2 mb-2" onClick={async () => setOutput(await deleteQualification(qualificationId))}>
                Qualifikation löschen
            </Button>
            <Button
                className="me-2 mb-2"
                onClick={async () => setOutput(await fetchEmployeesByQualification(qualificationId))}
            >
                Mitarbeiter nach Qualifikation laden
            </Button>

            <h3>Output:</h3>
            <pre>{JSON.stringify(output, null, 2)}</pre>
        </Container>
    );
}

