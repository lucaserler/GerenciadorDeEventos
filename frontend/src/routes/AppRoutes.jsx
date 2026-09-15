import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "../pages/Login/Login";
import UserRegistration from "../pages/Register/UserRegistration";
import Dashboard from "../pages/Dashboard/Dashboard";
import Events from "../pages/Events/Events";

import ProtectedRoute from "../components/ProtectedRoute/protectedRoute";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route
                    path="/Login"
                    element={<Login />}
                />

                <Route
                    path="/Cadastro"
                    element={<UserRegistration />}
                />

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/Events"
                    element={
                        <ProtectedRoute>
                            <Events />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;