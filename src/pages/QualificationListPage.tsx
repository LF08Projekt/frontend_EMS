import { Container } from "react-bootstrap";
import { useMemo, useState } from "react";
import QualificationList from "../components/QualificationList";
import type { Qualification } from "../components/QualificationList";
import TextInput from "../components/Textfield";
import { PrimaryButton } from "../components/Button";

import "./QualificationListPage.css";
import {FaPen} from "react-icons/fa";
import EmployeeSearchBar from "../components/SearchBar";

const MOCK: Qualification[] = [
    { name: "Projektmanagement" },
    { name: "Vertrieb" },
    { name: "Java" },
    { name: "React" },
    { name: "Marketing" },
    { name: "C++" },
    { name: "Datenanalyse" },
    { name: "Softwareentwicklung" },
    { name: "Scrum / Agile Methoden" },
    { name: "Docker" },
    { name: "SQL" },
    { name: "UI/UX Design" },
];

export function QualificationListPage() {
    const [qualifications, setQualifications] = useState<Qualification[]>(MOCK);

    const [search, setSearch] = useState("");

    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState("");

    const filteredQualifications = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return qualifications;
        return qualifications.filter((x) => x.name.toLowerCase().includes(q));
    }, [qualifications, search]);

    function toggleAdd() {
        setIsAdding((prev) => !prev);
        setNewName("");
    }

    function handleAdd() {
        const name = newName.trim();
        if (!name) return;

        const exists = qualifications.some(
            (q) => q.name.toLowerCase() === name.toLowerCase()
        );
        if (exists) return;

        setQualifications((prev) => [{ name }, ...prev]);
        setNewName("");
        setIsAdding(false);
    }

    function handleDelete(q: Qualification) {
        setQualifications((prev) => prev.filter((x) => x.name !== q.name));
    }

    function handleEdit(q: Qualification) {
        const result = window.prompt("Neue Qualifikation:", q.name);
        if (result === null) return;

        const name = result.trim();
        if (!name) return;

        setQualifications((prev) =>
            prev.map((x) => (x.name === q.name ? { name } : x))
        );
    }

    return (
        <Container className="qualification-page">
            <div className="qualification-header">
                <div className="qualification-breadcrumbs">
                    <span className="crumb muted">Mitarbeiterliste</span>
                    <span className="crumb active">Qualifikationsliste</span>
                </div>

                <div className="qualification-header-actions">
                    <div className="add-wrapper">
                        <PrimaryButton
                            label="+ Qualifikation hinzufügen"
                            onClick={toggleAdd}
                        />

                        {isAdding && (
                            <div className="add-overlay no-mb">
                                <TextInput
                                    placeholder="Neue Qualifikation eingeben"
                                    value={newName}
                                    onChange={setNewName}
                                    rightIcon={<FaPen />}
                                    onRightIconClick={handleAdd}
                                    onEnter={handleAdd}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="qualification-search-panel">
                <EmployeeSearchBar
                    placeholder="Qualifikation suchen..."
                    onSearch={(q) => setSearch(q)}
                />
            </div>

            <div className="qualification-table-panel">
                <QualificationList
                    qualifications={filteredQualifications}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </Container>
    );
}