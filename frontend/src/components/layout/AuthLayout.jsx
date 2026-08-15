import React from "react";
import monkey from "../../assets/monkey.png";

const AuthLayout = ({ children }) => {
    return (
        <div className="gradient flex flex-col items-center text-center min-h-screen">
            <div className="w-screen flex justify-center p-8">

                <img
                    src={monkey}
                    className="w-[50%] lg:w-[20%] shadow-lg shadow-blue-400/15"
                />
            </div>

            <div className="w-screen md:w-[60vw] pt-10">
                <h2 className="text-6xl font-medium text-white font-geist">Cococoins</h2>
                <div className="bg-white rounded-[40px] mt-10 shadow-lg shadow-blue-700 p-5">
                    {children}
                </div>
            </div>



        </div>
    )
}

export default AuthLayout