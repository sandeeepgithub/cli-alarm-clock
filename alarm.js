const {
  daysOfWeek,
  GetInputFromUser,
  getValueFromUser,
  allUserInputs,
  updateAllUserInputs,
  rl,
} = require("./utils");
const { userInput } = require("./utils/constants");

class Alarm {
  constructor(day, time, id) {
    this.day = day;
    this.time = time;
    this.snoozed = 0;
    this.id = id;

    const [hours, minutes, seconds] = time.split(":").map(Number);

    const now = new Date();
    const nowDay = now.getDay();
    const targetDayIndex = daysOfWeek.indexOf(day);

    const daysUntilTarget = (targetDayIndex - nowDay + 7) % 7;

    const targetDate = new Date(now);

    targetDate.setDate(now.getDate() + daysUntilTarget);

    targetDate.setHours(hours, minutes, seconds, 0);

    const diff = targetDate - now;
    const secs = Math.max(Math.floor(diff), 0);

    this.timer = setTimeout(() => {
      this.triggerAlarm();
    }, secs);

    this.targetDate = `${targetDate.toLocaleDateString()} at ${targetDate.toLocaleTimeString()}`;

    this.message = `Alarm will ring on ${targetDate.toLocaleDateString()} at ${targetDate.toLocaleTimeString()}`;
  }

  async triggerAlarm(val) {
    if (!val) {
      console.log(`Alarm ringing! ${this.targetDate}`);
    } else {
      console.log("Snoozed alarm ringing");
    }

    let snooze;

    while (true) {
      try {
        snooze = await getValueFromUser(
          "Do you want to snooze the alarm? Enter 1 to snooze"
        );

        if (snooze !== "1") {
          console.log("Value entered is incorrect.");
          continue;
        }

        break;
      } catch (err) {
        console.log(err);
      }
    }

    if (snooze === "1") {
      return this.snoozeAlarm();
    }
  }

  snoozeAlarm() {
    if (this.snoozeCount >= 3) {
      console.log("Snoooze available for 3 times only");
      return;
    }

    let interval = 1;

    this.timer = setTimeout(
      (() => {
        this.triggerAlarm(interval);
      }).bind(this),
      interval * 60 * 10
    );

    this.snoozeCount += 1;

    console.log(`Alarm snoozed, will ring again in ${interval} mins`);

    userInput[0].init();
  }

  listAlarm() {
    console.log(
      `ID:-${this.id}  => The alarm is scheduled to ring for ${this.targetDate}`
    );
  }

  deleteAlarm() {
    clearTimeout(this.timer);

    userInput[0].init();
  }
}

module.exports = { Alarm };
