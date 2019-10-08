const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const user = async userID => {
  try {
    const user = await User.findById(userID);
    return {
      ...user._doc,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};
const transformEvent = event => {
  return {
    ...event._doc,
    creator: user.bind(this, event.creator),
    date: dateToString(event._doc.date)
  };
};

exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;

// exports.user = user;
// exports.singleEvent = singleEvent;
// exports.events = events;
