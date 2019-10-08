const userResolver = require("./user");
const eventsResolver = require("./events");
const bookingResolver = require("./booking");

const rootResolver = {
  ...userResolver,
  ...bookingResolver,
  ...eventsResolver
};

module.exports = rootResolver;
