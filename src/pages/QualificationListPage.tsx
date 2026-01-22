import "./QualificationListPage.css";
import {Container} from "react-bootstrap";
import {useEffect, useMemo, useState} from "react";
import QualificationList from "../components/QualificationList";
import type {Qualification} from "../components/QualificationList";
import TextInput from "../components/Textfield";
import {PrimaryButton} from "../components/Button";
import {AiFillPlusCircle} from "react-icons/ai";
import EmployeeSearchBar from "../components/SearchBar";
import {useQualificationApi} from "../hooks/useQualificationApi";
import GenericModal from "../components/Deletemodal.tsx";


export function QualificationListPage() {
    const {fetchQualifications, createQualification, deleteQualification, loading, error} = useQualificationApi();
    const [qualifications, setQualifications] = useState<Qualification[]>([]);
    const [search, setSearch] = useState("");
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState("");
    const [qualificationToDelete, setQualificationToDelete] = useState<Qualification | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadQualifications = async () => {
        const data = await fetchQualifications();
        if (!data) return;

        setQualifications(
            data.map(q => ({id: q.id, name: q.skill}))
        );
    };

    useEffect(() => {
        loadQualifications();
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

        const created = await createQualification({skill: name});
        if (!created) return;

        setQualifications((prev) => [{id: created.id, name: created.skill}, ...prev]);

        setNewName("");
        setIsAdding(false);
    }

    function handleEdit(q: Qualification, newName: string) {
        const name = newName.trim();
        if (!name) return;

        setQualifications((prev) =>
            prev.map((x) => (x.id === q.id ? { ...x, name } : x))
        );
    }

    const handleDelete = (qualification: Qualification) => {
        setQualificationToDelete(qualification);
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (qualificationToDelete?.id) {
            const success = await deleteQualification(qualificationToDelete.id);
            if (success) {
                await loadQualifications();
                setIsModalOpen(false);
                setQualificationToDelete(null);
            }
        }
    };

    const handleDeleteCancel = () => {
        setIsModalOpen(false);
        setQualificationToDelete(null);
    };

    if (loading) {
        return <div>Laden...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container className="qualification-page">
            <div className="qualification-header">
                <div className="qualification-breadcrumbs">
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
                                    placeholder="Qualifikation eingeben"
                                    value={newName}
                                    onChange={setNewName}
                                    rightIcon={<AiFillPlusCircle/>}
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

            <GenericModal
                isOpen={isModalOpen}
                title="Qualifikation löschen"
                body={
                    <>
                        Wollen Sie die
                        Qualifikation <strong>{qualificationToDelete?.name}</strong> wirklich
                        löschen?
                    </>
                }
                onCancel={handleDeleteCancel}
                onConfirm={handleDeleteConfirm}
            />
        </Container>
    );
}