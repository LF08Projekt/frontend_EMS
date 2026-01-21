import "./QualificationListPage.css";
import { Container } from "react-bootstrap";
import {useEffect, useMemo, useState} from "react";
import QualificationList from "../components/QualificationList";
import type { Qualification } from "../components/QualificationList";
import TextInput from "../components/Textfield";
import { PrimaryButton } from "../components/Button";
import { AiOutlineCheck } from "react-icons/ai";
import EmployeeSearchBar from "../components/SearchBar";
import { useQualificationApi } from "../hooks/useQualificationApi";


export function QualificationListPage() {

    const {
        fetchQualifications,
        createQualification,
        deleteQualification,
    } = useQualificationApi();


    const [qualifications, setQualifications] = useState<Qualification[]>([]);

    const [search, setSearch] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState("");


    useEffect(() => {
        (async () => {
            const data = await fetchQualifications();
            if (!data) return;

            const mapped: Qualification[] = data.map((q) => ({
                id: q.id,
                name: q.skill,
            }));
            setQualifications(mapped);

        })();
    }, []);

    const filteredQualifications = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return qualifications;
        return qualifications.filter((x) => x.name.toLowerCase().includes(q));
    }, [qualifications, search]);

    function toggleAdd() {
        setIsAdding((prev) => !prev);
        setNewName("");
    }

    async function handleAdd() {
        const name = newName.trim();
        if (!name) return;

        const created = await createQualification({ skill: name });
        if (!created) return;

        setQualifications((prev) => [{ id: created.id, name: created.skill }, ...prev]);

        setNewName("");
        setIsAdding(false);
    }

    async function handleDelete(q: Qualification) {
        const ok = await deleteQualification(q.id);
        if (!ok) return;

        setQualifications((prev) => prev.filter((x) => x.id !== q.id));
    }

    function handleEdit() {}

    return (
        <Container className="qualification-page">
            <div className="qualification-header">
                <h1 className="qualification-title">Qualifikationsliste</h1>

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
                                    rightIcon={<AiOutlineCheck />}
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