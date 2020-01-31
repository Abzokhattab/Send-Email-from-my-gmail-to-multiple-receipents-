/*
First you need to initialize packet.Json by typing 'npm init -y' in the terminal tap supposing 
that you are using visual studio code . 
next step install nodemailer packet and set it as a dependancy so type 'nodemailer -S'
now we can excecute the following code
so how to send an email for multible receipents using Gmail account with a delay of half a second.
first We user nodemailer and We need to define our nodemailer transporter to connect to our service.
*/
const nodemailer = require("nodemailer");
const log = console.log;
let transporter = nodemailer.createTransport({
  //  We need to define our nodemailer transporter to connect to our service.
  // Make sure you fill in with your credentials such as email and password.
  service: "gmail",
  auth: {
    user: "norbert.janicke@gmail.com", // TODO: your gmail account
    pass: "25498060mostafa" // TODO: your gmail password
  }
});

function formatMsg(name) {
  // this function is for passing name of the receipt and formating the text , subject , the sender,  and its considered as a helper method
  // which we will use in send function
  let mailOptions = {
    from: "norbert.janicke@gmail.com", // TODO: email sender
    to: name, // TODO: email receiver
    subject: "Nodemailer - Test",
    text: "Wooohooo it works!!"
  };
  return mailOptions;
}

function send(list) {
  // this function is responsible for the sending process and detecting error while sending
  var i = 0,
    howManyTimes = list.length;
  // declare function f which performs as for loop but couldnt use for loop with setTimeout function
  // so i came up with this solution and it works perfectly .
  function f() {
    // first invoking transporter.sendmail and passing for it the result of the formatMsg
    // and detecting the errors
    transporter.sendMail(formatMsg(list[i]), (err, data) => {
      if (err) {
        log("Error occurs");
      }
      log("Email sent!!!");
    });

    i++;
    if (i < howManyTimes) {
      setTimeout(f, 500); //  the delay is 500 millisecond (half a second)
    }
  }
  f();
}
// test for these two mails
list = ["abzokhattab100@gmail.com", "abzokhattab@gmail.com"];
send(list);
