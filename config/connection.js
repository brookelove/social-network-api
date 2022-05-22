const { connect, connection} = require ('mongoose');

connect ('mongod://localhost/postsTags', {
    userNewUrlParser:true,
    useUnifiedTopology: true,
});

module.exports = connection;
