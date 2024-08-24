const { createToken } = require("../middlewares/jwt");
const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({ message: "Email and password required" });
        }
        const user = await usersModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "Incorrect email or password" });
        }

        const validPass = await bcrypt.compare(password, user.password);

        if (!validPass) {
            return res.status(404).json({ message: "Incorrect email or password" });
        }

        const token = createToken({ id: user._id });

        if (token) {
            res.cookie("access_token", token);

            return res.status(200).send({ id: user._id, name: user.name, email: user.email });
        } else {
            return res.status(404).json({ message: "Error creating token" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ message: error.message });
    }
};
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({ message: "Name,email and password required" });
        }

        const exist = await usersModel.findOne({ email });

        if (exist) {
            return res.status(404).json({ message: "Email already exist" });
        }

        const encodedPass = await bcrypt.hashSync(password, 10);

        const newUser = await usersModel.create({ name, email, password: encodedPass });

        if (newUser) {
            const token = createToken({ id: newUser._id });

            if (token) {
                res.cookie("access_token", token);

                return res.status(200).send({ id: newUser._id, name: newUser.name, email: newUser.email });
            } else {
                return res.status(404).json({ message: "Error creating token" });
            }
        }
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ message: error.message });
    }
};

module.exports = { login, register };
