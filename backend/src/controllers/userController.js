const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ResponseAPI = require('../utils/response');
const { jwtSecret, jwtExpiresIn } = require('../config/env');

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: jwtExpiresIn });
};

const userController = {
    async login(req, res) {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }

            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                return ResponseAPI.error(res, 'Invalid email or password', 401);
            }

            const token = generateToken(user._id);

            ResponseAPI.success(res, {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    photo_url: user.photo_url
                }
            });
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user._id).select('-password');
            ResponseAPI.success(res, user);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    },

    async updateProfile(req, res) {
        try {
            const { name, email, photo_url, password } = req.body;

            const user = await User.findById(
                req.user._id
            ).select('-password');

            if (req.body.password) {
                user.password = password;
            }

            if(name) {
                user.name = name
            }

            if(email) {
                user.email = email
            }

            if(photo_url) {
                user.photo_url = photo_url
            } 

            await user.save()

            ResponseAPI.success(res, user);
        } catch (error) {
            ResponseAPI.serverError(res, error);
        }
    }
};

module.exports = userController;