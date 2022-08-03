const express = require("express");
const path = require("path")

const app = express();

app.use(express.static(path.join(__dirname,"static")));
app.use(express.urlencoded());
app.use(express.json());
const sequelize = require("./config/connect");
sequelize.authenticate().then(()=>{
    console.log("Connected")
});

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"views","index.html"))
});

app.get("/details/:id", (req,res)=>{
    res.sendFile(path.join(__dirname,"views","details.html"))
});

app.get("/edittype/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","edittype.html"))
});

app.get("/addtype",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","addtype.html"))
});

app.get("/edithero/:id",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","edittype.html"))
});

app.get("/addhero",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","addhero.html"))
});

app.use("/api", require("./routes"))

app.listen(5000,()=>{
    console.log("Listening")
})