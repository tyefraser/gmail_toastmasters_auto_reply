// Function to get the nth Wednesday of a given month and year
function getNthWednesday(year, month, nth) {
  // Logger.log("Arguments provided to getNthWednesday:");
  // Logger.log("year: " + year);
  // Logger.log("month: " + month);
  // Logger.log("nth: " + nth);

  let day = 1;
  let count = 0;

  //Keeps looping until date is found
  while (true) {
    let date = new Date(year, month-1, day);
    // Logger.log("date: " + date);
    if (date.getDay() === 3) { // Day of week, where 0 is Sunday and 3 is Wednesday
      count++;
      // Logger.log("count: " + count);
      if (count === nth) {
        return date;
      }
    }
    day++;
  }
}


// Function to get a list of current and next month session dates
function getUpcomingSessionDates(year, month) {
  let sessionsList = [];
  let nextYear = month === 12 ? year + 1 : year;
  let nextMonth = month === 12 ? 1 : month + 1;

  // Current month sessions
  if (month !== 1) sessionsList.push(getNthWednesday(year, month, 2)); // Skip 1st session in Jan
  if (month !== 12) sessionsList.push(getNthWednesday(year, month, 4)); // Skip 2nd session in Dec

  // Next month sessions
  if (nextMonth !== 1) sessionsList.push(getNthWednesday(year, nextMonth, 2)); // Skip 1st session in Jan
  if (nextMonth !== 12) sessionsList.push(getNthWednesday(year, nextMonth, 4)); // Skip 2nd session in Dec

  return sessionsList;
}


/**
 * Finds the next session date based on the input date.
 */
function getNextSessionDate(inputDate) {
  Logger.log("Executing: getNextSessionDate")
  
  Logger.log("inputDate:" + inputDate)
  let inputYear = inputDate.getFullYear();
  let inputMonth = inputDate.getMonth() + 1; // JavaScript months are 0-indexed
  let sessionsList = getUpcomingSessionDates(inputYear, inputMonth);

  for (let sessionDate of sessionsList) {
    Logger.log("sessionDate: " + sessionDate);
    if (sessionDate > inputDate) {
      Logger.log("sessionDate > inputDate. Therefore next session is on:" + sessionDate);
      return sessionDate;
    }
  }
}


// Function to format a Date object into a readable string with the month name and date
function formatDate(date) {
  // Array of month names
  var monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  var month = date.getMonth(); // Get the month as a number (0-11)
  var day = date.getDate(); // Get the day of the month

  if (day === 1 | day === 21 | day === 31) {
    dateSuffix = 'st'
  } else if (day === 2 | day === 22) {
    dateSuffix = 'nd'
  }  else if (day === 3 | day === 23) {
    dateSuffix = 'rd'
  } else {
    dateSuffix = 'th'
  }

  // Combine the month name and day to form a string
  var formattedDate = monthNames[month] + " " + day + dateSuffix;
  
  return formattedDate;
}
