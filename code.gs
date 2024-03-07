// Corporate Toastmasters Automated Email Response System
// This script automates email responses to potential members with details about the next meeting.
// Author: Tye Fraser
// Date: 2023-03-19



/**
 * Generates and returns the HTML content for the email.
 * @param {string} name - Recipient's name.
 * @param {string} nextSessionMonth - Month of the next session.
 * @param {number} nextSessionDay - Day of the month for the next session.
 * @return {string} The HTML content for the email.
 */
function generateEmailContent(name, formattedDate) {
  const message = `
    <html>
      <body>
        <p>Hello ${name},</p>
        <p>Thank you for your interest in the Corporate Toastmasters Club, where professionals gather to enhance their public speaking and leadership skills in a supportive environment.</p>
        <p>We invite you to join our next meeting as a guest at no cost. This is a great opportunity for you to experience our club's atmosphere and decide if you'd like to become a member.</p>
        <p>Should you have any questions, please feel free to reach out. We're here to assist you.</p>
        <p>Meeting Details:</p>
        <ul>
          <li><strong>Name:</strong> The Corporate Toastmasters Club</li>
          <li><strong>When:</strong> 2nd and 4th Wednesday each month at 7:30 AM (for a 7:45 AM start), and go for 1 hour. Our upcoming session is on <strong>${formattedDate}</strong>.</li>
          <li><strong>Where:</strong> Level 12, Suite 5, 189 Kent Street, Sydney. <a href="https://goo.gl/maps/2e8Z5ixEmgSFpxVu9">View Map</a>. Online attendance is also available.</li>
          <li><strong>Join our WhatsApp group:</strong> Follow this <a href="https://chat.whatsapp.com/C1q778F49GkHqlJLn2e4vt">link</a> or provide us with your mobile number via email.</li>
        </ul>
        <p>We look forward to welcoming you.</p>
        <p>Best regards,<br>The Corporate Toastmasters Club</p>
      </body>
    </html>
  `;
  return message;
}

function automaticallyReplyToEmail() {

  // Get lists for recent emails recieved
  [emailAddresses, recipientNames] = getRecipients()

  if(emailAddresses.length > 0) {
    // New emails recieved, send replies to them

    // Get next session date
    nextSessionDate = getNextSessionDate(new Date())
    formattedDate = formatDate(nextSessionDate)

    for (var i = 0; i < emailAddresses.length; i++) {
      emailAddress = emailAddresses[i]
      name = recipientNames[i]
      Logger.log('Email:' + emailAddress)
      Logger.log('Name:' + name)
      
      // Reply to the email address obtained
      var subject = "Welcome to The Corporate Toastmasters Club";
      var message = generateEmailContent(name, formattedDate);
      Logger.log("message: " + message);

        GmailApp.sendEmail(emailAddress, subject, "", {
           htmlBody: message
        });
    }

  } else {
    Logger.log('No new emails to reply to')
  }
}
