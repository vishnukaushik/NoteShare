const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        required: false
    }
})

userSchema.pre('save', function(next){
    const user = this
    if (!user.isModified('password')) {
        return next();
      }

    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){
            return next(err)
        }
        user.password=hash
        return next()
    })
})

module.exports = mongoose.model('user', userSchema)