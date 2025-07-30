import { useDispatch, useSelector } from "react-redux";
import { reestData } from "../slices/authSlice";
import { hideLoader, showLoader } from "../slices/commonSlice";
import { logout } from "../services/commonService";
import { message } from "antd";

const Header = () => {
    const userDetail = useSelector(state => state.counter.userDetail);
    const token = useSelector(state => state.counter.token);
    const loader = useSelector(state => state.common.loader);
    const dispatch = useDispatch();


    const getLogout = async () => {
        if (!token)
            return;

        dispatch(showLoader());
        try {
            const data = await logout(null, { token: token });
            if (data && data?.code == 1 && data?.additionalDetail) {
                dispatch(reestData());
                message.success(data?.additionalDetail || 'User logout successfully')
            } else {
                message.error(data?.additionalDetail || 'Something went wrong')

            }
            dispatch(hideLoader());
        } catch (error) {
            console.error('Error fetching user:', error);
            dispatch(hideLoader());
        }



        // navigate('/dashboard');
    };



    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            {!loader && <div className="max-w-9xl mx-auto px-4 py-3 flex justify-between items-center gap-10">

                <div className="text-xl font-bold text-blue-600">
                    MY POS
                </div>

                <nav className="hidden md:flex flex-1 space-x-6 text-sm bg-red-100 font-bold text-gray-700" >
                    <a href="#" className="hover:text-blue-600">Dashboard</a>
                    <a href="/dashboard/hello" className="hover:text-blue-600">Projects</a>
                    <a href="/dashboard/check" className="hover:text-blue-600">Users</a>
                    <a href="#" className="hover:text-blue-600">Settings</a>
                </nav>


                <a className="flex items-center space-x-4" onClick={getLogout} >
                    <span className="text-sm text-gray-600 hidden sm:block">Hi, {userDetail?.username || ''}</span>
                    <img
                        src={`https://ui-avatars.com/api/?name=${userDetail?.username}+&background=0D8ABC&color=fff`}
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                </a>
            </div>}
        </header>

    );
};

export default Header;
