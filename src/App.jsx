import "./styles/main.scss"

import { Box } from "@chakra-ui/react"
import { Route, Routes } from "react-router-dom"

import { AuthProvider } from "./context/auth.jsx"
import { UserProvider } from "./context/user"
import {
  Community,
  Dashboard,
  Login,
  MyPosts,
  NotFound,
  PrivateRoute,
  Register,
  Saved
} from "./pages/index"

function App() {
  return (
    <Box w="100%">
      <AuthProvider>
        <UserProvider>
          <Routes>
            <Route path="/dashboard" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="saved" element={<Saved />} />
                <Route path="my-posts" element={<MyPosts />} />
                <Route index element={<MyPosts />} />
                <Route path="community" element={<Community />} />
              </Route>
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </UserProvider>
      </AuthProvider>
    </Box>
  )
}

export default App
