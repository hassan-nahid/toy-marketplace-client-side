import { useState } from 'react';
import { UserAuth } from '../../provider/AuthContext';
import { Link } from 'react-router-dom';

const Register = () => {
    const { emailSignUp, error } = UserAuth();
    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');

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
        emailSignUp(email, password, name, photo)
            .then(() => {
                // Clear input fields after successful registration
                setName('');
                setPhoto('');
                setEmail('');
                setPassword('');
            })
            .catch((error) => {
                // Handle registration error
                console.error(error);
                // You can set an error message here if needed
            });
    };

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
                            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
                            a id nisi.
                        </p>
                    </div>
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo Link</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="photo link"
                                        name="photo"
                                        className="input input-bordered"
                                        value={photo}
                                        onChange={(e) => setPhoto(e.target.value)}
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
                                    <button type="submit" className="btn btn-primary">
                                        Register
                                    </button>
                                </div>
                                <div className='my-4'>
                                <span className="my-4">
                                    You Have Already Account <Link className="link link-primary" to="/login">Login</Link>
                                </span>
                                </div>
                            </form>
                            {validationError && <p className="text-red-500 mt-4">{validationError}</p>}
                            {error && <p className="text-red-500 mt-4">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};

export default Register;