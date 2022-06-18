import { DateTime } from "luxon";

export const timeFunction = (from, to, event, setTimes, setTime, timezone, interval = 15) => {
  from = from.replace(/^0*/, "");
  to = to.replace(/^0*/, "");
  let [hourFrom, minutesFrom] = from.split(":");
  let [hourTo, minutesTo] = to.split(":");

  let fromDate = DateTime.now().setZone(event?.timezone || "utc");
  let toDate = DateTime.now().setZone(event?.timezone || "utc");
  fromDate = fromDate.set({
    hour: parseInt(hourFrom || 0),
    minute: parseInt(minutesFrom || 0),
    second: 0,
    millisecond: 0
  });
  toDate = toDate.set({
    hour: parseInt(hourTo || 0),
    minute: parseInt(minutesTo || 0),
    second: 0,
    millisecond: 0
  });

  let userFromDate = fromDate.setZone(timezone);
  let userToDate = toDate.setZone(timezone);

  let timeArray = [userFromDate.toFormat("t")];

  while (userFromDate < userToDate) {
    userFromDate = userFromDate.plus({ minute: interval });
    timeArray.push(userFromDate.toFormat("t"));
  }

  timeArray.pop();

  setTimes(timeArray);
  setTime("");
};
