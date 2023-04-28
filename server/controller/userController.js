import User from "../model/user.js";
import Session from "../model/session.js";
import Doctor from "../model/doctor.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import moment from "moment";

export const registerUser = async (req, res) => {
  try {
    const { email, password, userName, number, date } = req.body;

    if (!email || !password || !number || !userName || !date) {
      return res.status(401).json({ message: "all fields are required" });
    }

    const userDetails = await User.findOne({ email });

    if (userDetails) {
      res
        .status(200)
        .json({ success: false, message: "User already Registered" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        userName,
        email,
        password: hashedPassword,
        number,
        date,
      });
      res.status(200).json({
        success: true,
        message: "success new user created",
        user: newUser,
      });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({ message: "all fields are required" });
    }

    const userDetails = await User.findOne({ email });

    if (userDetails) {
      if (userDetails.isBlocked) {
        return res
          .status(200)
          .json({ success: false, message: "User is blocked" });
      }

      const passMatch = await bcrypt.compare(password, userDetails.password);

      if (!passMatch) {
        return res
          .status(200)
          .json({ success: false, message: "User Password is Invalid" });
      }

      const token = jwt.sign(
        {
          id: userDetails._id,
          name: userDetails.userName,
          email: userDetails.email,
          number: userDetails.number,
        },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );
      res.status(200).json({ success: true, token, userDetails });
    } else {
      res.status(200).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const otpLogin = async (req, res) => {
  try {
    const userDetails = await User.findOne({ number: req.params.id });

    if (userDetails) {
      const token = jwt.sign(
        { id: userDetails._id, name: userDetails.userName },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
      );
      return res.status(202).json({ message: "user exist", token });
    }
    res.status(203).json({ message: "mobile no. mismatch" });
  } catch (error) {
    res.status(500).json({ message: `Error -> ${error}` });
  }
};

export const userDetails = async (req, res) => {
  try {
    const userDetails = await User.findOne({ _id: req.params.id });
    res
      .status(200)
      .json({ message: "user data sent successfully", userDetails });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const updateDetails = async (req, res) => {
  try {
    const userDetails = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        userName: req.body.userName,
        email: req.body.email,
        number: req.body.number,
      }
    );
    if (!userDetails) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "user data updated successfully", userDetails });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const password = req.body.newPassword;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          password: hashedPassword,
        }
      );

      return res
        .status(200)
        .json({ message: "user password is updated successfully" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const updateProfileImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        profilePic: result.secure_url,
      },
    });
    const pic = user.profilePic;
    return res
      .status(200)
      .json({ message: "user image updated successfully", pic });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const allDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    if (doctors) {
      return res
        .status(200)
        .json({ message: "doctors data sent successfully", doctors });
    }

    res.status(400).json({ message: "their is no doctor" });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ _id: req.params.id });
    res.status(200).json({ message: "doctor data sent success", doctor });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

export const bookSession = async (req, res) => {
  try {

    let dateString = req.body.date
    let timeString = req.body.time
    const date = new Date(dateString);
    console.log(date);
const [hours, minutes] = timeString.match(/(\d+):(\d+) (AM|PM)/).slice(1).map((v, i) => i < 2 ? Number(v) : v);
date.setHours(hours % 12 + (timeString.endsWith("PM") ? 12 : 0));
date.setMinutes(minutes);
date.setSeconds(50);
date.setMilliseconds(500);



// Format the date object into the desired string format
const formattedString = date.toISOString().replace("Z", "0").replace("T", " ").slice(0, -5) + "z";

console.log(formattedString); // Output: "2023-04-26 00:30:50.5000z"

const d = new Date(formattedString);

// Add two hours to the date object
date.setHours(date.getHours() + 2);

// Convert the date object back to an ISO string
const isoString = date.toISOString();

console.log(isoString); // Output: "2023-05-11T06:30:50.000Z"
    const today = moment().format("YYYY-MM-DD");

    const userDetails = req.body.userData;

    const doctorDetails = req.body.doctorDetails;
    const user = await User.findById(userDetails.id);

    const newSession = await Session.create({
      userId: user.id,
      userName: userDetails.name,
      doctorId: doctorDetails._id,
      doctorName: doctorDetails.fullName,
      timeSlot: req.body.time,
      plan: req.body.plan,
      sessionDate: req.body.date,
      bookedDate: today,
    });

    res
      .status(200)
      .json({ message: "Session booked successfully", newSession });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const appointment = async (req, res) => {
  try {
    const doctorId = req.body.doctorDetails._id;
    const date = req.body.date;
    const time = req.body.time;

    Doctor.findByIdAndUpdate(
      doctorId,
      {
        $push: {
          appointments: {
            date: date,
            times: [time],
          },
        },
      },
      { new: true } // set new: true to return the updated document
    )
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });

    res.status(200).json({ message: "appointment scheduled successfully" });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const availability = async (req, res) => {
  try {
    const doctorId = req.body.doctorId;
    const date = req.body.date;
    const time = req.body.time;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return false;
    }

    const appointment = doctor.appointments.find((appointment) => {
      return (
        appointment.date.toISOString().substr(0, 10) === date &&
        appointment.times.includes(time)
      );
    });

    if (appointment) {
      return res
        .status(204)
        .json({ message: `Appointment already exists for ${date} at ${time}` });
    }

    return res
      .status(202)
      .json({ message: `Time ${time} is available for ${doctor.fullName}` });
  } catch (err) {
    res.status(400).json(err);
  }
};

export const session = async (req, res) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const size = req.query.limit ? parseInt(req.query.limit) : 3;
    const skip = (page - 1) * size;
    const total = await Session.countDocuments();
    const id = req.params.id;
    const session = await Session.find({ userId: id })
      .sort({ bookedDate: -1 })
      .skip(skip)
      .limit(size);
    res.json({ session, total, page, size });
  } catch (err) {
    res.status(400).json(err);
  }
};


export const chat = async (req, res) => {

  const dateString = "2023-04-26";
const timeString = "12:30 AM";

// Create a new Date object and set its time using the time string
const date = new Date(dateString);
const [hours, minutes] = timeString.match(/(\d+):(\d+) (AM|PM)/).slice(1).map((v, i) => i < 2 ? Number(v) : v);
date.setHours(hours % 12 + (timeString.endsWith("PM") ? 12 : 0));
date.setMinutes(minutes);
date.setSeconds(50);
date.setMilliseconds(500);

// Format the date object into the desired string format
const formattedString = date.toISOString().replace("Z", "0").replace("T", " ").slice(0, -5) + "z";

console.log(formattedString); // Output: "2023-04-26 00:30:50.5000z"

  

  
  
} 
  
