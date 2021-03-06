const express = require("express")
const app = express()
const db = require("./config/database")
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser'); 

app.use(cookieParser()); 
const homeRouter = require("./routes/homeRouter")
const userRouter = require("./routes/userRouter")
const postRouter = require("./routes/postRouter")

const authenticateToken = require("./middleware/authenticateToken")

require("dotenv").config();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Credentials', "true")
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();

    app.options('*', (req, res) => {
        res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
        res.send();
    });
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/", authenticateToken, homeRouter)
app.use("/user", userRouter)
app.use("/post", postRouter)

async function start(){
    app.listen(process.env.PORT)
}

start()