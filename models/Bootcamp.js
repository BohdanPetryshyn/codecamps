const mongoose = require('mongoose');
const GeoPoint = require('./GeoPoint');
const slugify = require('slugify');
const geocode = require('../utils/geocoder');

const BootcampSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 50,
  },
  slug: String,
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  url: {
    type: String,
    match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/,
  },
  phone: {
    type: String,
    maxlength: 20,
  },
  email: {
    type: String,
    match: /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(\".+\"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i,
  },
  address: {
    type: String,
    required: true,
  },
  location: {
    type: {
      point: {
        type: GeoPoint,
        required: true,
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    required: false,
  },
  careers: {
    type: [String],
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other',
    ],
    required: true,
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 10,
  },
  averageCost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

BootcampSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

BootcampSchema.pre('save', async function(next) {
  const geocodeResponse = await geocode.geocode(this.address);
  const geocodeLocation = geocodeResponse[0];

  this.location = {
    point: {
      type: 'Point',
      coordinates: [geocodeLocation.longitude, geocodeLocation.latitude],
    },
    formattedAddress: geocodeLocation.formattedAddress,
    street: geocodeLocation.street,
    city: geocodeLocation.city,
    zipcode: geocodeLocation.zipcode,
    country: geocodeLocation.countryCode,
  };

  next();
});

BootcampSchema.pre('remove', async function(next) {
  await this.model('Course').deleteMany({bootcamp: this._id});
  next();
})

BootcampSchema.virtual('courses', {
  ref: 'Course',
  localField: '_id',
  foreignField: 'bootcamp',
  justOne: false,
})

module.exports = mongoose.model('Bootcamp', BootcampSchema);
