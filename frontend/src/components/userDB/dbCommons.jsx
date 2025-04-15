import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";

function DBCommons() {
    const { dbID } = useParams();

    const navigate = useNavigate();
    useEffect(() => {
        if (!dbExists(dbID))
            navigate("/notfound");
        if (!signedIn())
            navigate('/login');
        if (!authenticate())
            navigate('/denied');
    }, []);

    return (
        <div className="flex flex-row gap-2 justify-start">
            <Sidebar />
            <Outlet />
        </div>
    )
}

function dbExists(dbID) {
    // run a SELECT dbID querry here to verify if it exists
    return true;
}
function signedIn() {
    // check JWT
    return true;
}
function authenticate() {
    // check if User has Access to DB
    return true;
}

export default DBCommons;