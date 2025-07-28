import { Outlet } from "react-router-dom";
import Header from "../components/header";

const Dashboard = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default Dashboard;