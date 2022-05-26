const { connect, connection} = require ('mongoose');

connect ('mongodb://localhost/social-network', {
   // userNewUrlParser:true,
    useUnifiedTopology: true,
});

module.exports = connection;
