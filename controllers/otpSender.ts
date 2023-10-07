import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import { PrismaClient } from "../prisma/generated/client";

const OTP_LENGTH = 10;
const OTP_CONFIG = {
	upperCaseAlphabets: true,
	specialChars: false,
};

const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);

let mailTransporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "kirtankp1902@gmail.com",
		pass: "osbg sweg hjbx qmjz ",
	},
});

const prisma = new PrismaClient();

export default async function sendOTP({
	userId,
	email,
}: {
	userId: string;
	email: string;
}) {
	prisma.user.update({
		where: {
			id: userId,
		},
		data: {
			otp: Number(OTP),
			otpExpiry: new Date(new Date().getTime() + 600000),
			otpAttempts: {
				increment: 1,
			},
		},
	});

    const OTP_mailDetails = {
        from: "kirtankp1902@gmail.com",
        to: email,
        subject: "Test mail",
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

	return mailTransporter.sendMail(OTP_mailDetails, function (err, data) {
		if (err) {
			throw new Error("Error sending OTP");
		} else {
			return true;
		}
	});
}
