import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Login from '../pages/login';
import Dashboard from '../pages/dashboard';
import Setting from '../pages/setting';
import Hello from '../pages/hello';
import Check from '../pages/check';
import Header from '../components/header';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/protectedRoutes';
import MainRoutes from '../components/mainRoutes';
import SignUP from '../pages/signUp';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { validateSession } from '../services/commonService';
import { message } from 'antd';
import { reestData } from '../slices/authSlice';
import ResetPassword from '../pages/resetPassword';


const AppRoutes = () => {
    const storeToken = useSelector(state => state.counter.token);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [validateInterval, setValidateInterval] = useState('');

    useEffect(() => {
        let intervalId;

        if (storeToken) {
            // Navigate on token
            navigate('/dashboard');

            // Start interval to validate session
            intervalId = setInterval(() => {
                (async () => {
                    console.log('Validating session...');
                    try {
                        const data = await validateSession(null, { token: storeToken });
                        if (data?.code !== 1 || !data?.additionalDetail) {
                            dispatch(reestData());
                            message.error(data?.additionalDetail || 'Something went wrong');
                        }
                    } catch (error) {
                        console.error('Error fetching user:', error.message);
                    }
                })();
            }, 50000);
        }

        // Cleanup on unmount or token change
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [storeToken]);

    // useEffect(() => {
    //     if (storeToken) {
    //         navigate('/dashboard');
    //     }

    //     clearInterval(validateInterval);

    //     if (storeToken) {
    //         const int = setInterval(() => {
    //             (async () => {
    //                 console.log('hello');
    //                 try {
    //                     const data = await validateSession(null, { token: storeToken });
    //                     if (data && data?.code == 1 && data?.additionalDetail) {

    //                     } else {
    //                         dispatch(reestData());
    //                         message.error(data?.additionalDetail || 'Something went wrong');

    //                     }
    //                 } catch (error) {
    //                     console.error('Error fetching user:', error.message);
    //                 }
    //             })();

    //         }, 50000);
    //         setValidateInterval(int);
    //     }



    // }, [storeToken])

    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signUp" element={<SignUP />} />
            <Route path="/forgetPassword" element={<ResetPassword />} />
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