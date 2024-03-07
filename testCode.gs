// This code will test all of the functions in the Code.gs script

// Corporate Toastmasters Automated Email Response System - Testing
// This script will test all of the functions in the Code.gs script
// Author: Tye Fraser
// Date: 2024-02-28


// Function to get the nth Wednesday of a given month and year
function testGetNthWednesday() {
  var datesList = [];
  for (var month = 1; month <= 12; month++) {
    secondWed = getNthWednesday(year = 2023, month = month,nt = 2)
    datesList.push(secondWed)
    fourthWed = getNthWednesday(year = 2023, month = month,nt = 4)
    datesList.push(fourthWed)
  }

  // Log all dates in the list
  for (var i =0; i < datesList.length; i ++) {
    Logger.log("Date " + i + ": " + datesList[i])
  }
  
}

function testGetUpcomingSessionDates() {
  Logger.log("Vla " + getUpcomingSessionDates(year=2024, month=1))
  
}

function testGetNextSessionDate() {
  nextSessionDate = getNextSessionDate(new Date())
}

function testGetNextSessionDateSpecificDate() {
  // NOTE: Months are zero indexed, thus 0 = Jan, 11 = Dec
  var specificDate = new Date(2024,0,28)
  nextSessionDate = getNextSessionDate(specificDate)
}

function testGetRecipients() {
  [emailAddresses, recipientNames] = getRecipients()

  if(emailAddresses.length > 0) {
    for (var i = 0; i < emailAddresses.length; i++) {
      Logger.log('Email:' + emailAddresses[i])
      Logger.log('Name:' + recipientNames[i])
    }
  } else {
    Logger.log('No new emails')
  }

}


function testFormatDate() {
  var myDate = new Date(); // Create a new Date object for the current date
  var formattedDate = formatDate(myDate); // Format the date

  Logger.log(formattedDate); // Log the formatted date string
}

function testGenerateEmailContent() {
  nextSessionDate = getNextSessionDate(new Date())
  Logger.log(nextSessionDate)
  formattedDate = formatDate(nextSessionDate)
  Logger.log(formattedDate)
  name = 'TestName'

  var message = generateEmailContent(name, formattedDate);
  Logger.log(message)
}

function testGenerateEmailContentSpecificDate() {
  // NOTE: Months are zero indexed, thus 0 = Jan, 11 = Dec
  var specificDate = new Date(2024,0,28); // January 28, 2024
  nextSessionDate = getNextSessionDate(specificDate)
  formattedDate = formatDate(nextSessionDate)
  Logger.log("formattedDate:" + formattedDate)
  name = 'TestName'

  var message = generateEmailContent(name, formattedDate);
  Logger.log(message)
}


function testEmail() {
  var subject = "TEST EMAIL";
  var name = 'TESTNAME'
  var emailAddress = // enter email

  // Get next session date
  nextSessionDate = getNextSessionDate(new Date())
  formattedDate = formatDate(nextSessionDate)

  var message = generateEmailContent(name, formattedDate);
  Logger.log("message: " + message);

    GmailApp.sendEmail(emailAddress, subject, "", {
        htmlBody: message
    });
}
