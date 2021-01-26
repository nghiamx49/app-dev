const db = require("../Model/db.Connection");
const User = db.users;
const Role = db.roles;

const isAdmin = async (req, res, next) => {
  try {
    const { _id } = req.users;
    const findUser = await User.findById(_id);
    const findRole = await Role.findById(findUser.roleId[0]);
    const { name } = findRole;
    if (name === "admin") {
      next();
    }
  } catch (error) {
    res.status(4000).json({
      message: { mesBody: "Your dont have permission to access this page" },
      mesErorr: true,
    });
    next(error);
  }
};

const checkRole = {
  isAdmin,
};

module.exports = checkRole;
