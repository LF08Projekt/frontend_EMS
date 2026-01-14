import {Table} from 'react-bootstrap';
import EmployeeListItem from "./ListItem.tsx";

const employees = [
    {
        name: 'Max Mustermann',
        location: 'Berlin, Deutschland',
        qualifications: ['Projektmanagement', 'Softwareentwicklung'],
    },
    {
        name: 'Anna Musterfrau',
        location: 'München, Deutschland',
        qualifications: ['Marketing', 'React'],
    },
    {
        name: 'Peter Schmidt',
        location: 'Hamburg, Deutschland',
        qualifications: ['Vertrieb', 'Kundenbeziehungen'],
    },
    {
        name: 'Lea Wagner',
        location: 'Köln, Deutschland',
        qualifications: ['Personalwesen', 'Java'],
    },
    {
        name: 'Thomas Müller',
        location: 'Stuttgart, Deutschland',
        qualifications: ['Finanzen', 'Controlling'],
    },
    {
        name: 'Sophie Becker',
        location: 'Düsseldorf, Deutschland',
        qualifications: ['C++', 'React'],
    },
    {
        name: 'Sophie Becker',
        location: 'Düsseldorf, Deutschland',
        qualifications: ['Datenanalyse', 'Business Intelligence'],
    },
];

function EmployeeList() {
    const handleEdit = (employee: any) => {
        console.log('Edit:', employee);
    };

    const handleDelete = (employee: any) => {
        console.log('Delete:', employee);
    };

    return (
        <Table striped bordered hover responsive>
            <thead>
            <tr>
                <th>Name</th>
                <th>Ort</th>
                <th>Qualifikationen</th>
                <th>Aktionen</th>
            </tr>
            </thead>
            <tbody>
            {employees.map((emp, idx) => (
                <EmployeeListItem
                    key={`${emp.name}-${idx}`}
                    employee={emp}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ))}
            </tbody>
        </Table>
    );
}

export default EmployeeList;