
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// User Schema
const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false },
  create_dt: Date,
  modified_dt: Date,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

UserSchema.pre('save', function save(next) {
  const self = this;
  const currentDate = new Date();

  // change the modified_dt field to current date
  self.modified_dt = currentDate;

  // if create_dt doesn't exist, add to that field
  if (!self.create_dt) {
    self.create_dt = currentDate;
  }

  // encrypt password
  if (this.isModified('password') || this.isNew) {
    return bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      return bcrypt.hash(self.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        self.password = hash;
        return next();
      });
    });
  }

  return next();
});

UserSchema.methods.comparePassword = function comparePassword(email, passw, cb) {
  return User.findOne({ email }).select('password').exec((error, user) => {
    if (error) cb(error);
    return bcrypt.compare(passw, user.password, (err, isMatch) => {
      if (err) {
        return cb(err);
      }
      return cb(null, isMatch);
    });
  });
};

// User Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
