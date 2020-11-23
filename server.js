/* 
Run npm install
so how to send an email for multible receipents using Gmail account with a delay of half a second.
first We use nodemailer .
*/
const nodemailer = require("nodemailer");
const log = console.log;
let transporter = nodemailer.createTransport({
  //  We need to define our nodemailer transporter to connect to our service.
  // Make sure you fill in with your credentials such as email and password.
  service: "gmail",
  auth: {
    user: "norbert.janicke@gmail.com", // TODO: your gmail account
    pass: "Abc-123456789" // TODO: your gmail password 
    // this is correct username and password for an account I created on gmail and you can use it to test 
  }
});

function formatMsg(name) {
  // this function is for passing name of the receipt and formating the text , subject , the sender,  and its considered as a helper method
  // which we will use in send function
  let mailOptions = {
    from: "test@gmail.com", // TODO: email sender
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
  // so i came up with this solution (recursion) and it works perfectly .
  function f() {
    // first invoking transporter.sendmail and passing for it the result of the formatMsg
    // and detecting the errors
    // we repeat the step above for the list lenght-1 so that we loop for every element in the receipents list 
    transporter.sendMail(formatMsg(list[i]), (err, data) => {
      if (err) {
        log("Error occurs");
      }
    else{  log("Email sent!!!");}
    });

    i++;
    if (i < howManyTimes) {
      setTimeout(f, 500); //  the delay is 500 millisecond (half a second)
    }
  }
  f();
}
// test for this list of mails 
// here you can change it to what ever emails you like to test the program 
list = ["t@gmail.com",'tttt@gmail.com','teest@gmail.com'];
send(list);
