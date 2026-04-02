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
    const customerEmail =
      order.email || order.contact_email || order.customer?.email || order.billing_address?.email;

    if (!customerEmail) {
      console.log("❌ No customer email on order");
      return;
    }

    const attachments = [];
    const seenPaths = new Set();

    for (const item of order.line_items || []) {
      const vid = item.variant_id?.toString();
      if (!vid || !productFileMap[vid]) continue;
      const filePath = path.resolve(__dirname, productFileMap[vid]);
      if (!fs.existsSync(filePath)) {
        console.log("❌ File not found for variant", vid, filePath);
        continue;
      }
      if (seenPaths.has(filePath)) continue;
      seenPaths.add(filePath);
      attachments.push({
        filename: path.basename(filePath),
        path: filePath,
      });
    }

    if (attachments.length === 0) {
      console.log("❌ No downloadable files mapped for this order’s variants");
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

    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: customerEmail,
      subject: "Your Datastation purchase — download attached",
      text: "Thanks for your purchase. Your Excel file(s) are attached.",
      attachments,
    });
  } catch (err) {
    console.error(err);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
