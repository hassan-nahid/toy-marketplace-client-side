import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <div className="navbar bg-red-600">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-red-100 rounded-box w-52">
                        <Link to="/"><li><a>Home</a></li></Link>
                        <Link to="/blog"><li><a>All Toys</a></li></Link>
                        <Link to="/blog"><li><a>My Toys</a></li></Link>
                        <Link to="/blog"><li><a>Add A Toys</a></li></Link>
                        <Link to="/blog"><li><a>Blogs</a></li></Link>
                    </ul>
                </div>
                <a className="text-white font-bold text-xl">ABC TOYS</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <Link className="text-white" to="/"><li><a>Home</a></li></Link>
                    <Link className="text-white" to="/blog"><li><a>All Toys</a></li></Link>
                    <Link className="text-white" to="/blog"><li><a>My Toys</a></li></Link>
                    <Link className="text-white" to="/blog"><li><a>Add A Toys</a></li></Link>
                    <Link className="text-white" to="/blog"><li><a>Blogs</a></li></Link>
                </ul>
            </div>
            <div className="navbar-end">
                <Link to="/login"><a className="btn text-red-500">Login</a></Link>
            </div>
        </div>
    );
};

export default NavBar;