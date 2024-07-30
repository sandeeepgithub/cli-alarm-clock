const { Alarm } = require("./alarm");
const { getValueFromUser, hasDayPassed, isValidTime } = require("./utils");

class Clock {
  constructor() {
    this.count = 0;
    this.alarms = {};
  }

  clockOptions = {
    1: {
      ques: "Create new alarm",
      call: () => this.createAlarm(),
    },
    2: {
      ques: "List alarms",
      call: () => this.listAlarm(),
    },
    3: {
      ques: "Remove Alarm",
      call: () => this.removeAlarm(),
    },
  };

  async createAlarm() {
    let day, time;

    while (true) {
      day = await getValueFromUser("\n Kindly enter day. Monday, Tuesday...");

      day = hasDayPassed(day);

      if (!day) {
        console.log(
          "Either the day has already passed or an invalid day value was provided."
        );
        continue;
      }

      break;
    }

    while (true) {
      time = await getValueFromUser(
        "Kindly enter time value in HH:mm:ss format"
      );

      if (!isValidTime(time, day)) {
        console.log(
          "Time value is invalid or not in the future. Kindly enter a valid time."
        );
        continue;
      }

      break;
    }

    this.count++;
    const newAlarm = new Alarm(day, time, this.count);

    this.alarms[`${this.count}`] = newAlarm;
  }

  listAlarm() {
    if (!Object.keys(this.alarms).length) {
      return console.log("No alarms ");
    }

    Object.keys(this.alarms).forEach((id) => {
      this.alarms[id].listAlarm();
    });
  }

  async removeAlarm() {
    if (Object.keys(this.alarms).length === 0) {
      return console.log("No alarms to remove");
    }
    let id = "";

    while (true) {
      this.listAlarm();

      id = await getValueFromUser("Kindly enter id of alarm");

      if (!Object.keys(this.alarms).includes(id)) {
        console.log("Kindly enter valid id");
        continue;
      }

      break;
    }

    this.alarms[id].deleteAlarm();
    delete this.alarms[id];
  }
}

module.exports = {
  Clock,
};
