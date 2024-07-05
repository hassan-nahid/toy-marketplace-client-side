import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import 'tailwindcss/tailwind.css';


const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className="mx-auto max-w-screen-xl">
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;