import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import auth from '../../firebase/firebase.config';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin';
import { toast } from 'react-toastify';

const Register = () => {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const [
        createUserWithEmailAndPassword,
        user,
        ,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate inputs
        if (email.trim() === '' || password.trim() === '') {
            setValidationError('Please enter both email and password.');
            return;
        }
        if (password.length < 6) {
            setValidationError('Password should be at least 6 characters long.');
            return;
        }

        // Clear validation error
        setValidationError('');

        // Submit the form with name, photo, email, and password
        createUserWithEmailAndPassword(email, password)
            .then(async (userCredential) => {
                if (userCredential) {
                    toast.success('Registration Successful', {
                        position: toast.POSITION.TOP_CENTER,
                    });
                    const userData = {
                        email: userCredential?.user?.email,
                        name: displayName,
                        uid: userCredential?.user?.uid,
                    };

                    await fetch("http://localhost:5000/user", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify(userData),
                    })
                        .then(res => res.json())
                        .then(data => {
                            localStorage.setItem("token", data?.token);
                        });

                    setDisplayName('');
                    setEmail('');
                    setPassword('');
                }
            })
            .catch((error) => {
                console.error(error);
                setValidationError('Registration failed. Please try again.');
            });
    };

    if (user) {
        // Redirect to the 'from' route if the user is already authenticated
        return <Navigate to={from} />;
    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Deen Inspire | Register</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200 py-8">
                <div className="hero-content w-full">
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="name"
                                        name="name"
                                        className="input input-bordered"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="email"
                                        name="email"
                                        className="input input-bordered"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        className="input input-bordered"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-outline btn-error">
                                        Register
                                    </button>
                                </div>
                                <div className='my-4'>
                                    <span className="my-4">
                                        Already have an account? <Link className="link link-primary" to="/login">Login</Link>
                                    </span>
                                </div>
                            </form>
                            {validationError && <p className="text-red-500 mt-4">{validationError}</p>}
                            {error && <p className="text-red-500 mt-4">{error.message}</p>}
                            <span className='text-center font-bold'>or</span>
                            <GoogleLogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
