const readline = require("readline");

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const hasDayPassed = (day) => {
  const normalizedDay =
    day.charAt(0).toUpperCase() + day.slice(1).toLowerCase();

  if (!daysOfWeek.includes(normalizedDay)) {
    return false;
  }

  const today = new Date();
  const todayIndex = today.getDay();
  const inputDayIndex = daysOfWeek.indexOf(normalizedDay) + 1;

  const targetDate = new Date(today);
  targetDate.setHours(24, 0, 0, 0);
  targetDate.setDate(today.getDate() + ((inputDayIndex - todayIndex + 7) % 7));

  if (today < targetDate) {
    return normalizedDay;
  }

  return false;
};

let rl = null;

const getValueFromUser = (ques) => {
  rl?.close();
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolve) => {
    rl.question(`${ques} \n`, (ans) => {
      rl.close();
      rl = null;
      resolve(ans);
    });
  });
};

const isValidTime = (timeString, day) => {
  const regex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;

  if (!regex.test(timeString)) {
    return false;
  }

  const [hours, minutes, seconds] = timeString.split(":").map(Number);

  if (
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59 ||
    seconds < 0 ||
    seconds > 59
  ) {
    return false;
  }

  const now = new Date();
  const todayDay = daysOfWeek[now.getDay()];

  if (day === todayDay) {
    const now = new Date();
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentSeconds = now.getSeconds();

    if (
      hours < currentHours ||
      (hours === currentHours && minutes < currentMinutes) ||
      (hours === currentHours &&
        minutes === currentMinutes &&
        seconds <= currentSeconds)
    ) {
      return false;
    }
  }

  return true;
};

class GetInputFromUser {
  constructor(options) {
    this.options = options;
  }

  async init() {
    let keys = Object.keys(this.options);

    let questions = keys
      .map((key) => `${key}: ${this.options[key].ques}`)
      .join("\n");

    console.log(new Date());

    try {
      const ans = await getValueFromUser(questions);

      if (!keys.includes(ans)) {
        console.log("Invalid. Kindly try again.");
        return this.init();
      }

      await this.options[ans].call();

      this.init();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = {
  GetInputFromUser,
  getValueFromUser,
  hasDayPassed,
  isValidTime,
  daysOfWeek,
};
