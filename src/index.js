const express = require("express");
const userRouter = require("./routs/userRouts");
const noteRouter = require("./routs/noteRouts");
const bodyParser = require("body-parser");
const path = require('path');
const dotenv = require("dotenv");
dotenv.config({path: path.resolve(__dirname,'./.env')});
const cors = require('cors')





const app = express();
console.log(process.env.MONGO_URL);

const mongoose = require("mongoose")


app.use(express.json());
app.use(cors());

app.use(express.urlencoded({
    extended:true
}));
app.use("/notes",noteRouter);
app.use("/users",userRouter);

app.get("/", (req,res)=>{
    res.send("Notes Api from pCode");
})
app.get("/Menu", (req,res)=>{
    res.send("Great indian desers");
})
const PORT = process.env.PORT || 8000;
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    app.listen(PORT, ()=>{
        console.log("Server is listining at port:" + PORT);
    });

}).catch((error)=>{
    console.log(error);
});

