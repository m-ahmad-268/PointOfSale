import { useEffect, useState } from 'react';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { hideLoader, showLoader } from '../slices/commonSlice';
import { verifyOtp, resetPassword, sendOtp } from '../services/commonService';
import { Button, message, Modal } from 'antd';



const ResetPassword = () => {
    const navigate = useNavigate();
    const storeToken = useSelector(state => state.counter.token);
    const dispatch = useDispatch();
    const [msg, setMsg] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    const [email, setEmail] = useState('');

    const handleSendOtp = async (formData) => {
        try {
            resetB();
            setMsg('');
            const data = await sendOtp(formData);
            if (data && data?.code == 1) {
                // navigate('/login');
                setIsModalOpen(true);
                message.success(data?.additionalDetail || 'OTP sent successfully');

            } else {
                message.error(data?.additionalDetail || 'Something went wrong')

            }
        } catch (error) {
            console.error('Error fetching user:', error.message);
        }

    };

    const handleReset = async (formData) => {
        if (formData.confirmPassword != formData.newPassword) {
            message.error('passwords do not match');
            return;
        }

        try {
            const data = await resetPassword(formData);
            if (data && data?.code == 1) {
                navigate('/login');
                message.success(data?.additionalDetail || 'password updated successfully');

            } else {
                message.error(data?.additionalDetail || 'Something went wrong');

            }
        } catch (error) {
            console.error('Error fetching user:', error.message);
        }

    };

    const handleVerification = async (formData) => {
        // login(data); // Simulated login
        // dispatch(showLoader());
        try {
            const data = await verifyOtp(formData);
            if (data && data?.code == 1) {
                setVerified(true);
                setIsModalOpen(false);
                setMsg(() => data?.additionalDetail || 'OTP verified successfully');
                // setIsModalOpen(true);
                message.success(data?.additionalDetail || 'OTP verified successfully');

            } else {
                message.error(data?.additionalDetail || 'Something went wrong')

            }
        } catch (error) {
            console.error('Error fetching user:', error.message);
        }

        // setTimeout(() => {
        //     dispatch(increment());
        //     dispatch(hideLoader());
        // }, 1500);

    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        console.log('SignUP-----------storeToken-------', storeToken);
        if (storeToken) {
            navigate('/dashboard');

        }

    }, []);

    const {
        register: registerB,
        handleSubmit: handleSubmitB,
        formState: { errors: errorsB },
        reset: resetB,
    } = useForm();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const onSubmitB = (data) => {
        console.log("Form Data:", data);
        // setLoading(true);
        let req = {
            ...data,
            email: email,
        }
        handleVerification(req);
    };

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        setEmail(data.email);
        msg ? handleReset(data) : handleSendOtp(data);
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm space-y-4"
                >
                    <h2 className="text-2xl font-bold text-center text-gray-800">Reset Password</h2>
                    {msg && <span className='text-green-700 flex justify-center'>
                        {msg}
                    </span>}
                    {/* <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            {...register("username", { required: "This field is required" })}
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="Username here"
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Phone Number</label>
                        <input
                            {...register("phoneNumber", { required: "This field is required" })}
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="03XXXXXXXXX"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
                    </div> */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            {...register("email", { required: "This field is required" })}
                            type="email"
                            disabled={verified}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="user@email.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    {verified &&
                        <>
                            <div>
                                <label className="block text-sm font-medium mb-1">New Password</label>
                                <input
                                    {...register("newPassword", { required: "This field is required" })}
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                />
                                {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Confirm Password</label>
                                <input
                                    {...register("confirmPassword", { required: "This field is required" })}
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                    placeholder="••••••••"
                                />
                                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
                            </div>
                        </>

                    }

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        {isSubmitting ? "Signing in..." : "Reset Password"}
                    </button>
                </form>
            </div>
            <Modal
                title="OTP Verification"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                confirmLoading={loading}
                okText={'Verify OTP'}
                onOk={() => handleSubmitB(onSubmitB)}
                footer={(_, { OkBtn, CancelBtn }) => <div className='flex justify-end pt-4 gap-2'>
                    <OkBtn />
                    <CancelBtn />

                </div>}
                // onOk={handleOk}
                onCancel={handleCancel}
            >
                {/* <div className="flex items-center justify-center bg-gray-100 px-4"> */}
                <form
                    onSubmit={handleSubmitB(onSubmitB)}
                    className="pt-4 w-full max-w-xs space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium mb-1">OTP</label>
                        <input
                            {...registerB("otp", { required: "This field is required" })}
                            type="text"
                            minLength={4}
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                            placeholder="enter otp here..."
                        />
                        {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
                    </div>
                </form>
                {/* </div> */}

            </Modal>
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

export default ResetPassword;