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
            required: function() {return this.emailId != null},
            unique: true,
            // validation for an email starts 
            required: 'Email address is required',
                // validating email
            validate: [validateEmail, 'Please make a valid email'],
            // starts with word can have \ . or - and maybe another word then an @ word with \ . or - and maybe another worj \ . word that are tor three characters long and that is where it ends
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill use an email that is valid']

        },
        thoughts:[
            {
            type: Schema.Types.ObjectId,
            ref: 'thoughts',
            }
        ],
        friends:[
            {
            type: Schema.Types.ObjectId,
            ref: 'user',
            }
        ]
    }
);

// creating the virtual for the freindcount
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

//  initializing user model
const User = model('user', userSchema);
module.exports = User;
