import type { Employee } from "../types/employees";

// data/mockEmployees.ts
export const mockEmployees: Employee[] = [
    { id: 1, firstName: 'Max', lastName: 'Mustermann', location: 'Berlin',department: 'Finanzen', qualifications: ['JavaScript', 'React'], position: 'Software Developer' },
    { id: 2, firstName: 'Erika', lastName: 'Musterfrau', location: 'Hamburg',department: 'Marketing', qualifications: ['SEO', 'Content Creation'], position: 'Marketing Specialist' },
    { id: 3, firstName: 'Hans', lastName: 'Schmidt', location: 'München',department: 'Vertrieb', qualifications: ['Salesforce', 'Negotiation'], position: 'Sales Manager' },
    { id: 4, firstName: 'Anna', lastName: 'Schneider', location: 'Köln',department: 'Personal', qualifications: ['Recruiting', 'Onboarding'], position: 'HR Specialist' },
    
    ];

    // Helper function to get departments for filter dropdown
export const getDepartments = (): string[] => {
  const departments = new Set(mockEmployees.map(emp => emp.department));
  return Array.from(departments);
};

// Helper function to get locations for filter dropdown
export const getLocations = (): string[] => {
  const locations = new Set(mockEmployees.map(emp => emp.location));
  return Array.from(locations);
};

