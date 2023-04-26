import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Admin from "../model/admin.js";
import User from "../model/user.js";
import Doctors from "../model/doctor.js";
import Session from "../model/session.js";
import { token } from "../validation/tokenValidate.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(200)
        .json({ success: false, message: "All fields are required" });
    }

    const adminDetails = await Admin.findOne({ email });

    if (adminDetails) {
      const matchPassword = await bcrypt.compare(
        password,
        adminDetails.password
      );

      if (!matchPassword)
        return res
          .status(200)
          .json({ success: false, message: "Admin Password is not matched" });

      const adminToken = jwt.sign(
        { id: adminDetails._id },
        process.env.ADMIN_JWT_SECRET
      );
      token(adminToken);
      res
        .status(200)
        .json({
          success: true,
          message: "Login success",
          adminToken,
          adminDetails,
        });
    } else {
      res
        .status(200)
        .json({ success: false, message: "admin email is not matched" });
    }
  } catch (err) {
    res.status(400).json({ error: err, message: "server error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(req.header("Authorization").split(" ").pop());
    if (!users) {
      return res.status(200).json({ message: "no users found" });
    }

    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctors.find({ isVerified: true });
    if (!doctors) {
      return res.status(200).json({ message: "no doctors found" });
    }

    res.status(200).json(doctors);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const doctorsRequest = async (req, res) => {
  try {
    let adminAuthHeader = req.header("Authorization");
    console.log(adminAuthHeader);
    const doctors = await Doctors.find({ isVerified: false });
    if (!doctors) {
      return res.status(200).json({ message: "no doctors found" });
    }

    res.status(200).json(doctors);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const blockUser = async (req, res) => {
  try {
    const users = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        isBlocked: true,
      }
    );

    res.status(200).json({ message: "user is blocked successfully", users });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const unBlockUser = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        isBlocked: false,
      }
    );

    res.status(200).json({ message: "user is unblocked successfully", user });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const verifyDoctor = async (req, res) => {
  try {
    const doctor = await Doctors.findOneAndUpdate(
      { _id: req.params.id },
      {
        isVerified: true,
      }
    );

    res
      .status(200)
      .json({ message: "doctor is verified successfully", doctor });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const removeDoctor = async (req, res) => {
  try {
    const doctor = await Doctors.findOneAndRemove({ _id: req.params.id });
    res.status(200).json({ message: "doctor removed successfully", doctor });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctors.findOne({ _id: req.params.id });
    res.status(200).json({ message: "doctor data sent success", doctor });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const appointments = async (req, res) => {
  console.log("hai");
  try {
    const appointments = await Session.find();
    console.log(appointments);
    res.status(200).json({ message: "data sent success", appointments });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};
