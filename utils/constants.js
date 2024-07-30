const { GetInputFromUser } = require(".");

const userInput = [];

const initialFunction = (options) => {
  userInput.push(new GetInputFromUser(options));

  userInput[0].init();
};

module.exports = {
  userInput,
  initialFunction,
};
