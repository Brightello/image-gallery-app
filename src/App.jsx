import {Navigate, Route, Routes} from "react-router-dom";
import {Dashboard, Login, Register, PrivateRoute, Home, NotFound, Saved, Community} from './pages/index'
import {AuthProvider} from "./context/auth.jsx";
import {Box} from "@chakra-ui/react";
import "./styles/main.scss"
import {UserProvider} from "./context/user";
import {MyPosts} from "./pages/index.js";

function App() {

  return (
      <Box w="100%">
      <AuthProvider>
        <UserProvider>
  <Routes>
    <Route exact path="/" element={<Home/>}/>
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
