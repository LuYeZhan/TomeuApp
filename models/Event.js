'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  attendees: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  duration: {
    type: Number,
    min: 0,
    required: true
  },
  image: {
    type: String,
    default: '../images/default-img-event.jpg'
  },
  menu: {
    type: String
  },
  creator: String
}, {
  timestamps: true
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
