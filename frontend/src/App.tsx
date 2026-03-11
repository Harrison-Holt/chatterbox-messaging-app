import { Routes, Route } from "react-router-dom"; 
import Registration from "./pages/registration"; 
import Login from "./pages/login.tsx";
import Home from "./pages/home"; 
import RequireAuth from './auth/auth.tsx'; 
import Organization from './pages/organization.tsx'; 
import Channel from './pages/channel.tsx'; 


function App() {

  return (
    <Routes>
      <Route path="/register" element={<Registration />} />
      <Route path="/login" element={<Login />} />
      
      <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/create_org" element={<Organization />} />
            <Route path="/create_channel" element={<Channel />} />
      </Route>
    </Routes>
  )
}

export default App
