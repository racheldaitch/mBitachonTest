const http=require('http');
const app=require('./app');
const port=8000;
const server=http.createServer(app);



// const orderRoutes = require("./orderRoutes"); 


server.listen(port);



// const app = express();

// app.use(express.json()); // חובה כדי לפרסר JSON מבקשות POST
// app.use(cors()); // אם צריך CORS

// app.use("/api/orders", orderRoutes); // חיבור הנתיב

// const PORT = 8000;
// app.listen(PORT, () => {
//   console.log(`🚀 השרת פועל על פורט ${PORT}`);
// });
