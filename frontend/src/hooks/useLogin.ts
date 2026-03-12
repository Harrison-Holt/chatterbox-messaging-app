import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import api from "./axios.ts"; 




export function useLogin() {

    const navigate = useNavigate(); 
    const API_URL = import.meta.env.VITE_API_URL;

    const [username, setUsername] = useState<string>(""); 
    const [password, setPassword] = useState<string>(""); 

    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null); 

    const login = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setError(null); 

        if(!username || !password) {
            setError("username and password are required!");
            return;  
        }

        try {
            setLoading(true); 

            const response = await api.post(`${API_URL}/api/auth/login`, { username, password } ); 

            localStorage.setItem('token', response.data.token); 

            navigate('/'); 

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
        username, 
        setUsername, 
        password, 
        setPassword, 
        loading, 
        error, 
        login
    }
}


