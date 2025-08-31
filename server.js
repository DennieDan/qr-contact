const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));

app.post("/generate-qr", async (req, res) => {
  const { name, phone, email } = req.body;

  // 1. Format the vCard string
  const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
END:VCARD`;

  // 2. Generate QR code as a Data URL
  try {
    const qrCodeDataURL = await QRCode.toDataURL(vCard);
    res.json({ imageUrl: qrCodeDataURL });
  } catch (err) {
    res.status(500).send("Error generating QR code");
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
