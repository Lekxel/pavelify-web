import { days } from "utilities/misc";

export const CalenderJs = (date, setDate, event, calendarClicked) => {
  let CurrentDate = date || new Date();
  let CurrentMonth = CurrentDate.getMonth();
  let CurrentYear = CurrentDate.getFullYear();
  let TotalDays = 31;

  let CalenderDays = document.querySelectorAll(".calender-days div");
  const CalenderDateTime = document.querySelector(".Calender-DateTime");
  const CalenderDaysWrapper = document.querySelector(".calender-days");
  const CalenderNavigateButtons = {
    BackIcon: document.querySelector("#calender-back-icon-wrapper"),
    FrontIcon: document.querySelector("#calender-towards-icon-wrapper")
  };

  const isAvailable = (day) => event?.availableDays?.includes(days[day]);

  const CovertIntoMonthString = (CurrentNumericMonth) => {
    let Months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    return Months[CurrentNumericMonth];
  };

  const DisplayDate = () => {
    CalenderDateTime.textContent = `${CovertIntoMonthString(CurrentMonth)} , ${CurrentYear}`;
  };

  const ActivateThisDay = (e) => {
    if (e.target.id) {
      const Element = document.querySelector(`#${e.target.id}`);
      if (Element.classList.contains("disabled")) {
        return;
      }
      document.querySelectorAll(".calender-days  > *").forEach((EachDay) => {
        EachDay.classList.remove("active-day");
      });
      let day = Element.childNodes[1].innerText;
      setDate(new Date(`${CurrentMonth + 1} ${day} ${CurrentYear}`));
      Element.classList.toggle("active-day");
      calendarClicked();
    }
  };

  // Helping function to get total daus
  const GetTotalDays = (Month) => {
    if (Month === 3 || Month === 5 || Month === 8 || Month === 10) {
      Month = 30;
    } else if (Month === 1) {
      Month = 28;
    } else {
      Month = 31;
    }
    return Month;
  };

  // Helping function
  const StartDateWithRespectToDay = (year, month) => {
    let LocalDate = new Date(year, month, 1);
    let LocalDay = LocalDate.getDay();
    return LocalDay;
  };

  const DisplayDays = () => {
    // Remove Event Listeners from Old Divs
    CalenderDays.forEach((CalenderDay) => {
      CalenderDay.removeEventListener("click", ActivateThisDay);
    });

    CalenderDaysWrapper.innerHTML = "";

    //   Calculate total Days
    TotalDays = GetTotalDays(CurrentMonth);

    //   frist date Start in which day Monday Tuesday etc
    let FirstElementInCalender = StartDateWithRespectToDay(CurrentYear, CurrentMonth);

    let addedDots = 0;
    //   first Loop to add . dots
    for (let CurrentDay = 0; CurrentDay < TotalDays; CurrentDay++) {
      if (FirstElementInCalender - 1 > CurrentDay) {
        addedDots++;
        CalenderDaysWrapper.innerHTML += ` <div>
                <span>.</span>
              </div>`;
      }
    }

    //   Second loop to display date
    for (let CurrentDay = 0; CurrentDay < TotalDays; CurrentDay++) {
      let d = new Date(CurrentDate);
      d.setDate(CurrentDay + 2);
      d.setMonth(CurrentMonth);
      d.setFullYear(CurrentYear);

      CalenderDaysWrapper.innerHTML +=
        d.getTime() < new Date().getTime() ||
        (event?.availableDays && !isAvailable((d.getDate() + addedDots - 1) % 7))
          ? ` <div class='disabled' id="calender-day-${CurrentDay + 1}">
            <span>${CurrentDay + 1}</span>
          </div>`
          : ` <div id="calender-day-${CurrentDay + 1}">
            <span>${CurrentDay + 1}</span>
          </div>`;
    }

    // Select current day
    if (CurrentDate.getMonth() === CurrentMonth && date) {
      document.querySelector(`#calender-day-${CurrentDate.getDate()}`).classList.add("active-day");
      setDate(new Date(`${CurrentMonth + 1} ${CurrentDate.getDate()} ${CurrentYear}`));
    }

    //   Add Event Listeners In New Divs
    CalenderDays = document.querySelectorAll(".calender-days div");

    CalenderDays.forEach((CalenderDay) => {
      CalenderDay.addEventListener("click", ActivateThisDay);
    });
  };

  // Event Function
  const NavigateBack = (e) => {
    if (CurrentMonth === 0) {
      CurrentMonth = 11;
    } else {
      CurrentMonth--;
    }
    CalenderDateTime.textContent = `${CovertIntoMonthString(CurrentMonth)} , ${CurrentYear}`;
    DisplayDays();
  };

  const NavigateFront = (e) => {
    if (CurrentMonth === 11) {
      CurrentMonth = 0;
    } else {
      CurrentMonth++;
    }
    CalenderDateTime.textContent = `${CovertIntoMonthString(CurrentMonth)} , ${CurrentYear}`;
    DisplayDays();
  };

  // display date
  DisplayDate();
  // display days
  DisplayDays();

  // add Event Listeners for back and front arrows in calender
  CalenderNavigateButtons.BackIcon.addEventListener("click", NavigateBack);
  CalenderNavigateButtons.FrontIcon.addEventListener("click", NavigateFront);
};
