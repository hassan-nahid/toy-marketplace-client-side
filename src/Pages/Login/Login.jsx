import { Link, useLocation, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import auth from '../../firebase/firebase.config';
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import { toast } from 'react-toastify';

const Login = () => {
    const [
        signInWithEmailAndPassword,
        user,
        ,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    console.log(user)
    const handleEmailSignIn = async () => {
        try {
            await signInWithEmailAndPassword(email, password)
                .then(async (userCredential) => {
                    if (userCredential) {
                        toast.success('Login Successful', {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        const userData = {
                            email,
                            name: userCredential?.user?.displayName,
                            uid: userCredential?.user?.uid
                        }
                        fetch("http://localhost:5000/user", {
                            method: "POST",
                            headers: {
                                "content-type": "application/json"
                            },
                            body: JSON.stringify(userData)

                        })
                            .then(res => res.json())
                            .then(data => {
                                localStorage.setItem("token", data?.token);
                            })
                    }

                })

            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error);
        }
    };

    // const handleGoogleSignIn = async () => {
    //     try {
    //         await googleSignIn();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    if (user) {
        // Redirect to the 'from' route if the user is already authenticated
        return <Navigate to={from} />;
    }

    return (
        <div>
            <div className="hero min-h-screen bg-base-200 py-8">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>ABC TOYS | Login</title>
                </Helmet>
                <div className="hero-content w-full">
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
                            <GoogleLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;