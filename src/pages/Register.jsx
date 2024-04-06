import React, { useState } from 'react';
import { useFirebase } from '../context/firebase';

const Registration = () => {
    const firebase = useFirebase();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await firebase.signupUserWithEmailAndPassword(email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await firebase.resetPassword(email);
            alert('Password reset email sent!');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Registration</h2>
            <form onSubmit={handleSignup}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Signup</button>
                <button onClick={handleForgotPassword}>Forgot Password</button> {/* Add this button */}
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default Registration;
