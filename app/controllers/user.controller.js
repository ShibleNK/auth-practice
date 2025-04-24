import db from "../models/index.js";

// app/controllers/user.controller.js

export const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

export const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

export const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

export const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

export const updateUserRoles = async (req, res) => {
  try {
    const { userId, roles } = req.body;

    const userToUpdate = await db.user.findByPk(userId);
    if (!userToUpdate) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const newRoles = await db.role.findAll({
      where: {
        name: roles,
      },
    });

    await userToUpdate.setRoles(newRoles);

    res.status(200).json({
      message: "User roles updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
