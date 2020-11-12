const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoSchema = new Schema({
uniqueId:{type:Number },
name: {
    type: String,
    required: true
},
industry:{ type: String },
subindustry:{type: String },
address:{ type: String },
street:{ type: String },
house_nr:{ type: Number },
postalcode:{ type: Number },
city:{  type: String  },
state:{  type: String },
country:{  type: String  },
phone:{ type: String  },
skype:{   type: String  },
url:{  type: String },

logo:{type: String},
    email: {  type: String  },
})

module.exports = mongoose.model('csvdata', infoSchema);