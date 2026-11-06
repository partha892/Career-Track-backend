import  express from 'express'
import dotenv from "dotenv"
import { connectDB } from './src/config/db.js'
import router from './src/routers/authRoutes.js'
import cookieParser from 'cookie-parser'
import { applicationRouter } from './src/routers/applicationRoutes.js'
import cors from "cors"
dotenv.config()


const app = express()
const port = process.env.PORT|| 3000




app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(cookieParser());

// 2. Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// 3. Routes
app.use("/api/v1/user", router);
app.use("/api/v1/application", applicationRouter);


connectDB()

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})