import { useState } from 'react'; 
import api from "./axios.ts"; 
import { useNavigate } from 'react-router-dom'; 

export const useCreateChannel = (token: string | null) => {

    const navigate = useNavigate(); 

    const [channelName, setName] = useState<string>(""); 
    const [channelDescription, setDescription] = useState<string>(""); 
    const [loading, setLoading] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null); 

    const createChannel = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setError(null); 

        if(!channelName || !channelDescription) {
            setError("All fields are required!"); 
            return; 
        }

        try {
            setLoading(true); 

            const response = await api.post("http://localhost:5000/api/channels/create", 
                {
                    name: channelName, 
                    description: channelDescription, 
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
        channelName, 
        channelDescription, 
        setName, 
        setDescription, 
        loading, 
        error, 
        createChannel
    }
}

