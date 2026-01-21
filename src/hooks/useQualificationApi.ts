import {useAuth} from "react-oidc-context";
import {useState} from "react";
import type {Employee, Qualification} from "../types/employee.ts";

export function useQualificationApi() {
    const auth = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //Noch Testen!
    const getAuthHeaders = () => {
        const headers: Record<string, string> = {"Content-Type": "application/json"};
        if (auth.user?.access_token) headers["Authorization"] = `Bearer ${auth.user.access_token}`;
        return headers;
    };
    const fetchQualifications = async (): Promise<Qualification[] | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8089/qualifications`,
                {headers: getAuthHeaders()}
            );

            if (!response.ok) {
                setError("Fehler beim Laden der Qualifikationen");
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
    const createQualification = async (
        qualification: Omit<Qualification, "id">
    ): Promise<Qualification | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8089/qualifications`,
                {
                    method: "POST",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(qualification),
                }
            );

            if (!response.ok) {
                setError("Fehler beim Erstellen der Qualifikation");
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
    const updateQualification = async (
        id: number,
        qualification: Partial<Omit<Qualification, "id">>
    ): Promise<Qualification | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8089/qualifications/${id}`,
                {
                    method: "PUT",
                    headers: getAuthHeaders(),
                    body: JSON.stringify(qualification),
                }
            );

            if (!response.ok) {
                setError("Fehler beim Aktualisieren der Qualifikation");
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
    const deleteQualification = async (id: number): Promise<boolean> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8089/qualifications/${id}`,
                {method: "DELETE", headers: getAuthHeaders()}
            );

            if (!response.ok) {
                setError("Fehler beim Löschen der Qualifikation");
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

    const fetchEmployeesByQualification = async (
        qualificationId: number
    ): Promise<Employee[] | null> => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `http://localhost:8089/qualifications/${qualificationId}/employees`,
                {headers: getAuthHeaders()}
            );

            if (!response.ok) {
                setError("Fehler beim Laden der Mitarbeiter für diese Qualifikation");
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

    return {
        fetchQualifications,
        createQualification,
        updateQualification,
        deleteQualification,
        fetchEmployeesByQualification,
        loading,
        error,
    };
}
