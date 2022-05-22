const { Schema, model, default: mongoose } = require('mongoose');

let thoughtValidator = [
    validate({
      validator: 'isLength',
      arguments: [1, 280],
      message: 'Your thought should be between 1 and 280 characters'
    }),
  ];
let reactionValidator = [
    validate({
      validator: 'isLength',
      arguments: [280],
      message: 'Your reaction should be no more than 280 characters'
    }),
  ];
// subdocument of the schema 
const reactionSchema = new mongoose.Schema (
    {
        reactionId: {
            type: Types.ObjectId,
            default: new ObjectId,
        },
        reactionBody: {
            type: String,
            required: function() {return this.reactionId != null},
            validate: reactionValidator
        },
        username: {
            type: String,
            required: function() {return this.usernameId != null},
        },
        createAt: {
            type: Date, 
            default: Date.now, 
            get: thoughtSchema
        }
    }
);
// main document for the thoughts 
const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
             type: String,
            required: function() {return this.thoughtTextlId != null},
            validate: thoughtValidator
        },
        createAt: {
            type: Date, 
            default: Date.now, 
            get: thoughtSchema
        },
        username: {
            type: String,
            required: function() {return this.usernameId != null}
        },
        reactions:[reactionSchema]
    }
);


const Thought = mongoose.model('Thought', thoughtSchema);

Thought.create({
    thoughtText: 'I love tiny houses',
    createAt: 'MAY 22, 2022',
    username: 'tinyhouse<3',
    reactions: [
        {
            reactionId: 1,
            reactionBody: 'Oh my gosh I love tinyhouses too!',
            username: 'tinyteam',
            createdAt: 'MAY 23 2022'
        }
    ].then (data => {
        console.log(data)
    }).catch (err => {
        console.log(err);
    })
})

const myReaction = new Thought ();
module.exports = Thought;
