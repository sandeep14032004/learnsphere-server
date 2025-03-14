import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.Gmail || !process.env.Password) {
  throw new Error("Gmail and Password environment variables must be defined");
}

const sendMail = async (email, subject, data) => {
  const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.Gmail,
      pass: process.env.Password,
    },
  });
  const html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #4e54c8, #8f94fb);
            color: #333;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
        }

        .container {
            background: #fff;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
            text-align: center;
            max-width: 450px;
            width: 100%;
            animation: fadeIn 0.5s ease-in-out;
        }

        h1 {
            font-size: 32px;
            font-weight: bold;
            color: #4e54c8;
            margin-bottom: 20px;
        }

        p {
            font-size: 18px;
            color: #555;
            margin-bottom: 25px;
            line-height: 1.6;
        }

        .otp {
            font-size: 40px;
            font-weight: bold;
            color: #e63946;
            letter-spacing: 3px;
            margin: 20px 0;
        }

        .btn {
            display: inline-block;
            padding: 12px 25px;
            font-size: 18px;
            color: #fff;
            background: #4e54c8;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            text-decoration: none;
            transition: background 0.3s, transform 0.3s;
        }

        .btn:hover {
            background: #3d44a1;
            transform: scale(1.05);
        }

        .btn:active {
            transform: scale(0.95);
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 768px) {
            .container {
                padding: 30px;
            }

            h1 {
                font-size: 28px;
            }

            p {
                font-size: 16px;
            }

            .otp {
                font-size: 36px;
            }

            .btn {
                font-size: 16px;
                padding: 10px 20px;
            }
        }

        @media (max-width: 480px) {
            .container {
                padding: 20px;
            }

            h1 {
                font-size: 24px;
            }

            p {
                font-size: 14px;
            }

            .otp {
                font-size: 30px;
            }

            .btn {
                font-size: 14px;
                padding: 8px 15px;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>OTP Verification</h1>
        <p>Hello <strong>${data.name}</strong>, your One-Time Password for account verification is:</p>
        <p class="otp">${data.otp}</p>
    </div>
</body>

</html>

`;

  try {
    await transport.sendMail({
      from: process.env.Gmail,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendMail;
