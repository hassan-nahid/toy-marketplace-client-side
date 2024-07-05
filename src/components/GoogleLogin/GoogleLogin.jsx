import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FaGoogle } from 'react-icons/fa';
import auth from '../../firebase/firebase.config';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleLogin = () => {
    const [signInWithGoogle, user, , ] = useSignInWithGoogle(auth);
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = () => {
        signInWithGoogle()
        .then(async (userCredential) => {
            if (userCredential) {
                toast.success('Login Successful', {
                    position: toast.POSITION.TOP_CENTER,
                });
                const userData = {
                    email: userCredential?.user?.email,
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
    }

    if (user) {
        // Redirect to the 'from' route if the user is already authenticated
        return <Navigate to={from} />;
    }
    return (
        <div>
            <div className='flex flex-col items-center'>
                <button onClick={handleSubmit} className="btn btn-outline btn-error">
                    Login With Google <FaGoogle className="mx-2" />
                </button>
            </div>
        </div>
    );
};

export default GoogleLogin;