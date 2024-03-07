  function getRecipients() {
    // date and time - get current date and time
    var now = new Date(); 
    Logger.log("now: " + now);
    var epochTimeInSeconds = Math.floor(now.getTime() / 1000);
    Logger.log("epochTimeInSeconds: " + epochTimeInSeconds);
    var cutoffEpochTimeInSeconds = epochTimeInSeconds - 1*(60*60) // 1 hour(s) ago
    Logger.log("cutoffEpochTimeInSeconds: " + cutoffEpochTimeInSeconds);

  // Get emails from thread ##############################################
  // This gets the email recieved from those in the list "list_from_senders"
  // e.g. "clubleads@toastmasters.org" and "server@toastmastersclubs.org";
  // within the timelimit set by cutoffEpochTimeInSeconds (currently an hour, noting this syncs with the frequency the trigger is run)
  // and sends and email reply to the contact mentioned in the form
  var list_from_senders = ["clubleads@toastmasters.org", "server@toastmastersclubs.org", "noreply@toastmasters.org"];
  for (var m = 0; m < list_from_senders.length; m++) {
    var from_sender = list_from_senders[m];
    Logger.log('from_sender ' + from_sender);

    // Query to get all threads from server emails
    var query_threads = 'from:' + from_sender + ' after:' + cutoffEpochTimeInSeconds;
    Logger.log('query_threads: ' + query_threads)
    var email_threads = GmailApp.search(query_threads);

    
    // Get all messages within the thread
    var messages = [];
    for (var i = 0; i < email_threads.length; i++) {
      var threadMessages = GmailApp.getMessagesForThread(email_threads[i]);
      messages = messages.concat(threadMessages);
    }

    // Create a list of emails and recipent names
    var emailAddresses = [];
    var recipientNames = [];
    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      var receivedTime = message.getDate();
      Logger.log("Message " + (i + 1) + " received at " + receivedTime);
      var receivedTimeEpochTime = receivedTime.getTime()/1000;
      Logger.log("Message " + (i + 1) + " received at " + receivedTimeEpochTime);
      Logger.log("cutoffEpochTimeInSeconds: " + cutoffEpochTimeInSeconds)
      
      if(cutoffEpochTimeInSeconds <= receivedTimeEpochTime) {
        Logger.log("This message will be used");

        var messageBody = message.getPlainBody();

        // Based on where the email is from, this determines how this automation finds the contact email and name
        if(from_sender == "server@toastmastersclubs.org") {
          var email_marker = "Contact E-mail:";
          Logger.log('email_marker ' + email_marker);
          var name_marker = 'Contact Name:';
          Logger.log('name_marker ' + name_marker);

        } else if (from_sender == 'clubleads@toastmasters.org') {
          var email_marker = "Email address:";
          Logger.log('email_marker ' + email_marker);
          var name_marker = 'First name:';
          Logger.log('name_marker ' + name_marker);
        } else if (from_sender == "noreply@toastmasters.org") {
          var email_marker = "Email address:";
          Logger.log('email_marker ' + email_marker);
          var name_marker = 'First name:';
          Logger.log('name_marker ' + name_marker);
        }

        var emailIndex = messageBody.indexOf(email_marker) + email_marker.length; // skip the length of email_marker to get to the email on that line
        var emailIndex_nextLineIndex = messageBody.indexOf('\n', emailIndex); // find the index of the next line return after the email address
        var recipient = messageBody.substring(emailIndex, emailIndex_nextLineIndex).trim();
        Logger.log("recipient: " + recipient);
        emailAddresses.push(recipient)

        var nameIndex = messageBody.indexOf(name_marker) + name_marker.length; // skip the length of name_marker to get to the name on that line
        var nameIndex_nextLineIndex = messageBody.indexOf('\n', nameIndex); // find the index of the next line return after the email address
        var name = messageBody.substring(nameIndex, nameIndex_nextLineIndex).trim();
        Logger.log("name: " + name);        
        recipientNames.push(name);

      }
    }
  }
  return [emailAddresses, recipientNames]
}
