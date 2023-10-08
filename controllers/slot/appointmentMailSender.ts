import nodemailer from "nodemailer";

let mailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "kirtankp1902@gmail.com",
		pass: "osbg sweg hjbx qmjz ",
	},
});

// Format the dates in the required format (YYYYMMDDTHHMMSSZ)
var formatDate = function (date: Date) {
    var year = date.getFullYear();
    var month = String(date.getMonth() + 1).padStart(2, "0");
    var day = String(date.getDate()).padStart(2, "0");
    var hours = String(date.getHours()).padStart(2, "0");
    var minutes = String(date.getMinutes()).padStart(2, "0");
    var seconds = "00";
    return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
};

export default async function sendAppointmentMail({
	email,
	title,
	details,
	timeFrom,
	timeTo,
	appointmentId,
}: {
	email: string;
	title: string;
	details: string;
	timeFrom: string;
	timeTo: string;
	appointmentId: string;
}) {

	// Calculate the start date and time (for example, 2 days from now)
	var startDate = new Date(timeFrom);
	startDate.setDate(startDate.getDate() + 2); // Add 2 days
	startDate.setHours(10); // Set the hour (0-23)
	startDate.setMinutes(0); // Set the minutes

	// Calculate the end date and time (for example, 2.5 hours after the start time)
	var endDate = new Date(timeTo);
	endDate.setHours(startDate.getHours() + 2);
	endDate.setMinutes(startDate.getMinutes() + 30);

	// Create the dynamic URL with the calculated dates
	var googleCalendarURL =
		"https://calendar.google.com/calendar/r/eventedit?" +
		"text=" +
		encodeURIComponent(title) +
		"&dates=" +
		encodeURIComponent(formatDate(startDate) + "/" + formatDate(endDate)) +
		"&details=" +
		encodeURIComponent(details) +
		"&location=" +
		encodeURIComponent("") +
		"&sf=true" +
		"&output=xml";

	let Approval_mailDetails = {
		from: "kirtankp1902@gmail.com",
		to: email,
		subject: "Meet Approval",
		html: `
        <div class="container" style="max-width: 90%; margin: auto; padding-top: 20px">
        <h1>Hello User,</h1>
        <p style="margin-bottom: 30px;">This mail is sent you for getting approval of the meeting from your side.</p>
        <h2>${title}</h2>
        <p style="margin-bottom: 15px;">${details}</p>
        <div style="margin-bottom: 15px;">Date & Time : <span>meet is at ${new Date(
			timeFrom
		).toLocaleString()} till ${new Date(
			timeTo
		).toLocaleString()}</span></div>
        <div style="margin-bottom: 15px;">Add to Calender <span>${googleCalendarURL}</span></div>
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
            border-radius: 6px;" href="https://dominators.vercel.app/appointment/accept?id=${appointmentId}">
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
            border-radius: 6px;" href="https://dominators.vercel.app/appointment/cancel?id=${appointmentId}">
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
            border-radius: 6px;" href="https://dominators.vercel.app/appointment/rescedule?id=${appointmentId}">
                Rescedule
            </a>
        </div>
        </div>
    `,
	};

	mailTransporter.sendMail(Approval_mailDetails, function (err, data) {
		if (err) {
			console.log("Error Occurs " + err);
		} else {
			console.log("Email sent successfully");
		}
	});
}
