const { verifyToken } = require("../middlewares/jwt");
const usersModel = require("../models/usersModel");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
    try {
        const users = await usersModel.find({}, { password: false });
        return res.status(200).send(users);
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ message: error.message });
    }
};

const getSingleUser = async (req, res) => {
    try {
        const _id = req.params.id;
        if (!_id) {
            return res.status(404).json({ message: "Id not found" });
        }
        const users = await usersModel.findOne({ _id }, { password: false });
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).send(users);
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({ message: "Name,email and password required" });
        }

        const exist = await usersModel.findOne({ email });

        if (exist) {
            return res.status(404).json({ message: "Email already exist" });
        }

        const encodedPass = bcrypt.hashSync(password, 10);

        const newUser = await usersModel.create({ name, email, password: encodedPass });

        if (newUser) {
            return res.status(200).send(newUser);
        }
    } catch (error) {
        console.log(error.message);
        return res.status(404).json({ message: error.message });
    }
};

const updateUser = async (req, res) => {
    const { id, name, email, title, gender, image } = req.body;

    if (!id) {
        return res.status(404).json({ message: "Id not found" });
    }

    try {
        await usersModel.findByIdAndUpdate(id, { name, email, title, gender, image });
        return res.status(200).json({ message: "User info updated" });
    } catch (error) {
        console.log(error);
        return res.status(404).json({ message: error.message });
    }
};

const getUserByToken = async (req, res) => {
    try {
        const token = req.headers.token.split(" ")[1];
        if (!token) {
            return res.status(404).json({ message: "Token not found" });
        }
        const user = verifyToken(token);
        if (user) {
            const data = await usersModel.findOne({ _id: user.id }, { password: false });
            return res.status(200).json(data);
        } else {
            res.clearCookie("access_token");
            return res.status(404).json({ message: "User not found or token expired!" });
        }
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

module.exports = { getAllUsers, getSingleUser, createUser, getUserByToken, updateUser };
