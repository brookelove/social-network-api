const { Schema, model } = require('mongoose');

const userSchema = new Schema (

    {
        username: {
            type: String,
            unique: true,
            // username is required if id is specified
            required: function() {return this.userId != null},
            trim: true
        },
        email: {
            type: String,
            // username is required if id is specified
            required: function() {return this.userId != null},
            unique: true,
            // starts with word can have \ . or - and maybe another word then an @ word with \ . or - and maybe another worj \ . word that are tor three characters long and that is where it ends
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

        },
        thoughts:[
            {
            type: Schema.Types.ObjectId,
            ref: 'thought',
            }
        ],
        friends:[
            {
            type: Schema.Types.ObjectId,
            ref: 'user',
            }
        ]
    },
   {
        // include virtuals to include virutal properies
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

// creating the virtual for the freindcount
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//  initializing user model
const User = model('user', userSchema);
module.exports = User;
