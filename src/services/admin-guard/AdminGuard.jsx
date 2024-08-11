import { Navigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function AdminGuard({children}){
    // recibo el children y un isAdmin

    const isAdmin = useUser().user?.role === "ADMIN_ROLE";

    // si es admin devuelvo los children, si no redirijo a home
    return isAdmin ? children : <Navigate to="/" replace />;
}