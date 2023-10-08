import nodemailer from "nodemailer";

let mailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "kirtankp1902@gmail.com",
		pass: "osbg sweg hjbx qmjz ",
	},
});

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

	const startDate = timeFrom.split("T")[0].split("-").join("") + "T" + timeFrom.split("T")[1].split(".")[0].split(":").join("") + "Z";
	const endDate = timeTo.split("T")[0].split("-").join("") + "T" + timeTo.split("T")[1].split(".")[0].split(":").join("") + "Z";

    console.log('startDate: ', startDate);
    console.log('endDate: ', endDate);

	// Create the dynamic URL with the calculated dates
	const googleCalendarURL =
		"https://calendar.google.com/calendar/r/eventedit?" +
		"text=" +
		encodeURIComponent(title) +
		"&dates=" +
		encodeURIComponent(startDate + "/" + endDate) +
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
