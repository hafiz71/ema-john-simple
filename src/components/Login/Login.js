import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    const handleSignIn = () => {
        auth.signInWithGoogle()
        .then(res => {
           window.location.pathname = "/review"
        })
    }
    const hangleSignOut = () => {
        auth.signOut()
        .then(res => {
            window.location.pathname = "/"
        })
    }
    return (
        <div>
            <h1>Join the party</h1>
            {
                auth.user ? <button onClick={hangleSignOut}>Sign out</button> :
                <button onClick={handleSignIn}>SignIn With Google</button>
            }
        </div>
    );
};

export default Login;