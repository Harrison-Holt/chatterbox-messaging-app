import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3B82F6", 
        }, 

        secondary: {
            main: "#22C55E", 
        }, 

        background: {
            default: "#0F172A", 
            paper: "#1E293B"
        }, 

        text: {
            primary: "#F8FAFC", 
            secondary: "#94A3B8", 
        }, 

        error: {
            main: "#EF4444"
        }, 
    }, 

    typography: {
        fontFamily: `"Inter", "Roboto", "Helvetica",  "Arial", sans-serif`, 
        
    }
})

export default theme; 