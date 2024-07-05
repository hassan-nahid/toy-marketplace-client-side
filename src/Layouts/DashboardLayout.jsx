import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../firebase/firebase.config";

const DashboardLayout = () => {

    const [user, ,] = useAuthState(auth);
    const [signOut, ,] = useSignOut(auth);


    const handleSignOut = async () => {
        try {
            await signOut()
            localStorage.removeItem('token')

        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
                    Open Sidebar
                </label>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-between">
                    {/* Sidebar content here */}
                    <div>
                        <li><Link to="add_toy" className="font-semibold">Add Toy</Link></li>
                        <li><Link to="my_toy" className="font-semibold">My Toy</Link></li>
                        <div className="divider" />
                        <li><Link to="/" className="font-semibold">Main Home</Link></li>
                    </div>
                    <div className="flex">
                        {user?.photoURL === null ? <img className='w-12 h-12 mx-1 rounded-full' src={"https://i.ibb.co/kg6fMYC/placeholder.jpg"} alt="" title={user?.displayName} /> :
                            <img className='w-12 h-12 mx-1 rounded-full' src={user?.photoURL} alt="" title={user?.displayName} />}

                        {user ? <button onClick={handleSignOut} className="btn btn-error w-[80%]">Sign Out</button> : <Link to="/login" className="btn btn-primary w-[80%]">Login</Link>}
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default DashboardLayout;