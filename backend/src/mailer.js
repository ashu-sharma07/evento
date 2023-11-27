import nodemailer from "nodemailer";
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: options.email,
    subject: options.subject,
    html: options.message,
    attachments: [
      {
        filename: "certificate.pdf",
        path: options.certificateURL,
      },
    ],
  };

  //   console.log(mailOptions);

  await transporter.sendMail(mailOptions);
};
export default sendEmail;
