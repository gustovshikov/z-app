const cors = require('cors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');
const {
  getAllItems,
  postNewUser,
  userCheck,
  putItemById,
  postItem,
  deleteItemById,
} = require('./controllers');

// options settings /////////////////////////////////////
const port = 3001;
const whitelist = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://www.cyberhelm.com',
  'http://www.cyberhelm.com',
  'https://api.cyberhelm.com',
  'http://api.cyberhelm.com',
];
const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else if (origin === undefined) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

// app and middleware /////////////////////////////////////
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, '../public')));

// auth check middleware /////////////////////////////////////
const authenticateToken = (req, res, next) => {
  // const authHeader = req.headers['authorization'];
  // const token = authHeader && authHeader.split(' ')[1];
  // dont know auth headers yet so using cookie instead
  console.log(req.cookies);
  const token = req.cookies.auth;
  console.log(token);
  if (token === undefined) return res.status(401).send('no token');

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send(err);
    req.user = user;
    next();
  });
};

// documentation site //////////////////////////////////
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public/index.html'));
});

// Main routes ///////////////////////////////////////////
app.post('/login', async (req, res) => {
  // authenticate user
  const user = await userCheck(req.body.user_name);
  if (user === null) return res.status(400).send('Cannot find user');
  try {
    console.log(user);
    if (await bcrypt.compare(req.body.password, user.password)) {
      const userToken = { user_name: user.user_name };
      const accessToken = jwt.sign(userToken, process.env.ACCESS_TOKEN_SECRET);
      res
        .status(200)
        .cookie('auth', accessToken, { maxAge: 900000 })
        .send({
          status: 'success',
          user: user,
          cookie: ['auth', accessToken, { maxAge: 900000 }],
        });
    } else {
      res.status(403).send({
        status: 'not allowed',
      });
    }
  } catch {
    err => res.status(500).send({ status: err });
  }
});

app.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, user_name, password } = req.body;
    // check if all information is provided
    if (!(user_name && password && first_name && last_name)) {
      res.status(400).send('All input is required');
    }
    // check if user exists already
    const userExist = await userCheck(user_name);
    if (userExist !== null) {
      return res.status(409).send('User Already Exist. Please Login');
    }
    // create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    console.log('salt', salt);
    console.log('hashed pw', hashedPassword);
    const user = {
      first_name: first_name,
      last_name: last_name,
      user_name: user_name,
      password: hashedPassword,
    };
    // push user to db
    postNewUser(user)
      .then(results => {
        const userToken = { user_name: user.user_name };
        const accessToken = jwt.sign(
          userToken,
          process.env.ACCESS_TOKEN_SECRET
        );
        res
          .status(201)
          .cookie('auth', accessToken, { maxAge: 900000 })
          .send({
            status: 'success',
            user: results,
            cookie: ['auth', accessToken, { maxAge: 900000 }],
          });
      })
      .catch(err => res.status(500).send(err));
  } catch {
    res.status(500).send();
  }
});

app.get('/items', (req, res) => {
  getAllItems()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

// Authenticated Routes /////////////////////////////////////
app.put('/items/:id', authenticateToken, (req, res) => {
  console.log('Cookies: ', req.cookies);
  let { id } = req.params;
  console.log('puting item');
  putItemById({ item: req.body, id: id })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.delete('/items/:id', authenticateToken, (req, res) => {
  console.log('Cookies: ', req.cookies);
  let { id } = req.params;
  console.log('deleting item');
  deleteItemById(id)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

app.post('/items', authenticateToken, (req, res) => {
  console.log('Cookies: ', req.cookies);
  console.log('posting item', req.body);
  postItem(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err));
});

// app listening /////////////////////////////////////
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
