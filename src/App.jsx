import {Route, Routes} from "react-router-dom";
import {Dashboard, Login, Register,PrivateRoute} from './pages/index'
import {AuthProvider} from "./firebase/auth.jsx";
import {Box} from "@chakra-ui/react";
import "./styles/main.scss"
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {

  return (
      <Box p="8">
      <AuthProvider>
  <Routes>
    <Route path="/" element={<PrivateRoute/>}>
      <Route path="/" element={<Dashboard/>}/>
    </Route>
        <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
  </Routes>
    </AuthProvider>
      </Box>
  )
}

export default App
