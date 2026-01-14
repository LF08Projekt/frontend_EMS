import {useAuth} from "react-oidc-context";
import {useState} from "react";
import type {CreateEmployeeDto, Employee, Qualification} from "../types/employee.ts";


//Nochmal testen!
export function useEmployeeApi() {
    const auth = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAuthHeaders = () => {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        if (auth.user?.access_token) {
            headers["Authorization"] = `Bearer ${auth.user.access_token}`;
        }

        return headers;
    };

    const fetchEmployees = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "http://localhost:8089/employees",
                {headers: getAuthHeaders()}
            );

            if (!response.ok) {
                setError("Fehler beim Laden der Mitarbeiter");
                return;
            }

            return await response.json();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ein Fehler ist aufgetreten');
        } finally {
            setLoading(false);
        }
    };
    const fetchEmployeeById = async (
        id: number
    ): Promise<Employee | undefined> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8089/employees/${id}`,
                {headers: getAuthHeaders()}
            );

            if (!response.ok) {
                setError("Fehler beim Laden dieses Mitarbeiters");
                return;
            }

            return await response.json();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
        } finally {
            setLoading(false);
        }
    };

    const createEmployee = async (employeeData: CreateEmployeeDto): Promise<Employee | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:8089/employees", {
                method: "POST",
                headers: getAuthHeaders(),
                body: JSON.stringify(employeeData)
            });

            if (!response.ok) {
                setError("Fehler beim Erstellen des Mitarbeiters");
                return null;
            }

            return await response.json();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateEmployee = async (
        id: number,
        employeeData: Partial<CreateEmployeeDto>
    ): Promise<Employee | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8089/employees/${id}`, {
                method: "PUT",
                headers: getAuthHeaders(),
                body: JSON.stringify(employeeData),
            });

            if (!response.ok) {
                setError("Fehler beim Aktualisieren des Mitarbeiters");
                return null;
            }

            return await response.json();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
            return null;
        } finally {
            setLoading(false);
        }
    };
    const patchEmployee = async (
        id: number,
        employeeData: Partial<CreateEmployeeDto>
    ): Promise<Employee | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8089/employees/${id}`, {
                method: "PATCH",
                headers: getAuthHeaders(),
                body: JSON.stringify(employeeData),
            });

            if (!response.ok) {
                setError("Fehler beim Aktualisieren des Mitarbeiters (PATCH)");
                return null;
            }

            return await response.json();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
            return null;
        } finally {
            setLoading(false);
        }
    };
    const deleteEmployee = async (id: number): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://localhost:8089/employees/${id}`, {
                method: "DELETE",
                headers: getAuthHeaders(),
            });

            if (!response.ok) {
                setError("Fehler beim Löschen des Mitarbeiters");
                return false;
            }

            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
            return false;
        } finally {
            setLoading(false);
        }
    };
    const fetchEmployeeQualifications = async (
        id: number
    ): Promise<Qualification[] | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8089/employees/${id}/qualifications`,
                {headers: getAuthHeaders()}
            );

            if (!response.ok) {
                setError("Fehler beim Laden der Qualifikationen des Mitarbeiters");
                return null;
            }

            return await response.json();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
            return null;
        } finally {
            setLoading(false);
        }
    };
    const addQualificationToEmployee = async (
        employeeId: number,
        qualification: Qualification
    ): Promise<Qualification | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8089/employees/${employeeId}/qualifications`,
                {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(qualification),
                }
            );

            if (!response.ok) {
                setError("Fehler beim Hinzufügen der Qualifikation zum Mitarbeiter");
                return null;
            }

            return await response.json();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
            return null;
        } finally {
            setLoading(false);
        }
    };
    const removeQualificationFromEmployee = async (
        employeeId: number,
        qualificationId: number
    ): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8089/employees/${employeeId}/qualifications/${qualificationId}`,
                {
                    method: "DELETE",
                    headers: getAuthHeaders(),
                }
            );

            if (!response.ok) {
                setError("Fehler beim Entfernen der Qualifikation vom Mitarbeiter");
                return false;
            }

            return true;
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        fetchEmployees,
        fetchEmployeeById,
        createEmployee,
        updateEmployee,
        patchEmployee,
        deleteEmployee,
        fetchEmployeeQualifications,
        addQualificationToEmployee,
        removeQualificationFromEmployee,
        loading,
        error
    };
}