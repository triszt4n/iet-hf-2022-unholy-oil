const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost/EQN34F', { useNewUrlParser: true ,useUnifiedTopology: true});

mongoose.connect(
    'mongodb+srv://dbAdmin:a8iLIBk61WPK03GQ@developementcluster-zaeo2.gcp.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);


module.exports = mongoose;