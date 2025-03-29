import {Navigate, Route, Routes} from "react-router-dom";
import {Dashboard, Login, Register, PrivateRoute, NotFound, Saved, Community} from './pages/index'
import {AuthProvider} from "./context/auth.jsx";
import {Box} from "@chakra-ui/react";
import "./styles/main.scss"
import {UserContext, UserProvider} from "./context/user";
import {MyPosts} from "./pages/index.js";
import {Header} from "./components/index"
import {useContext} from "react";

function App() {


  return (
      <Box w="100%">

      <AuthProvider>
        <UserProvider>
  <Routes>
    <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="/dashboard" element={<Dashboard/>}>
        <Route path="saved" element={<Saved/>}/>
        <Route path="my-posts" element={<MyPosts/>}/>
        <Route path="community" element={<Community/>}/>
      </Route>
    </Route>
        <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes>
        </UserProvider>
    </AuthProvider>

      </Box>
  )
}

export default App
