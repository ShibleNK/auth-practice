// app/controllers/auth.controller.js

import db from "../models/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authConfig from "../config/auth.config.js";

const User = db.user;
const Role = db.role;

export const signup = async (req, res) => {
  try {
    // create new user
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const role = await Role.findOne({
      where: {
        name: "admin",
      },
    });
    await user.setRoles([role]);
    res.status(200).json({
      message: "User was registered successfully!",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const signin = async (req, res) => {
  try {
    // Find user by username
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    // Validate password
    const passwordIsValid = bcrypt.compare(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    // Generate JWT
    const token = jwt.sign({ id: user.id }, authConfig.secret, {
      expiresIn: 86400, // 24 hours
    });

    // Get user roles
    const roles = await user.getRoles();
    const authorities = roles.map((role) => `ROLE_${role.name.toUpperCase()}`);

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
