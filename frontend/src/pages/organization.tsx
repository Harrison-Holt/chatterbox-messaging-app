import { Box, Typography, TextField, Button, Alert } from '@mui/material'; 
import { useCreateOrg } from '../hooks/useCreateOrg.ts'; 


function Organization() {

const token = localStorage.getItem("token"); 

const { organizationName, organizationDescription, setName, setDescription, loading, error, createOrg } = useCreateOrg(token); 

    return (
        <>
        <Box component="form" onSubmit={createOrg}>
            {error && <Alert severity="error">{error}</Alert>}
            <Typography variant="h6">Create an Organization</Typography>
            <TextField
                type="text"
                id="organizationName"
                name="organizationName"
                onChange={(e) => setName(e.target.value)}                
                value={organizationName}
                fullWidth
            />
            <TextField
                type="text"
                id="organizationDescription"
                name="organizationDescription"
                onChange={(e) => setDescription(e.target.value)}                
                value={organizationDescription}
                fullWidth
            />
            <Button type="submit" disabled={loading}>
            { loading ? "Creating Organization" : "Create" }
            </Button>
        </Box>
        </>
    )
}

export default Organization; 