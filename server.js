/* eslint-disable no-undef */
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productFileMap = {
  "48437989081303": "./files/Datastation_10,000_MSME_Database.xlsx",
  "48433912643799": "./files/Datastation_20,000_MSME_Database.xlsx",
  "48433912938711": "./files/Datastation_30,000_MSME_Database.xlsx",
  "48433913462999": "./files/Datastation_40,000_MSME_Database.xlsx",
  "48433914413271": "./files/Datastation_40,000_MSME_Database.xlsx",
  "48433915953367": "./files/Datastation_40,000_MSME_Database.xlsx",
};

const app = express();
app.use(express.json());

const processedOrders = new Set();

app.post("/webhook/order-paid", async (req, res) => {
  const order = req.body;
  const orderId = order.id;
  if (processedOrders.has(orderId)) {
    console.log("⚠️ Duplicate webhook ignored:", orderId);
    return res.status(200).send("Duplicate ignored");
  }
  processedOrders.add(orderId);
  res.status(200).send("OK");

  try {
    let verifiedEmail = null;
    let variantId = null;

    for (const item of order.line_items || []) {
      const emailProp = item.properties?.find(
        (p) =>
          p.name?.toLowerCase().replace(/\s+/g, "") ===
          "otpverifiedemail"
      );

      if (emailProp?.value) {
        verifiedEmail = emailProp.value;
        variantId = item.variant_id?.toString();
        break;
      }
    }

    if (!verifiedEmail) {
      console.log("❌ OTP email not found");
      return;
    }

    if (!productFileMap[variantId]) {
      console.log("❌ No file mapped for variant:", variantId);
      return;
    }
    const filePath = path.resolve(__dirname, productFileMap[variantId]);

     if (!fs.existsSync(filePath)) {
      console.log("❌ File not found:", filePath);
      return;
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE == "true",
      requireTLS: process.env.SMTP_PORT == 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 60000,
      greetingTimeout: 60000,
      socketTimeout: 60000,
      tls: {
        minVersion: "TLSv1.2",
      },
    });
    if (!fs.existsSync(filePath)) {
      console.log("❌ File not found:", filePath);
      return res.status(200).send("File missing");
    }
    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: verifiedEmail,
        subject: "Datastation MSME Database Purchase",
        text: "Thanks for your purchase. Your file is attached.",
        attachments: [
          {
              filename: path.basename(filePath),
              path: filePath,
          },
        ],
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});