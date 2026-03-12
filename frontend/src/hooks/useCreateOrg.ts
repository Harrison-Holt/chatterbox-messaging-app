import { useState } from 'react'; 
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

export const useCreateOrg = (token: string | null) => {

    const navigate = useNavigate(); 
    const API_URL = import.meta.env.VITE_API_URL;

    const [organizationName, setName] = useState<string>(""); 
    const [organizationDescription, setDescription] = useState<string>(""); 
    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null); 

    const createOrg = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setError(null); 

        if(!organizationName || !organizationDescription) {
            setError("All fields are required!"); 
            return; 
        }

        try {
            setLoading(true); 

            await axios.post(`${API_URL}/api/organization/create`, 
                {
                    name: organizationName, 
                    description: organizationDescription, 
                    isPublic: true
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )

            setLoading(false); 
            navigate("/"); 
        
        } catch(error: any) {

             console.error("Error fecthing data: ", error.response?.data?.message); 

            if(error.response?.data?.message) {
                setLoading(false); 
                setError(error.response?.data?.message)

            } else {
                setLoading(false); 
                setError("Error fetching data!");
                
            }

        } finally {
            setLoading(false); 
        }

    }
    
    return {
        organizationName, 
        organizationDescription, 
        setName, 
        setDescription, 
        loading, 
        error, 
        createOrg
    }
}

