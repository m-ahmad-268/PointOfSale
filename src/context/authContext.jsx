import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState('');
    const loader = useSelector(state => state.common.loader);
    // const dispatch = useDispatch();


    const login = (data) => {
        console.log('data from login', data);
        localStorage.setItem('token', 'isLoggedIn');
        setToken('isLoggedIn');
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {loader && <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                background: 'rgba(0, 0, 0, 0.2)',
                width: '100%',
                height: '100%',
                // background: rgba(0, 0, 0, 0.2),
                /* Semi-transparent background */
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999
            }}>
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>}
            {/* <div class="flex items-center justify-center h-screen">
                <div class="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-sm text-gray-700">Loading...</span>
            </div> */}
            {children}
        </AuthContext.Provider >
    );
};

export const useAuth = () => useContext(AuthContext);