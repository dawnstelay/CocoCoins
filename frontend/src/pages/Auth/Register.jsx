import React from "react";
import { useState, useContext } from "react";
import AuthLayout from "../../components/layout/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/profilephotoselector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/userContext";


const Register = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);
    const { updateUser } = useContext(UserContext);
    const navigate = useNavigate();

  

    const handleRegister = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if (!fullName) {
            setError("Please enter your name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter a password.")
            return;
        }

        setError("");

        //Register API
        try {

            if (profilePic) {
                const imgUploadRes = await UploadImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl,
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/'home");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };


    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xel font-semibold text-black">Create an Account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below.
                </p>


                <form onSubmit={handleRegister}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label="Full Name"
                            placeholder="Jane"
                            type="text"
                        />

                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="jane@example.com"
                            type="text"
                        />

                        <div className="col-span-2">

                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label="Password"
                                placeholder="Minimum 8 characters"
                                type="password"
                            />

                        </div>


                    </div>

                    {error && <p className="text-red-500 text-xs pb-2">{error}</p>}

                    <button type="submit" className="w-full font-medium text-white bg-blue-400 shadow-lg shadow-blue-600/5 p-[10px] rounded-md my-1 hover:bg-blue-600/15 hover:text-blue-600">
                        Sign Up
                    </button>

                    <p className="text-[13px] text-slate-400 mt-3">
                        Already have an account? {" "}
                        <Link className="text-blue-200 underline" to="/login">
                            Login here.
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default Register