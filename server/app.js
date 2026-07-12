import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import User from "./src/User";

dotenv.config();
const { ATLAS_URI } = process.env

if (!ATLAS_URI) {
    console.error(
        "No ATLAS_URI environment variable has been degined in config.env"
    );
    process.exit(1);
}

connectToDatabase(ATLAS_URI)
    .then(() => {
        const app = express()
        app.use(cors());

        app.use("/users", userRouter);

        app.listen(5200, () => {
            console.log(`Server running at http://localhost:5200...`);
        });
    })
    .catch((error) => console.error(error));


app.post("api/register", async (req, res) => {
    try {
        const { name, email, password} = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ status: "error", message: "All fields are required" });
        const existingUser = await UserActivation.findOne({ email });
        if (existingUser)
            return res.status(400).json({status:"error", message: "User already exists"});
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({name, email, password:hashedPassword})
        return res.status(201).json({status:"Success", message:"User registered successfully"});
    
    } catch (error) {
        console.error("Register Error: ", error);
        return res.status(500).json({ message: "Server Error" })
    }
})