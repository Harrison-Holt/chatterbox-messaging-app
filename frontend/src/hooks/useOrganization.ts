import { useState, useEffect } from "react"; 
import axios from "axios"; 

interface Organization {
    _id: string; 
    name: string; 
    description: string
}

interface ApiResponse {
    message: string; 
    organizations: Organization[]; 
}

export const useOrganization = (token: string | null) => {

    const [organizations, setOrganization] = useState<Organization[]>([]); 
    const [organizationLoading, setLoading] = useState<boolean>(true); 
    const [organizationError, setError] = useState<string | null>(null); 

    useEffect(() => {

        if(!token) {
            setOrganization([]);
            setLoading(false); 
            return; 
        }

        const fetchOrganizationList = async () => {
            try {
                setLoading(true); 
                setError(null); 

                const response = await axios.get<ApiResponse>("http://localhost:5000/api/organization/list", {
                    headers: { Authorization: `Bearer ${token}` }
                }); 

                setOrganization(response.data.organizations)
            } catch(error: any) {
                setError(error.message || "Failedto load organizations"); 
            } finally {
                setLoading(false); 
            }
        }

        fetchOrganizationList(); 

    }, [token]); 

    return { organizations, organizationLoading, organizationError }; 
}

