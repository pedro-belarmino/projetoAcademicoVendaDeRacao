import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar";

export default function Template() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
}