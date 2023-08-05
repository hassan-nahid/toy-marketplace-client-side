import { Link, useLocation, Navigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { UserAuth } from '../../provider/AuthContext';
import { useState } from 'react';

const Login = () => {
    const { emailSignIn, googleSignIn, error, user } = UserAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleEmailSignIn = async () => {
        try {
            await emailSignIn(email, password);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.log(error);
        }
    };

    if (user) {
        // Redirect to the 'from' route if the user is already authenticated
        return <Navigate to={from} />;
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200 py-8">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display error message if it exists */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="input input-bordered"
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="input input-bordered"
                                />
                                <span className="my-3">
                                    
                                    Do not Have an Account <Link className="link link-primary" to="/register">Register</Link>
                                </span>
                            </div>
                            <div className="form-control mt-6">
                                <button onClick={handleEmailSignIn} className="btn btn-outline btn-error">Login</button>
                            </div>
                            <span className='text-center font-bold'>or</span>
                            <div className='flex flex-col items-center'>
                                <button onClick={handleGoogleSignIn} className="btn btn-outline btn-error">
                                    Login With Google <FaGoogle className="mx-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;