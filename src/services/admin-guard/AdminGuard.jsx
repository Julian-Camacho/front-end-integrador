import { Navigate } from "react-router-dom";

export default function AdminGuard({children}){
    // recibo el children y un isAdmin

    const isAdmin = true;

    // si es admin devuelvo los children, si no redirijo a home
    return isAdmin ? children : <Navigate to="/" replace />;
}