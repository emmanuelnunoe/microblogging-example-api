let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let Post = require('../models/Posts.js');

//para la encriptacion del password
let bcrypt = require('bcryptjs');
let SALT_WORK_FACTOR = 10;

let UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  fullname: String,
  email: { type: String, required: true },
  creationdate: { type: Date, default: Date.now },
  role: { type: String, enum: ['admin', 'subscriber'], default: 'subscriber' },
  posts: [{ type: Schema.ObjectId, ref: 'Post', default: null }],
});

UserSchema.pre('save', function (next) {
  var user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', UserSchema);
