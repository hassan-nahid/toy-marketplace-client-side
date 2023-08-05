import { useContext, createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const emailSignUp = (email, password, name, photoURL) => {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name,
                        photoURL: photoURL
                    })
                        .then(() => {
                            signInWithEmailAndPassword(auth, email, password)
                                .then((userCredential) => {
                                    setUser(userCredential.user);
                                    resolve();
                                })
                                .catch((error) => {
                                    setError(error.message);
                                    reject(error);
                                });
                        })
                        .catch((error) => {
                            setError(error.message);
                            reject(error);
                        });
                })
                .catch((error) => {
                    setError(error.message);
                    reject(error);
                });
        });
    };

    const emailSignIn = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                setUser(userCredential.user);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const githubSignIn = () => {
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((userCredential) => {
                setUser(userCredential.user);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    const logOut = () => {
        signOut(auth)
            .then(() => {
                setUser(null);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider
            value={{ emailSignUp, emailSignIn, googleSignIn, githubSignIn, logOut, user, error }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};