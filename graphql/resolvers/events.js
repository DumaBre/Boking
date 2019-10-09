const Event = require("../../models/event");
const User = require("../../models/user");
const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => {
        return transformEvent(event);
      });
    } catch (err) {
      throw err;
    }
  },

  //Kreiranje Eventova (mutacija podataka u bazi)
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const user = await User.findById(req.userId);
      if (!user) {
        throw new Error("User not found.");
      }
      user.createdEvents.push(event);
      user.save();
      const result_1 = undefined;
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
