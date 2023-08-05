import { Outlet } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import NavBar from "../Pages/Shared/NavBar/NavBar";
import 'tailwindcss/tailwind.css';
import { AuthContextProvider } from "../provider/AuthContext";


const Main = () => {
    return (
        <div>
            <AuthContextProvider>
                <NavBar></NavBar>
                <div className="mx-auto max-w-screen-xl">
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </AuthContextProvider>
        </div>
    );
};

export default Main;