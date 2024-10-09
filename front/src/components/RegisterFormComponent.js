import React, { useState } from 'react';
import userService from '../services/userService';

function RegisterForm() {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
    });
    const [isRegistered, setIsRegistered] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const newUser = await userService.createUser(formData);
            if (newUser) {
                setIsRegistered(true);
                // Handle post-registration logic, such as redirecting to a login page
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form onSubmit={handleRegister}>
            <label htmlFor="firstname">First Name:</label>
            <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="lastname">Last Name:</label>
            <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                required
            />

            <label htmlFor="email">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />

            <button type="submit">Register</button>
            {isRegistered && <p>Registration successful!</p>}
        </form>
    );
}

export default RegisterForm;