import type { Employee } from "../types/employee";

// data/mockEmployees.ts
export const mockEmployees: Employee[] = [
    { id: 1, firstName: 'Max', lastName: 'Mustermann', street: 'Some Street 1', HauseNumber: 10, postcode: '28115', city: 'Berlin', phone: '030-1234567', department: 'IT', skillSet: [{ id: 1, skill: 'JavaScript' }, { id: 2, skill: 'React' }] },
    { id: 2, firstName: 'Erika', lastName: 'Musterfrau', street: 'Marketing Street 2', HauseNumber: 20, postcode: '20095', city: 'Hamburg', phone: '040-2345678', department: 'Marketing', skillSet: [{ id: 3, skill: 'SEO' }, { id: 4, skill: 'Content Creation' }] },
    { id: 3, firstName: 'Hans', lastName: 'Schmidt', street: 'Sales Street 3', HauseNumber: 30, postcode: '80331', city: 'München', phone: '089-3456789', department: 'Vertrieb', skillSet: [{ id: 5, skill: 'Salesforce' }, { id: 6, skill: 'Negotiation' }] },
    { id: 4, firstName: 'Anna', lastName: 'Schneider', street: 'HR Street 4', HauseNumber: 40, postcode: '50667', city: 'Köln', phone: '0221-4567890', department: 'Personal', skillSet: [{ id: 7, skill: 'Recruiting' }, { id: 8, skill: 'Onboarding' }] },
    
    ];


// Helper function to get locations for filter dropdown
export const getLocations = (): string[] => {
  const locations = new Set(mockEmployees.map(emp => emp.city));
  return Array.from(locations);
};

