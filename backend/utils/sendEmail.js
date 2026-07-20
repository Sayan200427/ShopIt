const nodeMailer = require("nodemailer");

const sendEmail = async (to , subject , message) => {
    try {
        const emailUser = process.env.EMAIL_USER ;
        const emailPass = process.env.EMAIL_PASS ;

        if (!emailUser || !emailPass) {
            throw new Error("Missing email credentials. Set EMAIL_USER and EMAIL_PASS in .env.");
        }

        const transporter = nodeMailer.createTransport({
            service : "Gmail",
            auth : {
                user : emailUser,
                pass : emailPass
            }
        });

        const mailOptions = {
            from : emailUser,
            to,
            subject,
            text : message
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error(`Email could not be sent: ${error.message}`);
    }
};

module.exports = sendEmail;
