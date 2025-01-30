const express=require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const Order = require("./models/order");
const OrderItem=require("./models/orderItem");


const app = express();
app.use(express.json()); // כדי שהשרת יוכל לקרוא JSON
app.use(cors());
const router = express.Router();
mongoose.connect('mongodb+srv://4156136:voRLzP29EvOskEmC@bitachon-orders-api.xptlp.mongodb.net/',{
    // useNewUrlParser:true,
    // useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
 console.log('connected!');   
})
const ProductSchema = new mongoose.Schema({
    id:Number,
    name: String,
    category: String,
    quantity: Number,
    orderId:Number
  });

  const Product = mongoose.model('Product', ProductSchema);
  app.post('/api/orders',  (req, res) => {
    try {
        debugger;
      const { userName, userEmail, userAddress } = req.body;
  
      if (!userName || !userEmail || !userAddress) {
        return res.status(400).json({ error: "יש למלא את כל פרטי ההזמנה" });
      }
  
      // יצירת הזמנה ושמירתה במסד הנתונים
      const newOrder = new Order({ userName, userEmail, userAddress });
       newOrder.save();
  
      res.status(201).json({ orderId: newOrder._id });
    } catch (error) {
        console.log(req.body);
      res.status(500).json({ error: "שגיאה בשמירת ההזמנה"+error });
    }
  });
  app.post('/',(req,res)=>{
    res.status(200).json({
        message:'hello asdasdasd'
    });
});
app.get('/',(req,res)=>{
res.status(200).json({
    message:'hello '
});




  
  
});
app.post('/api/ordersItems/:orderId', (req, res) => {
    try {
      const { orderId } = req.params;
      const { products } = req.body; // רשימת מוצרים (מערך)
  
      if (!products || products.length === 0) {
        return res.status(400).json({ error: "יש לשלוח רשימת מוצרים" });
      }
  
      // הכנת המוצרים לשמירה
      const orderItems = products.map((product) => ({
        orderId,
        productId: product.id,
        productName: product.name,
        quantity: product.quantity,
        price: product.price,
      }));
  
      // שמירה במסד הנתונים
       OrderItem.insertMany(orderItems);
  
      res.status(200).json({ message: "המוצרים נוספו להזמנה בהצלחה" });
    } catch (error) {
      res.status(500).json({ error: "שגיאה בשמירת פרטי ההזמנה" });
    }
  });
// const orderRoutes = require("./orderRoutes"); 
// app.use("/api/orders", orderRoutes);
module.exports=app;


