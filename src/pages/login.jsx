import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { increment } from '../slices/authSlice';
import { hideLoader, showLoader } from '../slices/commonSlice';
import { getAllUser } from '../services/commonService';



const Login = () => {
    const { login, token } = useAuth();
    const navigate = useNavigate();
    const storeToken = useSelector(state => state.counter.token);
    const dispatch = useDispatch();

    const handleLogin = async (data) => {
        login(data); // Simulated login
        // dispatch(showLoader());
        try {
            const data = await getAllUser();
            console.log('User:', data);
        } catch (error) {
            console.error('Error fetching user:', error.message);
        }




        // setTimeout(() => {
        //     dispatch(increment());
        //     dispatch(hideLoader());
        // }, 1500);

    };

    useEffect(() => {
        console.log('loginComponent-------', token);
        console.log('loginComponent-----------storeToken-------', storeToken);
        if (storeToken) {
            navigate('/dashboard');

        }

    }, [storeToken]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        handleLogin(data);
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm space-y-4"
                >
                    <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            {...register("email", { required: "Email is required" })}
                            type="email"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            {...register("password", { required: "Password is required" })}
                            type="password"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
            {/* <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign in to your portal</h2>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="mt-4 text-sm text-center text-gray-500">
                        Don't have an account?
                        <a href="#" className="text-blue-600 hover:underline">Sign up</a>
                    </p>
                </div>
            </div> */}
        </>
    );
};

export default Login;