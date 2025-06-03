const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginUserSchema } = require("./schema/auth.schema");
const prisma = require("../../utils/prisma");
require("dotenv").config();

const Secret_key = process.env.SECRET_KEY;

const loginUser = async (req, res) => {
  try {
    const { value, error } = loginUserSchema.validate(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    const getUser = await prisma.user.findUnique({
      where: { email: value.email },
    });
    if (!getUser) {
      return res.status(400).json({ error: "Invalid Login Parameters" });
    }

    const comparePassword = await bcrypt.compare(
      value.password,
      getUser.password,
    );

    if (!comparePassword) {
      return res.status(400).json({ error: "Invalid Login Parameters" });
    }
    const payload = {
      sub: getUser.id,
      email: getUser.email,
    };
    const token = jwt.sign(payload, Secret_key);
    res.status(200).json({ token, id: getUser.id, fullname: getUser.fullName });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = { loginUser };
