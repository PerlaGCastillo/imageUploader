// imports
require("dotenv").config()  
const express = require("express")  
const mongoose = require("mongoose")  
const session = require("express-session")  

const app = express()  
const PORT = process.env.PORT || 4000  

//database connection
const db = async(name, email, phone, image, created) =>{
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true , useUnifiedTopology: true})
        console.log("Connected to the db")
    } catch (error) {
        console.log('error', error)
    }
}
// mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
// const db = mongoose.connection
// db.on("error", (error) => console.log(error))  
// db.once("open", () => console.log("Connected to the db"))  


//middlewares
app.use(express.urlencoded({ extended: false }))  
app.use(express.json())  

app.use(
  session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false,
  })
)  

app.use((req, res, next) => {
  res.locals.message = req.session.message  
  delete req.session.message  
  next()  
})  

//set template engine
app.set("view engine", "ejs")  

//route prefix
app.use("", require("./routes/routes"))  

// app.get("/", (req, res) => {
//   res.send("hello world")
// })

app.listen(PORT, () => {
  console.log(`server starded at http:localhost//:${PORT}`)  
})  