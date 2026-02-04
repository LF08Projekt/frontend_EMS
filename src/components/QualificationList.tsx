import {Table} from "react-bootstrap";
import QualificationListItem from "./QualificationListItem.tsx";
import type {Qualification} from '../types/employee.ts';


type QualificationListProps = {
    qualifications: Qualification[];
    onEdit?: (qualification: Qualification, newName: string) => void;
    onDelete?: (qualification: Qualification) => void;
};

function QualificationList({qualifications, onEdit, onDelete}: QualificationListProps) {
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
                    key={qual.id}
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