export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    location: string;
    department: string;
    qualifications: string[];
    position: string;
}

export type EmployeeResponse = Omit<Employee, 'id'>;

