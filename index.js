const { Clock } = require("./clockk");
const { GetInputFromUser } = require("./utils");
const { userInput, initialFunction } = require("./utils/constants");

const clock = new Clock();

initialFunction(clock.clockOptions);
