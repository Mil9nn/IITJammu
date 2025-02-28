import { body, validationResult } from "express-validator";

export const validateAppointmentInput = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email address"),
  body("phone").notEmpty().withMessage("Phone number is required"),
  body("date").isISO8601().withMessage("Invalid date format"),
  body("time").notEmpty().withMessage("Time is required"),
  body("appointmentType").notEmpty().withMessage("Appointment type is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];