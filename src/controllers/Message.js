const Room = require('../models/Room');
const User = require('../models/User');

const Query = {
    messages: async(req, res, next) => {
        try { 
            const room = await Room.findById(req.params.room);
            if(!room) res.status(500).send({
                error: 'No room found.'
            });
            res.status(200).send({
                messages: room.messages
            });
        } catch (error) {
            res.status(500).send({
                error: 'Internal server error.'
            });
        }
    }
};

const Mutation = {
    sendMessage: async(req, res, next) => {
        try {
            const room = await Room.findById(req.body.room);
            if(!room) return;
            room.messages.push({
                message: req.body.message,
                sender: req.body.id
            });
            room.updateOne(room, (err, doc) => 
            err ? res.status(500).send({
                error: 'Could not update messages.'
            }) : doc);
            res.status(200).send({
                message: req.body.message,
                sender: req.body.id
            });
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