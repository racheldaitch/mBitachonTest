const express = require("express");
const router = express.Router();
const Order = require("./models/order"); // ודאי שהמודל מחובר נכון

// יצירת הזמנה חדשה
router.post("/", async (req, res) => {
  try {
    const { userName, userEmail, userAddress } = req.body;

    if (!userName || !userEmail || !userAddress) {
      return res.status(400).json({ error: "יש למלא את כל הפרטים" });
    }

    const newOrder = new Order({ userName, userEmail, userAddress });
    await newOrder.save();

    res.status(201).json({ orderId: newOrder._id });
  } catch (error) {
    res.status(500).json({ error: "שגיאה בשמירת ההזמנה" });
  }
});

module.exports = router;
