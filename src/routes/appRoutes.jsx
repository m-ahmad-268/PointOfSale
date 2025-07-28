import { Outlet, Route, Routes } from 'react-router-dom';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import Setting from '../pages/setting';
import Hello from '../pages/hello';
import Check from '../pages/check';
import Header from '../components/header';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoutes';
import MainRoutes from '../components/mainRoutes';


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                }
            >
                {/* <Route element={<Setting />} /> */}
                <Route path='hello' element={<Hello />}>
                </Route>
                <Route path='check' element={<Check />} />
            </Route>


            <Route path="*" element={<Navigate to="/" />} />
        </Routes >
    );
};

export default AppRoutes;