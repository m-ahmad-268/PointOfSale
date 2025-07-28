import { useDispatch, useSelector } from "react-redux";
import { decrement } from "../slices/authSlice";
import { hideLoader, showLoader } from "../slices/commonSlice";

const Header = () => {
    // const storeToken = useSelector(state => state.counter.token);
    const loader = useSelector(state => state.common.loader);
    const dispatch = useDispatch();


    const logout = () => {
        dispatch(showLoader());

        setTimeout(() => {
            dispatch(decrement());
            dispatch(hideLoader());

        }, 1500);

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


                <a className="flex items-center space-x-4" onClick={logout} >
                    <span className="text-sm text-gray-600 hidden sm:block">Hi, User</span>
                    <img
                        src="https://ui-avatars.com/api/?name=Faizan+T&background=0D8ABC&color=fff"
                        alt="User Avatar"
                        className="w-8 h-8 rounded-full"
                    />
                </a>
            </div>}
        </header>

    );
};

export default Header;
