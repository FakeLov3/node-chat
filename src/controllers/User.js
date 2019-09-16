const md5 = require('md5');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const Query = {
    user: async(req, res, next) => {
        try {
            const user = await User.findById(req.params.id);
            user ? res.status(200).send(user) : res.status(500).send({
                error: 'No user found.'
            });
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error.'
            });
        }
    },

    users: async(req, res, next) => {
        try {
            const users = await User.find();
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error.'
            });
        }
    },
};

const Mutation = {
    createUser: async(req, res, next) => {
        try {
            const user = await User.create({
                name: req.body.name,
                email: req.body.email, rooms: [],
                password: md5(req.body.password + process.env.SALT_KEY),
                role: 'user',
            });
            user ? res.status(200).send(user) : res.status(500).send({
                error: 'Could not create user.'
            });
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error.'
            });
        }
	},

	deleteUser: async(req, res, next) => {
        try {
            const user = await User.findByIdAndRemove(req.params.id);
            user ? res.status(200).send(user) : res.status(500).send({
                error: 'Could not delete user.'
            });
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error.'
            });
        }
	},

	auth: async(req, res, next) => {
        try {
            const user = await User.findOne({
                email: req.body.email,
                password: md5(req.body.password + process.env.SALT_KEY)
            });
            const token = user ? {
                token: jwt.sign({
                    id: user.id,
                    name: user.name,
                    role: user.role
                }, process.env.JWT_SECRET, { expiresIn: '1d' })
            } : null;
            token ? res.status(200).send(token) : res.status(500).send({
                error: 'No user found.'
            });
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error.'
            });
        }
		
	},
};

module.exports = {
	Query,
	Mutation
}