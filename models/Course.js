const mongoose = require('mongoose');
const {
  Schema: { ObjectId },
} = mongoose;

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  description: {
    type: String,
    maxlength: 1000,
    required: true,
  },
  weeks: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
    },
  },
  tuition: {
    type: Number,
    required: true,
    validate: {
      validator: Number.isInteger,
    },
  },
  minimumSkill: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  scholarhipsAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  bootcamp: {
    type: ObjectId,
    ref: 'Bootcamp',
    required: true,
  },
});

module.exports = mongoose.model('Course', CourseSchema);
