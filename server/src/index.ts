import express from 'express';
import cors from 'cors';
require("dotenv").config();

import aiRouters from "./routes/aiRouters";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/response", aiRouters)

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})