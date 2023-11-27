import { createReadStream } from "fs";
import { parse } from "csv";
import sendEmail from "./mailer.js";

const records = [];

const sendCertificate = async (url = "./certificate.pdf") => {
  createReadStream("./players.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      records.push(row);
      // console.log(row);
    })
    .on("end", async function () {
      console.log(url);
      await Promise.all(
        records.map(async (record) => {
          const option = {
            email: record[1],
            certificateURL: url,
            subject:
              "Congratulations! Your Event Certificate is Ready for Download 🎉",
            message: `<p> Dear ${record[0]} ,</p>
                <p>
                We are thrilled to inform you that your hard work and dedication have paid off! Congratulations on successfully participating. It is our pleasure to present you with your well-deserved certificate.
                </p>
                <p>
          To access your certificate, simply find the attached file to this email. We hope you take pride in your achievements and the knowledge gained during the event.
          </p>
          <p>
          Once again, congratulations on your accomplishment! We look forward to seeing you at future events and celebrating more milestones together.
          </p>

          Best regards,
          <br>
          Ashu Sharma
          <br>
          Organizer
          <br>
          Cloud Event
                `,
          };
          await sendEmail(option);
          console.log(`Mail Sent ${record[1]}`);
        })
      );
    })
    .on("error", function (error) {
      console.log("Invalid Record");
      console.log(error.message);
    });
};

export default sendCertificate;
