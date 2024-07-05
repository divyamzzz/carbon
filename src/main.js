import React, { useState } from "react";
import axios from "axios";

function Login(props) {
    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:5000/login", user)
            .then(response => {
                console.log(response.data);
                // Handle successful response
            })
            .catch(error => {
                console.error("There was an error!", error);
                // Handle error
            });
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="username"
                placeholder="Username"
                onChange={handleChange}
                value={user.username}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={user.password}
            />
            <button type="submit">Submit</button>
        </form>
    );
}

export default Login;
