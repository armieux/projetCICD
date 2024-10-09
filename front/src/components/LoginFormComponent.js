import React, { useState } from 'react';
import userService from '../services/userService';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        // try {
        const user = await userService.loginUser(email);
        if (user) {
            setIsLoggedIn(true);
            // Store the user's connected state in the front, e.g., in local storage or context
            localStorage.setItem('userId', user.id);
        }
        // } catch (error) {
        //     alert(error.message);
        // }
    };

    return (
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit">Login</button>
            {isLoggedIn && <p>User is logged in</p>}
        </form>
    );
}

export default LoginForm;