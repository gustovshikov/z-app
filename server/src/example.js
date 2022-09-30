const cookieParser = require('cookie-parser'),
  express = require('express'),
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Joi = require('joi'),
  cors = require('cors'),
  jwt = require('jsonwebtoken'),
  app = express();

require('dotenv').config();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Status: Mongoose: Connected (Test Database)');
  }
);

//Models

const User = require('./Models/UserModel');

//ValidationFunctions

const { registerValidation, loginValidation } = require('./Validation');
const VerifyToken = require('./VerifyToken');

//Search

app.post('/search', function (req, res, next) {
  var keyword = req.body.keyword;
  res.redirect('/search/' + keyword);
});

app.get('/search/:keyword', function (req, res, next) {});

//Registration

app.post('/register', async (req, res) => {
  //Validation

  const { error } = registerValidation(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //Check if user is already in Database

  const emailExist = await User.findOne({ email: req.body.email });

  if (emailExist) return res.status(400).send('');

  // Create User
  try {
    const saltRounds = 10;

    var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const user = new User({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      gender: req.body.gender,
      birth: req.body.birth,
      street: req.body.street,
      streetnumber: req.body.streetnumber,
      location: req.body.location,
      email: req.body.email,
      password: hashedPassword,
    });

    user.save().then(result => {
      console.log(result);
      res.redirect('/registered');
    });
  } catch {
    res.status(400).send(err);
  }
});

//Login/Logout

app.post('/login', async (req, res) => {
  // Validation

  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email exist in DB

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('No user found');
  console.log(user);

  // Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Wrong password');

  // Create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res
    .cookie('auth', token, { httpOnly: true, secure: false })
    .redirect('/main');
});

app.post('/authStatus', function (req, res) {
  console.log(req.signedCookies);
  console.log(req.cookies);
});

app.post('/logout', (req, res) => {
  res.cookie('auth', 0, { maxAge: 0 }).redirect('/main');
});

function verifyToken(req, res, next) {
  const token = req.cookies;

  if (!token) return res.redirect('/loginFirst');

  try {
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = user;
  } catch {
    res.status(400).send('Invalid Token');
  }
}

app.listen(process.env.PORT, function () {
  console.log('Status: Express: Server running on PORT: ' + process.env.PORT);
});
