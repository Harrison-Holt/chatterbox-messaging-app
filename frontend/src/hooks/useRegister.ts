import { useState } from "react"; 
import { useNavigate } from "react-router-dom"; 
import api from "./axios.ts"; 




export function useRegister() {

    const navigate = useNavigate(); 

    const [username, setUsername] = useState<string>(""); 
    const [email, setEmail] = useState<string>(""); 
    const [password, setPassword] = useState<string>(""); 
    const [retypedPassword, setRetypedPassword] = useState<string>(""); 

    const [loading, setLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null); 

    const register = async (e: React.FormEvent) => {
        e.preventDefault(); 
        setError(null); 

        if(!username || !password || !email || !retypedPassword) {
            setError("All fields are required!");
            return;  
        }

        try {
            setLoading(true); 

            const response = await api.post("http://localhost:5000/api/auth/register", { username, email, password, retypedPassword } ); 

            navigate('/login'); 

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
        email, 
        setEmail, 
        retypedPassword, 
        setRetypedPassword,
        loading, 
        error, 
        register
    }
}