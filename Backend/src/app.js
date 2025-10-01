let express = require("express");
let db=require("../db.js");
const cors = require("cors");
let bodyParser=require("body-parser");
let router =require("./routes/route.js");
require("dotenv").config();

let app = express();
app.use(
  cors({
    origin: process.env.Frontend_url,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use('/uploads', express.static('uploads'));

let cookieParser = require("cookie-parser");
app.use(cookieParser());


app.set("view engine" , "ejs");
app.use(express.static("public")); //in-built middleware type
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.urlencoded({extended:true}))   //third party middleware
app.use(express.json());
app.use("/",router);


module.exports=app ;