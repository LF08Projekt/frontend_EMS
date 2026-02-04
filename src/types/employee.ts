export interface Qualification {
    id: number;
    skill: string;
}

export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    street: string;
    postcode: string;
    city: string;
    phone: string;
    skillSet: Qualification[];

}

export interface CreateEmployeeDto {
    firstName: string;
    lastName: string;
    street: string;
    postcode: string;
    city: string;
    phone: string;
    skillSet: number[];
}