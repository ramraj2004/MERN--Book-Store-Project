import express, { response } from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors";


const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for handling CORS POLICY
//option 1: Allow all origins with default of cors(*)
app.use(cors());
//option2: allow custom origins
// app.use(cors(
//     {
//         origin: "http://localhost:5173",
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     }
// ));

app.get("/", (req, res) => {
    res.send("Home Page");
});

app.use("/books", booksRoute);


mongoose
    .connect(MONGO_URL)
    .then(()=> {
        
        console.log("DB connection done succcessfully");
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        });
    }) 
    .catch((err) =>{
        console.log(err);
    })