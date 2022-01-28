require('dotenv').config();
const express = require('express'); // ORM : Object Relation Mapper
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection (using promises or async/await syntex)

// process.env.NODE_ENV = "developement"
const dbURI = process.env.MONGO_URI;
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) =>
    app.listen(3000, () =>
      console.log('Listening on port 3000 and connected MongoDB')
    )
  )
  .catch((err) => console.log(err));

// routes (REST Syntex) -- 1999 --> Get , Post , Delete, Put
// Alternatives - SOAP (xml) , GraphQL , gRCP
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
// app.get('/', (req, res) => res.json({ hello: 'world' }));
// app.get('/', (req, res) => res.send('Hello'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes);
// app.listen(3000, () => console.log('server started on port 3000'));
