/* eslint-disable no-undef */
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productFileMap = {
  "48437989081303": "/files/Datastation_10,000_MSME_Database.xlsx",
  "48433912643799": "/files/Datastation_20,000_MSME_Database.xlsx",
  "48433912938711": "/files/Datastation_30,000_MSME_Database.xlsx",
  "48433913462999": "/files/Datastation_40,000_MSME_Database.xlsx",
};

const app = express();
app.use(express.json());


app.post("/webhook/order-paid", async (req, res) => {
  try {
    const order = req.body;

    const lineItem = order.line_items?.[0];
    const verifiedEmail =
    lineItem?.properties?.find(
      (p) =>
        p.name === "OTP verified email" ||
        p.name === "otp_verified_email"
    )?.value;
    
    console.log("🔥 WEBHOOK HIT");
    console.log("📧 OTP EMAIL:", verifiedEmail);
    console.log("🔥 FULL ORDER:", JSON.stringify(order, null, 2));

    const email = verifiedEmail;
    if (!email) {
      console.log("❌ No email found, skipping...");
      return res.status(200).send("No email");
    }
    const variantId = lineItem?.variant_id?.toString();

    const filePath = productFileMap[variantId]
      ? path.join(__dirname, productFileMap[variantId])
      : null;

    if (!filePath) {
      console.log("❌ No file mapped for variant:", variantId);
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: verifiedEmail,
        subject: "Datastation MSME Database Purchase",
        text: filePath ? "Thanks for your purchase. Your file is attached." : "Thanks for your purchase.",
        attachments: filePath
        ? [
            {
                filename: filePath.split("/").pop(),
                path: filePath,
            },
        ]
        : [],

    });

    res.status(200).send("Email sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});