import React from "react"
import AuthLayout from "../../components/layout/AuthLayout"
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/inputs/input";
import { validateEmail } from "../../utils/helper";



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleLogin = async (e) => { 
        e.preventDefault();

        if(!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        } 

        if(!password) {
            setError("Please enter the password.");
            return;
        }

        setError("");

        //Login API
    }

    return (
        <AuthLayout>
            <div className="flex items-center justify-center h-100 p-5 text-left">
                <div className="">
                    <h3 className="text-center text-2xl">Welcome!</h3>
                    <p className="text-center text-[13px] text-slate-500 m-2 mb-5">Please enter your details to login</p>

                    <form onSubmit={handleLogin}>
                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="jane@example.com"
                            type="text"
                        />

                        <Input
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            label="Password"
                            placeholder="Minimum 8 characters"
                            type="password"
                        />

                        {error && <p className="text-red-500 text-xs pb-2">{error}</p>}

                        <button type="submit" className="w-full font-medium text-white bg-blue-400 shadow-lg shadow-blue-600/5 p-[10px] rounded-md my-1 hover:bg-blue-600/15 hover:text-blue-600">
                            Login
                        </button>

                        <p className="text-[13px] text-slate-400 mt-3">
                            Don't have an account? {" "}
                            <Link className="text-blue-200 underline" to="/register">
                            Register Now!
                            </Link>
                        </p>
                    </form>


                </div>
            </div>
        </AuthLayout>
    )
}

export default Login

{/* 
 */}