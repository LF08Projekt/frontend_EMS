import { Table } from "react-bootstrap";
import QualificationListItem from "./QualificationListItem.tsx";

export type Qualification = {
    name: string;
};

type QualificationListProps = {
    qualifications: Qualification[];
    onEdit?: (qualification: Qualification) => void;
    onDelete?: (qualification: Qualification) => void;
};

function QualificationList({ qualifications, onEdit, onDelete }: QualificationListProps) {
    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>Qualifikation</th>
                <th>Aktionen</th>
            </tr>
            </thead>

            <tbody>
            {qualifications.map((qual) => (
                <QualificationListItem
                    key={qual.name}
                    qualification={qual}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
            </tbody>
        </Table>
    );
}

export default QualificationList;