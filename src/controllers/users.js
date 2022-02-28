import { Users } from '../config/relations.js';
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (req, res) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const userExists = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (userExists) {
      return res.status(400).json({
        success: false,
        content: null,
        message: `The user ${req.body.email} already exists`,
      });
    } else {
      const newUser = await Users.create(req.body);
      const msg = {
        to: newUser.email,
        from: 'emarlcoder@gmail.com',
        subject: 'Disney DB',
        text: 'Welcome to Disney DB',
        html: '<strong>YOU ARE REGISTERED</strong>',
      };
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent');
        })
        .catch((error) => {
          console.error(error);
        });
      return res.status(201).json({
        success: true,
        content: newUser,
        message: `The user ${req.body.email} has been created`,
      })
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: `Error creating the user ${req.body.email}`,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {
        email: email,
        password: password,
      }
    })
    if (user) {
      return res.status(201).json({
        success: true,
        content: [user, user.generateJWT()],
        message: 'Welcome',
      });
    } else {
      return res.status(400).json({
        success: false,
        content: null,
        message: 'Wrong password',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error.message,
      message: 'Error signing in',
    });
  }
}
