import { Outlet } from "react-router-dom";

const Hello = () => {
    // return (
    //     <>
    //       <h1>hello parent</h1>
    //         <Outlet />
    //     </>
    // );
    return (
        <>
        hello pare
            <Outlet />
        </>
    );
};


export default Hello;