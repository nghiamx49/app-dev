const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const UsersSchema = mongoose.Schema({
  username: String,
  password: String,
  name: String,
  roleId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Roles" }],
  trainerInfoId: [{ type: mongoose.Schema.Types.ObjectId, ref: "TrainerInfo" }],
  traineeInfoId: [{ type: mongoose.Schema.Types.ObjectId, ref: "TraineeInfo" }],
});

UsersSchema.pre("save", async function (next) {
  // Hash the password before saving the user model
  try {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    user.password = await bcrypt.hash(user.password, 8);
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});


UsersSchema.methods.comparePassword = function (password, callback) {
  // Compare user password
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    } else {
      if (!isMatch) {
        return callback(null, false);
      }
      return callback(null, this);
    }
  });
};

module.exports = mongoose.model("Users", UsersSchema);
