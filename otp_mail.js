const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');

const OTP_LENGTH = 10
const OTP_CONFIG = {
    upperCaseAlphabets: true,
    specialChars: false
}

const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kirtankp1902@gmail.com',
        pass: 'osbg sweg hjbx qmjz '
    }
});

let OTP_mailDetails = {
    from: 'kirtankp1902@gmail.com',
    to: 'vanshitaroopchandani7@gmail.com',
    subject: 'Test mail',
    html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Please enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${OTP}</h1>
      </div>
    `,
};

mailTransporter.sendMail(OTP_mailDetails, function (err, data) {
    if (err) {
        console.log('Error Occurs '+err);
    } else {
        console.log('Email sent successfully');
    }
});
