var express = require('express');
var router = express.Router();
const userModel = require("./users");

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* CREATE OR REGISTER USER */
router.post('/register', function (req, res, next) {
  userModel.create({
    username: req.body.username,
    name: req.body.name,
    age: req.body.age,
    image: req.body.image,
    contact: req.body.contact,
    email: req.body.email,
    /*profillikes : req.body.profillikes,*/
  })
    .then(function (createduser) {
      res.redirect('/feed');
    })
});

/* show user data taken by register page */
router.get('/feed', function (req, res, next) {
  userModel.find()
    .then(function (alluser) {
      res.render('feed', { alluser });
    })
})

/* delete user  */
router.get('/delete/:name', function (req, res) {
  userModel.findOneAndDelete({ username: req.params.name })
    .then(function () {
      res.redirect('/feed')
    })
})
/* edit user detail*/
router.get('/edit/:rename', function (req, res, next) {
  userModel.findOne(
    { username: req.params.rename },)
    .then(function (founduser) {
      res.render("edit", { founduser })
    })
});


// router.get('/edit/:rename', function (req, res) {
//   userModel.findOneAndUpdate(
//     {username:req.params.rename},
//     {age:req.params.rename},
//     {emial:req.params.rename},
//     {image:req.params.rename},
//     {contact:req.params.rename},
//     {new:true})
//     .then(function () {
//       res.redirect('/feed')
//     })
// })

/* update page. */
router.post('/update/:id', function (req, res, next) {
  userModel.findOneAndUpdate({ _id: req.params.id }, {
    username: req.body.username,
    age: req.body.age,
    email: req.body.email,
    contact: req.body.contact,
    image: req.body.image
  })
    .then(function (updateduser) {
      res.redirect("/feed")
    })
    .catch(function (error) {
      console.error("Error:", error);
      res.status(500).send("An error occurred")
    })
});

/* like profile */
router.get('/like/:name', function (req, res, next) {
  userModel.findOne({ _id: req.params.name })
    .then(function (likes) {
      likes.save();
      likes.profilelikes++;
      res.redirect("/feed")
    })
});
module.exports = router;