import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function AuthRequired() {
    const authenticated = true;
    const location = useLocation();

    if(!authenticated) {
        return <Navigate to="/login" state={{message: "You must log in first"}} replace/>
    }

    return <Outlet />
}