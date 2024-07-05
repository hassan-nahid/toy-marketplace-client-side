import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../../../firebase/firebase.config";

const NavBar = () => {
    const [user, , ] = useAuthState(auth);
    const [signOut, , ] = useSignOut(auth);


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
        <div className="navbar bg-red-600 px-2">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-red-100 rounded-box w-52">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/alltoy">All Toys</Link></li>
                        {user ? <li><Link to="/dashboard">Dashboard</Link></li> : null}
                    </ul>
                </div>
                <Link className="text-white font-bold text-xl" to="/">ABC TOYS</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><Link className="text-white" to="/">Home</Link></li>
                    <li><Link className="text-white" to="/all_toy">All Toys</Link></li>
                    {user ? <li><Link className="text-white" to="/dashboard">Dashboard</Link></li> : null}
                    </ul>
            </div>
            <div className="navbar-end">
                {user ? (
                    <h1 className="flex">
                        <button onClick={handleSignOut} className='btn text-red-600'>LogOut</button>
                        {user?.photoURL === null ? <img className='w-12 mx-2 rounded-full' src={"https://i.ibb.co/kg6fMYC/placeholder.jpg"} alt="" title={user?.displayName} />:
                        <img className='w-12 mx-2 rounded-full' src={user?.photoURL} alt="" title={user?.displayName} />}
                    </h1>
                ) : (
                    <Link to="login"><button className='btn text-red-600'>Login</button></Link>
                )}
            </div>
        </div>
    );
};

export default NavBar;
