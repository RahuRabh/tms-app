const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const generateToken = require("../../utils/generateToken");

module.exports = {
  Mutation: {
    register: async (_, { name, email, password, role }) => {
      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashed, role });
      return { token: generateToken(user), user };
    },

    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid password");

      return { token: generateToken(user), user };
    },
  },
};
