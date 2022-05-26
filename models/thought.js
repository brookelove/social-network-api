const { Schema, model, default: mongoose, Types } = require('mongoose');

// subdocument of the schema 
const reactionSchema = new mongoose.Schema (
    {
        reactionId: {
            type: mongoose.Schema.Types.ObjectId, 
            default: ()=> new Types.ObjectId()
            //ref: 'reactionId'
        },
        reactionBody: {
            type: String,
            required: function() {return this.reactionId != null},
            validate: function (v) {
                validator: 'isLength';
                arguments: [280];
                message: 'Your reaction should be no more than 280 characters'
            }
        },
        username: {
            type: String,
            required: function() {return this.usernameId != null},
        },
        createAt: {
            type: Date, 
            default: Date.now, 
        
        }
    },
    {toJSON: {getters: true}, id: false,});
// main document for the thoughts 
const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
             type: String,
            required: function() {return this.thoughtTextlId != null},
            validate: function(v) {
                validator: 'isLength';
                arguments: [1, 280];
                message: 'Your thought should be between 1 and 280 characters'
            }
        },
        createAt: {
            type: Date, 
            default: Date.now, 
        },
        username: {
            type: String,
            required: function() {return this.usernameId != null}
        },
        reactions:[reactionSchema]
    },
    {toJSON:{getters: true}, id: false,});


const Thought = mongoose.model('Thought', thoughtSchema);

Thought.create({
    thoughtText: 'I love tiny houses',
    createAt: 'MAY 22, 2022',
    username: 'tinyhouse<3',
    reactions: [
        {
            
            reactionBody: 'Oh my gosh I love tinyhouses too!',
            username: 'tinyteam',
            createdAt: 'MAY 23 2022'
        }
    ]
    }).then (data => {
        console.log(data)
    }).catch (err => {
        console.log(err);
})

const myReaction = new Thought ();
module.exports = Thought;
