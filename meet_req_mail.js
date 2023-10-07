const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kirtankp1902@gmail.com',
    pass: 'osbg sweg hjbx qmjz '
  }
});

let Approval_mailDetails = {
  from: 'kirtankp1902@gmail.com',
  to: 'vanshitaroopchandani7@gmail.com',
  subject: 'meet Approval',
  html: `
  <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
  <h1>Hello User,</h1>
  <p style="margin-bottom: 30px;">This mail is sent you for getting approval of the meeting from your side.</p>
  <h2>Heading of the meet from backend</h2>
  <p style="margin-bottom: 15px;">If details are there than it will come from backend </p>
  <div style="margin-bottom: 15px;">Date & Time : <span>meet date and time from backend</span></div>
  <div style="margin-bottom: 15px;">Add to Calender <span>calenders link from backend</span></div>
  <div style="margin-bottom: 15px;">Join meeting : <span>link comes from backend</span></div>

  <div style="font-size: 40px; letter-spacing: 2px; ">
      <a style="font: bold 28px Arial;
    text-decoration: none;
    background-color: rgba(20, 29, 192, 0.832);
    color: #ffffff;
    margin: 10px;
    padding: 2px 6px 2px 6px;
    border-top: 1px solid #CCCCCC;
    border-right: 1px solid #333333;
    border-bottom: 1px solid #333333;
    border-left: 1px solid #CCCCCC;
    border-radius: 6px;" href="https://www.w3schools.com">
          Accept
      </a>
      <a style="font: bold 28px Arial;
    text-decoration: none;
    background-color: rgba(20, 29, 192, 0.832);
    color: #ffffff;
    margin: 10px;
    padding: 2px 6px 2px 6px;
    border-top: 1px solid #CCCCCC;
    border-right: 1px solid #333333;
    border-bottom: 1px solid #333333;
    border-left: 1px solid #CCCCCC;
    border-radius: 6px;" href="https://www.google.com">
          Cancel
      </a>
      <a style="font: bold 28px Arial;
    text-decoration: none;
    background-color: rgba(20, 29, 192, 0.832);
    color: #ffffff;
    margin: 10px;
    padding: 2px 6px 2px 6px;
    border-top: 1px solid #CCCCCC;
    border-right: 1px solid #333333;
    border-bottom: 1px solid #333333;
    border-left: 1px solid #CCCCCC;
    border-radius: 6px;" href="https://www.youtube.com">
          Rescedule
      </a>
  </div>
</div>
    `,
};

mailTransporter.sendMail(Approval_mailDetails, function (err, data) {
  if (err) {
    console.log('Error Occurs ' + err);
  } else {
    console.log('Email sent successfully');
  }
});
