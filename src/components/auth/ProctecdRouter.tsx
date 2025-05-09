import { Navigate, Outlet } from "react-router";
import {isAuthenticated} from '../../service/api.login'

interface ProctedRouterProps {
    redirectPath?: string;
}

export const ProctecdRouter = ({ redirectPath = "/login" }: ProctedRouterProps) => {
    const authenticated = isAuthenticated();
    
    if (!authenticated) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};
