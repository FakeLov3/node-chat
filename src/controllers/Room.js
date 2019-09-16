const Room = require('../models/Room');
const User = require('../models/User');

const Query = {};

const Mutation = {
    createRoom: async(req, res, next) => {
        try {
            const user = await User.findById(req.body.id);
            if(!user) res.status(500).send({
                error: 'No user found.'
            });
            const room = await Room.create({
                title: req.body.title,
                users: [user],
                messages: []
            });
            if(!room) res.status(500).send({
                error: 'Could not create room.'
            });
            user.rooms.push(room.id);
            user.updateOne(user, (err, doc) => 
            err ? res.status(500).send({
                error: 'Could not join room.'
            }) : doc);
            res.status(200).send(room);
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error.'
            });
        }
    },
    
    joinRoom: async(req, res, next) => {
        try {
            const user = await User.findById(req.body.id);
            const room = await Room.findById(req.body.room);
            if(!room) res.status(500).send({
                error: 'No room found.'
            });
            user.rooms.push(room.id);
            user.updateOne(user, (err, doc) => 
            err ? res.status(500).send({
                error: 'Could not join room.'
            }) : doc);
            res.status(200).send(room);
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error.'
            });
        }
    }
};

module.exports = {
	Query,
	Mutation
}