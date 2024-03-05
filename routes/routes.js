const express = require("express")
const router = express.Router()
const User = require("../models/users")
const multer = require("multer")
const users = require("../models/users")

//image upload
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads")
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
  },
})

var upload = multer({
  storage: storage,
}).single("image")

//isnert an user into db
router.post("/add", upload, (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file.filename,
  })
  user.save().then(() => {
      req.session.message = {
        type: "success",
        message: "user added successfuly",
      }
      res.redirect("/")
    })
    .catch((err) => {
      res.json({ message: err.message, type: "danger" })
    })
})

//get all users route
//[TODO: Cannot read properties of undefined (reading 'forEach') 26INDEX ]
router.get('/', (req, res) => {
  User.find().then((err, users) => {
    res.render("index", {
      title: "home",
      users: users
    })
  }).catch((err) => {
    res.json({ message: err.message })
  })
})

//get all users route
// router.get("/", (req, res) =>{
//   User.find().exec((err, users) => {
//     if(err){
//       res.json({ message: err.message })
//     } else{
//       res.render("index", {
//         title: "home",
//         users: users,
//       })
//     }
//   })
// })

router.get("/add", (req, res) => {
  res.render("add_user", { title: "Add Users" })
})

module.exports = router
