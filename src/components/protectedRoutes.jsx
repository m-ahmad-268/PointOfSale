import { Navigate } from 'react-router-dom';
// import { useAuth } from '../context/authContext';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const ProtectedRoute = ({ children }) => {
    // debugger
    // const { token } = useAuth();
    const storeToken = useSelector(state => state.counter.token);
    // const dispatch = useDispatch();

    // console.log('tokenfromprotecetdRoutes', token);
    // console.log('tokenfromprotecetdRoutes------storeToken', storeToken);
    // debugger
    return storeToken ? children : <Navigate to="/" replace />;
};

// const ProtectedRoute = ({ children }) => {
//     const { token } = useAuth();

//     useEffect(() => {
//         debugger
//         children

//         if (!token) {
//             return <Navigate to="/" replace />;
//         }

//     }, [token]);

//     return children;

// };

export default ProtectedRoute;