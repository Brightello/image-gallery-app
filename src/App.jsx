import {Route, Routes} from "react-router-dom";
import {Dashboard, Login, Register, PrivateRoute, Home, NotFound} from './pages/index'
import {AuthProvider} from "./context/auth.jsx";
import {Box} from "@chakra-ui/react";
import "./styles/main.scss"
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {

  return (
      <Box w="100%">
      <AuthProvider>
  <Routes>
    <Route exact path="/" element={<Home/>}/>
    <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Route>
        <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes>
    </AuthProvider>
      </Box>
  )
}

export default App
