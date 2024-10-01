import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import HomePage from "./pages/HomePage"
import AuthCallbackPage from "./pages/AuthCallbackPage"
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout><HomePage/></Layout>}></Route>
            <Route path="/auth-callback" element={<AuthCallbackPage/>}></Route>
            <Route path="/user-profile" element={<span>User</span>}></Route>
            <Route path="*" element={<Navigate to="/"></Navigate>}></Route>
        </Routes>
    )
}
export default AppRoutes

