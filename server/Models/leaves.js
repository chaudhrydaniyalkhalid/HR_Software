const mongoose = require("mongoose");

const leavesSchema = mongoose.Schema({
    leaveType:{
        type:String,
        required:true
    },
    description:{
        type:String,
        // required:true
    },
    allocations: {
        type: [{
          company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'companies'
        },        
          department: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'departments'
        },   
          designation: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'designations'
        },
        }],
      },
})

const Leaves = mongoose.model('Leaves',leavesSchema);
module.exports = Leaves