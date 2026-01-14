//"Richtiges Format wie im BE"
export interface Qualification {
    id: number;
    skill: string;
}

//"Richtiges Format wie im BE"
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

// Für POST(create) /employees weil hier keine ID übergeben wird
export interface CreateEmployeeDto {
    firstName: string;
    lastName: string;
    street: string;
    postcode: string;
    city: string;
    phone: string;
    skillSet: Qualification[]; // kann leer sein, [] erlaubt
}

//Alles nochmal testen