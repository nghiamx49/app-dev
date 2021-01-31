const db = require("../Migrations/db.Connection");
const User = db.users;
const Role = db.roles;
const passport = require("passport");
const passportConf = require("./Auth.Middleware");

const isAdmin = async(req, res, next) => {
    try {
        const { _id } = req.user;
        const findUser = await User.findById(_id);
        const findRole = await Role.findById(findUser.roleId[0]);
        const { name } = findRole;
        if (name !== "admin") {
            res.status(403).json({
                message: { mesBody: "Your dont have permission to access this page" },
                mesErorr: true,
            });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({
            message: { mesBody: "Errors" },
            mesErorr: true,
        });
        next(error);
    }
};

const isStaff = async(req, res, next) => {
    try {
        const { _id } = req.user;
        const findUser = await User.findById(_id);
        const findRole = await Role.findById(findUser.roleId[0]);
        const { name } = findRole;
        if (name !== "staff") {
            res.status(403).json({
                message: { mesBody: "Your dont have permission to access this page" },
                mesErorr: true,
            });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({
            message: { mesBody: "Errors" },
            mesErorr: true,
        });
        next(error);
    }
};

const isTrainer = async(req, res, next) => {
    try {
        const { _id } = req.user;
        const findUser = await User.findById(_id);
        const findRole = await Role.findById(findUser.roleId[0]);
        const { name } = findRole;
        if (name !== "trainer") {
            res.status(403).json({
                message: { mesBody: "Your dont have permission to access this page" },
                mesErorr: true,
            });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({
            message: { mesBody: "Errors" },
            mesErorr: true,
        });
        next(error);
    }
};

const isTrainee = async(req, res, next) => {
    try {
        const { _id } = req.user;
        const findUser = await User.findById(_id);
        const findRole = await Role.findById(findUser.roleId[0]);
        const { name } = findRole;
        if (name !== "trainee") {
            res.status(403).json({
                message: { mesBody: "Your dont have permission to access this page" },
                mesErorr: true,
            });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({
            message: { mesBody: "Errors" },
            mesErorr: true,
        });
        next(error);
    }
};

const checkRole = {
    isAdmin,
    isStaff,
    isTrainer,
    isTrainee,
};

module.exports = checkRole;